'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { slugify } from '@/lib/slugify'

export type CategoryFormState = { error: string | null }

export async function createCategoryAction(
  _prev: CategoryFormState | undefined,
  formData: FormData,
): Promise<CategoryFormState> {
  const name = String(formData.get('name') || '').trim()
  if (!name) return { error: 'Nama kategori wajib diisi.' }

  const slug = slugify(name)
  if (!slug) return { error: 'Nama kategori tidak menghasilkan slug yang valid.' }

  try {
    await db.insert(categories).values({ name, slug })
  } catch (error) {
    console.error('[dashboard] create category failed', error)
    return { error: `Gagal menyimpan — kategori "${name}" atau slug "${slug}" mungkin sudah ada.` }
  }

  revalidatePath('/dashboard/kategori')
  revalidatePath('/blog')
  return { error: null }
}

export async function deleteCategoryAction(formData: FormData) {
  const id = String(formData.get('id') || '')
  if (id) {
    await db.delete(categories).where(eq(categories.id, id))
  }
  revalidatePath('/dashboard/kategori')
  revalidatePath('/blog')
}
