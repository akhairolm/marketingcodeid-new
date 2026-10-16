'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles } from '@/db/schema'
import { slugify } from '@/lib/slugify'
import { requireAdmin } from '@/lib/auth'
import { computePublishedAt } from '@/lib/content/publish-date'
import { z } from 'zod'

export type ArticleFormState = { error: string | null }

const articleSchema = z.object({
  title: z.string().trim().min(1, 'Judul wajib diisi.').max(200, 'Judul maksimal 200 karakter.'),
  slug: z.string().trim().max(220, 'Slug maksimal 220 karakter.').default(''),
  status: z.enum(['draft', 'published']),
  publishedAt: z.date().nullable(),
  categoryId: z.string().max(64, 'Kategori tidak valid.').nullable(),
  coverImageId: z
    .string()
    .trim()
    .min(1, 'Thumbnail artikel wajib dipilih atau diunggah.')
    .max(64, 'Cover image tidak valid.')
    .regex(/^[0-9a-f-]{36}$/i, 'Cover image tidak valid.'),
  excerpt: z.string().max(1000, 'Excerpt maksimal 1000 karakter.').nullable(),
  content: z.string().min(1, 'Konten wajib diisi.').max(500_000, 'Konten terlalu panjang.'),
  tags: z.array(z.string().trim().max(100, 'Setiap tag maksimal 100 karakter.')).max(30, 'Maksimal 30 tag.'),
  authorName: z.string().max(120, 'Nama author maksimal 120 karakter.'),
  authorRole: z.string().max(120, 'Role author maksimal 120 karakter.').nullable(),
  metaTitle: z.string().max(200, 'Meta title maksimal 200 karakter.').nullable(),
  metaDescription: z.string().max(500, 'Meta description maksimal 500 karakter.').nullable(),
})

function parseForm(formData: FormData, existingPublishedAt: Date | null) {
  const str = (key: string) => String(formData.get(key) || '').trim()

  const status = str('status') === 'published' ? 'published' : 'draft'
  const publishedAt = computePublishedAt({
    incomingStatus: status,
    incomingRaw: str('publishedAt'),
    existingPublishedAt,
  })

  return {
    title: str('title'),
    slug: str('slug') || str('title'),
    status,
    publishedAt,
    categoryId: str('categoryId') || null,
    coverImageId: str('coverImageId') || str('thumbnailId'),
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

  let baseSlug = ''
  try {
  let existingPublishedAt: Date | null = null
  if (id) {
    const rows = await db
      .select({ publishedAt: articles.publishedAt })
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1)
    if (!rows[0]) return { error: 'Artikel tidak ditemukan.' }
    existingPublishedAt = rows[0].publishedAt
  }

  const data = parseForm(formData, existingPublishedAt)

  const parsed = articleSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Data form tidak valid.' }
  }
  const valid = parsed.data

  if (!valid.title || !valid.content) {
    return { error: 'Judul dan konten wajib diisi.' }
  }

  baseSlug = slugify(valid.slug || valid.title)
  if (!baseSlug) return { error: 'Slug tidak valid.' }

  const values = {
    ...valid,
    slug: baseSlug,
    updatedAt: new Date(),
  }

    if (id) {
      await db.update(articles).set(values).where(eq(articles.id, id))
    } else {
      await db.insert(articles).values(values)
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Tanggal publikasi tidak valid.') {
      return { error: error.message }
    }
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
