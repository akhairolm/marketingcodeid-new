'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { and, eq, ne } from 'drizzle-orm'
import { db } from '@/db'
import { portfolios } from '@/db/schema'
import { slugify } from '@/lib/slugify'

export type PortfolioFormState = { error: string | null }

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

async function assertUniqueSlug(slug: string, excludeId?: string) {
  const rows = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(excludeId ? and(eq(portfolios.slug, slug), ne(portfolios.id, excludeId)) : eq(portfolios.slug, slug))
    .limit(1)
  return rows.length === 0
}

export async function savePortfolioAction(
  _prev: PortfolioFormState | undefined,
  formData: FormData,
): Promise<PortfolioFormState> {
  const id = String(formData.get('id') || '')
  const data = parseForm(formData)

  if (!data.title || !data.summary || !data.clientName) {
    return { error: 'Judul, klien, dan ringkasan wajib diisi.' }
  }

  const baseSlug = slugify(data.slug)
  if (!baseSlug) return { error: 'Slug tidak valid.' }
  if (!(await assertUniqueSlug(baseSlug, id || undefined))) {
    return { error: `Slug "${baseSlug}" sudah dipakai proyek lain.` }
  }

  const values = { ...data, slug: baseSlug, updatedAt: new Date() }

  try {
    if (id) {
      await db.update(portfolios).set(values).where(eq(portfolios.id, id))
    } else {
      await db.insert(portfolios).values(values)
    }
  } catch (error) {
    console.error('[dashboard] save portfolio failed', error)
    return { error: 'Gagal menyimpan ke database. Coba lagi.' }
  }

  revalidatePath('/dashboard/portofolio')
  revalidatePath('/portfolio')
  revalidatePath(`/portfolio/${baseSlug}`)
  revalidatePath('/')
  redirect('/dashboard/portofolio')
}

export async function deletePortfolioAction(formData: FormData) {
  const id = String(formData.get('id') || '')
  if (id) {
    await db.delete(portfolios).where(eq(portfolios.id, id))
  }
  revalidatePath('/dashboard/portofolio')
  revalidatePath('/portfolio')
  revalidatePath('/')
}
