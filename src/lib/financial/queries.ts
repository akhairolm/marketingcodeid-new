import { db } from '@/db'
import { orders, orderHppItems } from '@/db/schema'
import { eq, desc, gte, and, ilike, or } from 'drizzle-orm'
import { calculateProfitAndMargin } from './calculator'
import type {
  FinancialSummaryStats,
  PeriodSummary,
  OrderWithHppBreakdown,
  OrderRow,
  OrderHppItemRow,
} from '@/types/financial'

/**
 * Menghitung ulang total HPP, laba bersih, dan margin keuntungan suatu order
 * berdasarkan seluruh baris pos biaya di tabel orderHppItems.
 */
export async function recalculateOrderTotals(
  orderId: string,
  executor = db
): Promise<OrderRow | null> {
  const [order] = await executor
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1)

  if (!order) return null

  const items: OrderHppItemRow[] = await executor
    .select()
    .from(orderHppItems)
    .where(eq(orderHppItems.orderId, orderId))

  const totalHpp = items.reduce((sum: number, it: OrderHppItemRow) => sum + (it.amount || 0), 0)
  const { netProfit, profitMargin } = calculateProfitAndMargin(order.sellingPrice, totalHpp)

  const [updated] = await executor
    .update(orders)
    .set({
      totalHpp,
      netProfit,
      profitMargin: profitMargin.toString(),
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId))
    .returning()

  return updated || null
}

/**
 * Mengambil ringkasan performa finansial: Bulan Ini, Tahun Ini, dan Semua Waktu
 */
export async function getFinancialSummary(): Promise<FinancialSummaryStats> {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.orderDate))

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfYear = new Date(now.getFullYear(), 0, 1)

  function aggregate(list: typeof allOrders): PeriodSummary {
    const orderCount = list.length
    const totalSellingPrice = list.reduce((sum, o) => sum + (o.sellingPrice || 0), 0)
    const totalHpp = list.reduce((sum, o) => sum + (o.totalHpp || 0), 0)
    const totalNetProfit = list.reduce((sum, o) => sum + (o.netProfit || 0), 0)
    const averageProfitMargin =
      totalSellingPrice > 0
        ? Number(((totalNetProfit / totalSellingPrice) * 100).toFixed(2))
        : 0

    return {
      totalSellingPrice,
      totalHpp,
      totalNetProfit,
      averageProfitMargin,
      orderCount,
    }
  }

  const currentMonthOrders = allOrders.filter(
    (o) => new Date(o.orderDate) >= startOfMonth
  )
  const currentYearOrders = allOrders.filter(
    (o) => new Date(o.orderDate) >= startOfYear
  )

  return {
    currentMonth: aggregate(currentMonthOrders),
    currentYear: aggregate(currentYearOrders),
    allTime: aggregate(allOrders),
  }
}

/**
 * Mengambil daftar order dengan filter opsional dan menyertakan rincian HPP-nya
 */
export async function getOrdersWithBreakdownList(filters?: {
  period?: 'month' | 'year' | 'all'
  paymentStatus?: string
  search?: string
}): Promise<OrderWithHppBreakdown[]> {
  const now = new Date()
  const conditions = []

  if (filters?.period === 'month') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    conditions.push(gte(orders.orderDate, startOfMonth))
  } else if (filters?.period === 'year') {
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    conditions.push(gte(orders.orderDate, startOfYear))
  }

  if (filters?.paymentStatus && filters.paymentStatus !== 'all') {
    conditions.push(eq(orders.paymentStatus, filters.paymentStatus))
  }

  if (filters?.search && filters.search.trim()) {
    const term = `%${filters.search.trim()}%`
    conditions.push(
      or(
        ilike(orders.orderNumber, term),
        ilike(orders.clientName, term),
        ilike(orders.clientCompany, term),
        ilike(orders.clientPhone, term),
        ilike(orders.packageName, term)
      )
    )
  }

  const query = db
    .select()
    .from(orders)
    .orderBy(desc(orders.orderDate))

  const orderRows = conditions.length > 0
    ? await query.where(and(...conditions))
    : await query

  if (orderRows.length === 0) return []

  const allItems = await db
    .select()
    .from(orderHppItems)
    .orderBy(orderHppItems.createdAt)

  const itemsByOrderId = new Map<string, OrderHppItemRow[]>()
  for (const item of allItems) {
    const list = itemsByOrderId.get(item.orderId) || []
    list.push(item)
    itemsByOrderId.set(item.orderId, list)
  }

  return orderRows.map((o) => ({
    ...o,
    hppItems: itemsByOrderId.get(o.id) || [],
  }))
}

/**
 * Mengambil 1 order tertentu beserta seluruh rincian pos biaya HPP-nya
 */
export async function getOrderWithHppDetails(
  orderId: string
): Promise<OrderWithHppBreakdown | null> {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1)

  if (!order) return null

  const items = await db
    .select()
    .from(orderHppItems)
    .where(eq(orderHppItems.orderId, orderId))
    .orderBy(orderHppItems.createdAt)

  return {
    ...order,
    hppItems: items,
  }
}
