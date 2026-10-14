'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { and, eq, ne } from 'drizzle-orm'
import { db } from '@/db'
import { articles } from '@/db/schema'
import { slugify } from '@/lib/slugify'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

export type ArticleFormState = { error: string | null }

const articleSchema = z.object({
  title: z.string().trim().min(1, 'Judul wajib diisi.').max(200),
  slug: z.string().trim().max(220).default(''),
  status: z.enum(['draft', 'published']),
  publishedAt: z.date().nullable(),
  categoryId: z.string().max(64).nullable(),
  excerpt: z.string().max(500).nullable(),
  content: z.string().min(1, 'Konten wajib diisi.').max(500_000),
  tags: z.array(z.string().max(40)).max(20),
  authorName: z.string().max(120),
  authorRole: z.string().max(120).nullable(),
  metaTitle: z.string().max(70).nullable(),
  metaDescription: z.string().max(200).nullable(),
})

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


export async function saveArticleAction(
  _prev: ArticleFormState | undefined,
  formData: FormData,
): Promise<ArticleFormState> {
  await requireAdmin()

  const id = String(formData.get('id') || '')
  const data = parseForm(formData)

  const parsed = articleSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Data form tidak valid.' }
  }
  const valid = parsed.data

  if (!valid.title || !valid.content) {
    return { error: 'Judul dan konten wajib diisi.' }
  }

  const baseSlug = slugify(valid.slug || valid.title)
  if (!baseSlug) return { error: 'Slug tidak valid.' }

  const values = {
    ...valid,
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
    return {
      error:
        error instanceof Error && 'code' in error && (error as { code?: string }).code === '23505'
          ? `Slug "${baseSlug}" sudah dipakai artikel lain.`
          : 'Gagal menyimpan ke database. Coba lagi.',
    }
  }

  revalidatePath('/dashboard/artikel')
  revalidatePath('/blog')
  revalidatePath(`/blog/${baseSlug}`)
  revalidatePath('/')
  redirect('/dashboard/artikel')
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get('id') || '')
  if (id) {
    await db.delete(articles).where(eq(articles.id, id))
  }
  revalidatePath('/dashboard/artikel')
  revalidatePath('/blog')
  revalidatePath('/')
}
