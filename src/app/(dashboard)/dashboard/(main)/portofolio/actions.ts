'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { portfolios } from '@/db/schema'
import { slugify } from '@/lib/slugify'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

export type PortfolioFormState = { error: string | null }

const portfolioSchema = z.object({
  title: z.string().trim().min(1, 'Judul wajib diisi.').max(200),
  slug: z.string().trim().max(220).default(''),
  status: z.enum(['draft', 'published']),
  isFeatured: z.boolean(),
  completedDate: z.date().nullable(),
  clientName: z.string().trim().min(1, 'Nama klien wajib diisi.').max(160),
  category: z.string().max(40),
  summary: z.string().trim().min(1, 'Ringkasan wajib diisi.').max(1000),
  duration: z.string().max(80).nullable(),
  role: z.string().max(120).nullable(),
  liveUrl: z.string().max(500).refine((v) => !v || /^https?:\/\//.test(v), 'URL harus diawali http(s)://').nullable(),
  thumbnailId: z
    .string()
    .trim()
    .min(1, 'Thumbnail portofolio wajib dipilih atau diunggah.')
    .max(64)
    .regex(/^[0-9a-f-]{36}$/i, 'Thumbnail tidak valid.'),
  challenge: z.string().max(5000).nullable(),
  solution: z.string().max(5000).nullable(),
  results: z.array(z.object({ value: z.string().max(80), label: z.string().max(160) })).max(12),
  techStack: z.array(z.string().max(80)).max(30),
  content: z.string().max(500_000).nullable(),
  testimonialQuote: z.string().max(1000).nullable(),
  testimonialName: z.string().max(120).nullable(),
  testimonialRole: z.string().max(120).nullable(),
  metaTitle: z.string().max(200).nullable(),
  metaDescription: z.string().max(500).nullable(),
})

function parseForm(formData: FormData) {
  const str = (key: string) => String(formData.get(key) || '').trim()
  const completed = str('completedDate')

  const results: { value: string; label: string }[] = []
  for (const pair of String(formData.get('results') || '').split('\n')) {
    const [value, label] = pair.split('|').map((s) => s.trim())
    if (value) results.push({ value, label: label || '' })
  }

  return {
    title: str('title'),
    slug: str('slug') || str('title'),
    status: str('status') === 'published' ? 'published' : 'draft',
    isFeatured: formData.get('isFeatured') === 'on',
    completedDate: completed ? new Date(completed) : null,
    clientName: str('clientName'),
    category: str('category') || 'web',
    summary: str('summary'),
    thumbnailId: str('thumbnailId'),
    duration: str('duration') || null,
    role: str('role') || null,
    liveUrl: str('liveUrl') || null,
    challenge: str('challenge') || null,
    solution: str('solution') || null,
    results,
    techStack: str('techStack')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    content: str('content') || null,
    testimonialQuote: str('testimonialQuote') || null,
    testimonialName: str('testimonialName') || null,
    testimonialRole: str('testimonialRole') || null,
    metaTitle: str('metaTitle') || null,
    metaDescription: str('metaDescription') || null,
  }
}


export async function savePortfolioAction(
  _prev: PortfolioFormState | undefined,
  formData: FormData,
): Promise<PortfolioFormState> {
  await requireAdmin()

  const id = String(formData.get('id') || '')
  const data = parseForm(formData)

  const parsed = portfolioSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Data form tidak valid.' }
  }
  const valid = parsed.data

  const baseSlug = slugify(valid.slug || valid.title)
  if (!baseSlug) return { error: 'Slug tidak valid.' }

  const values = { ...valid, slug: baseSlug, updatedAt: new Date() }

  try {
    if (id) {
      await db.update(portfolios).set(values).where(eq(portfolios.id, id))
    } else {
      await db.insert(portfolios).values(values)
    }
  } catch (error) {
    console.error('[dashboard] save portfolio failed', error)
    return {
      error:
        error instanceof Error && 'code' in error && (error as { code?: string }).code === '23505'
          ? `Slug "${baseSlug}" sudah dipakai proyek lain.`
          : 'Gagal menyimpan ke database. Coba lagi.',
    }
  }

  revalidatePath('/dashboard/portofolio')
  revalidatePath('/portfolio')
  revalidatePath(`/portfolio/${baseSlug}`)
  revalidatePath('/')
  redirect('/dashboard/portofolio')
}

export async function deletePortfolioAction(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get('id') || '')
  if (id) {
    await db.delete(portfolios).where(eq(portfolios.id, id))
  }
  revalidatePath('/dashboard/portofolio')
  revalidatePath('/portfolio')
  revalidatePath('/')
}
