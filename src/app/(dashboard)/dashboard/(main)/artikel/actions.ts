'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { and, eq, ne } from 'drizzle-orm'
import { db } from '@/db'
import { articles } from '@/db/schema'
import { slugify } from '@/lib/slugify'

export type ArticleFormState = { error: string | null }

function parseForm(formData: FormData) {
  const str = (key: string) => String(formData.get(key) || '').trim()

  const publishedAtRaw = str('publishedAt')
  const publishedAt = str('status') === 'published'
    ? publishedAtRaw
      ? new Date(publishedAtRaw)
      : new Date()
    : null

  return {
    title: str('title'),
    slug: str('slug') || str('title'),
    status: str('status') === 'published' ? 'published' : 'draft',
    publishedAt,
    categoryId: str('categoryId') || null,
    excerpt: str('excerpt') || null,
    content: String(formData.get('content') || ''),
    tags: str('tags')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    authorName: str('authorName') || 'Tim MarketingCode.ID',
    authorRole: str('authorRole') || null,
    metaTitle: str('metaTitle') || null,
    metaDescription: str('metaDescription') || null,
  }
}

async function assertUniqueSlug(slug: string, excludeId?: string) {
  const rows = await db
    .select({ id: articles.id })
    .from(articles)
    .where(excludeId ? and(eq(articles.slug, slug), ne(articles.id, excludeId)) : eq(articles.slug, slug))
    .limit(1)
  return rows.length === 0
}

export async function saveArticleAction(
  _prev: ArticleFormState | undefined,
  formData: FormData,
): Promise<ArticleFormState> {
  const id = String(formData.get('id') || '')
  const data = parseForm(formData)

  if (!data.title || !data.content) {
    return { error: 'Judul dan konten wajib diisi.' }
  }

  const baseSlug = slugify(data.slug)
  if (!baseSlug) return { error: 'Slug tidak valid.' }
  if (!(await assertUniqueSlug(baseSlug, id || undefined))) {
    return { error: `Slug "${baseSlug}" sudah dipakai artikel lain.` }
  }

  const values = {
    ...data,
    categoryId: data.categoryId || null,
    slug: baseSlug,
    updatedAt: new Date(),
  }

  try {
    if (id) {
      await db.update(articles).set(values).where(eq(articles.id, id))
    } else {
      await db.insert(articles).values(values)
    }
  } catch (error) {
    console.error('[dashboard] save article failed', error)
    return { error: 'Gagal menyimpan ke database. Coba lagi.' }
  }

  revalidatePath('/dashboard/artikel')
  revalidatePath('/blog')
  revalidatePath(`/blog/${baseSlug}`)
  revalidatePath('/')
  redirect('/dashboard/artikel')
}

export async function deleteArticleAction(formData: FormData) {
  const id = String(formData.get('id') || '')
  if (id) {
    await db.delete(articles).where(eq(articles.id, id))
  }
  revalidatePath('/dashboard/artikel')
  revalidatePath('/blog')
  revalidatePath('/')
}
