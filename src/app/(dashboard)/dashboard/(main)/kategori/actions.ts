'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { slugify } from '@/lib/slugify'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

export type CategoryFormState = { error: string | null }

const categorySchema = z.object({
  name: z.string().trim().min(1, 'Nama kategori wajib diisi.').max(80),
})

export async function createCategoryAction(
  _prev: CategoryFormState | undefined,
  formData: FormData,
): Promise<CategoryFormState> {
  await requireAdmin()

  const parsed = categorySchema.safeParse({ name: String(formData.get('name') || '') })
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Data tidak valid.' }
  }
  const name = parsed.data.name

  const slug = slugify(name)
  if (!slug) return { error: 'Nama kategori tidak menghasilkan slug yang valid.' }

  try {
    await db.insert(categories).values({ name, slug })
  } catch (error) {
    console.error('[dashboard] create category failed', error)
    return { error: 'Gagal menyimpan — kategori dengan nama atau slug tersebut mungkin sudah ada.' }
  }

  revalidatePath('/dashboard/kategori')
  revalidatePath('/blog')
  return { error: null }
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get('id') || '')
  if (id) {
    await db.delete(categories).where(eq(categories.id, id))
  }
  revalidatePath('/dashboard/kategori')
  revalidatePath('/blog')
}
