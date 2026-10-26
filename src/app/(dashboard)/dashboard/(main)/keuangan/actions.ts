'use server'

import { revalidatePath } from 'next/cache'
import { eq, sql } from 'drizzle-orm'
import { db } from '@/db'
import { orders, orderHppItems } from '@/db/schema'
import { requireAdmin } from '@/lib/auth'
import { calculateProfitAndMargin, generateOrderNumber } from '@/lib/financial/calculator'
import { recalculateOrderTotals } from '@/lib/financial/queries'
import type {
  CreateOrderInput,
  AddHppItemInput,
  UpdateHppItemInput,
  PaymentStatus,
  ProjectStatus,
} from '@/types/financial'

export async function createOrderAction(input: CreateOrderInput): Promise<{
  success: boolean
  orderId?: string
  error?: string
}> {
  const admin = await requireAdmin()

  if (!input.clientName?.trim()) {
    return { success: false, error: 'Nama klien wajib diisi.' }
  }

  if (!input.clientPhone?.trim()) {
    return { success: false, error: 'Nomor WhatsApp klien wajib diisi.' }
  }

  if (!input.packageName?.trim()) {
    return { success: false, error: 'Paket layanan wajib dipilih.' }
  }

  const sellingPrice = Math.max(0, Math.round(Number(input.sellingPrice) || 0))
  const rawHppItems = Array.isArray(input.hppItems) ? input.hppItems : []
  const initialTotalHpp = rawHppItems.reduce(
    (sum, item) => sum + Math.max(0, Math.round(Number(item.amount) || 0)),
    0
  )

  const { netProfit, profitMargin } = calculateProfitAndMargin(sellingPrice, initialTotalHpp)

  const orderDate = input.orderDate ? new Date(input.orderDate) : new Date()

  // Generate nomor order sekuensial bulan ini
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(orders)
  const currentTotal = Number(countResult[0]?.count || 0)
  const orderNumber = generateOrderNumber(orderDate, currentTotal + 1)

  try {
    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber,
        clientName: input.clientName.trim(),
        clientPhone: input.clientPhone.trim(),
        clientCompany: input.clientCompany?.trim() || null,
        serviceCategory: input.serviceCategory,
        packageName: input.packageName.trim(),
        sellingPrice,
        totalHpp: initialTotalHpp,
        netProfit,
        profitMargin: profitMargin.toString(),
        paymentStatus: input.paymentStatus || 'paid',
        paidAmount: Math.max(0, Math.round(Number(input.paidAmount) || (input.paymentStatus === 'paid' ? sellingPrice : 0))),
        projectStatus: input.projectStatus || 'in_progress',
        orderDate,
        notes: input.notes?.trim() || null,
        createdBy: admin.id,
      })
      .returning()

    if (rawHppItems.length > 0) {
      await db.insert(orderHppItems).values(
        rawHppItems.map((item) => ({
          orderId: newOrder.id,
          category: item.category,
          description: item.description.trim(),
          amount: Math.max(0, Math.round(Number(item.amount) || 0)),
          notes: item.notes?.trim() || null,
        }))
      )
    }

    revalidatePath('/dashboard/keuangan')
    revalidatePath('/dashboard')

    return { success: true, orderId: newOrder.id }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal menyimpan transaksi order baru.' }
  }
}

export async function addHppItemAction(
  orderId: string,
  input: AddHppItemInput
): Promise<{ success: boolean; itemId?: string; error?: string }> {
  await requireAdmin()

  if (!orderId) {
    return { success: false, error: 'ID order tidak valid.' }
  }

  if (!input.description?.trim()) {
    return { success: false, error: 'Deskripsi pos biaya wajib diisi.' }
  }

  const amount = Math.max(0, Math.round(Number(input.amount) || 0))

  try {
    const [item] = await db
      .insert(orderHppItems)
      .values({
        orderId,
        category: input.category,
        description: input.description.trim(),
        amount,
        notes: input.notes?.trim() || null,
      })
      .returning()

    await recalculateOrderTotals(orderId)

    revalidatePath('/dashboard/keuangan')
    revalidatePath('/dashboard')

    return { success: true, itemId: item.id }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal menambahkan pos biaya HPP.' }
  }
}

export async function updateHppItemAction(
  itemId: string,
  input: UpdateHppItemInput
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  if (!itemId) {
    return { success: false, error: 'ID pos biaya tidak valid.' }
  }

  try {
    const [existing] = await db
      .select()
      .from(orderHppItems)
      .where(eq(orderHppItems.id, itemId))
      .limit(1)

    if (!existing) {
      return { success: false, error: 'Item pos biaya HPP tidak ditemukan.' }
    }

    const updates: Partial<typeof orderHppItems.$inferInsert> = {
      updatedAt: new Date(),
    }

    if (input.category) updates.category = input.category
    if (input.description !== undefined) updates.description = input.description.trim()
    if (input.amount !== undefined) updates.amount = Math.max(0, Math.round(Number(input.amount) || 0))
    if (input.notes !== undefined) updates.notes = input.notes?.trim() || null

    await db
      .update(orderHppItems)
      .set(updates)
      .where(eq(orderHppItems.id, itemId))

    await recalculateOrderTotals(existing.orderId)

    revalidatePath('/dashboard/keuangan')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal memperbarui pos biaya HPP.' }
  }
}

export async function deleteHppItemAction(
  itemId: string
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  if (!itemId) {
    return { success: false, error: 'ID pos biaya tidak valid.' }
  }

  try {
    const [existing] = await db
      .select()
      .from(orderHppItems)
      .where(eq(orderHppItems.id, itemId))
      .limit(1)

    if (!existing) {
      return { success: false, error: 'Item pos biaya tidak ditemukan.' }
    }

    await db
      .delete(orderHppItems)
      .where(eq(orderHppItems.id, itemId))

    await recalculateOrderTotals(existing.orderId)

    revalidatePath('/dashboard/keuangan')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal menghapus pos biaya HPP.' }
  }
}

export async function updateOrderStatusAction(
  orderId: string,
  data: {
    paymentStatus?: PaymentStatus
    paidAmount?: number
    projectStatus?: ProjectStatus
    notes?: string
  }
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  if (!orderId) {
    return { success: false, error: 'ID order tidak valid.' }
  }

  try {
    const updates: Partial<typeof orders.$inferInsert> = {
      updatedAt: new Date(),
    }

    if (data.paymentStatus) updates.paymentStatus = data.paymentStatus
    if (data.paidAmount !== undefined) {
      updates.paidAmount = Math.max(0, Math.round(Number(data.paidAmount) || 0))
    }
    if (data.projectStatus) updates.projectStatus = data.projectStatus
    if (data.notes !== undefined) updates.notes = data.notes?.trim() || null

    await db
      .update(orders)
      .set(updates)
      .where(eq(orders.id, orderId))

    revalidatePath('/dashboard/keuangan')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal memperbarui status order.' }
  }
}

export async function deleteOrderAction(
  orderId: string
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  if (!orderId) {
    return { success: false, error: 'ID order tidak valid.' }
  }

  try {
    await db
      .delete(orders)
      .where(eq(orders.id, orderId))

    revalidatePath('/dashboard/keuangan')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal menghapus transaksi order.' }
  }
}
