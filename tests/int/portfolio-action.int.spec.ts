import { beforeEach, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  updateCalls: [] as unknown[],
  insertCalls: [] as unknown[],
  redirected: null as string | null,
  revalidated: [] as string[],
}))

vi.mock('@/db', () => {
  const update = () => ({ set: (v: unknown) => ({ where: async () => state.updateCalls.push(v) }) })
  const insert = () => ({ values: async (v: unknown) => state.insertCalls.push(v) })
  const del = () => ({ where: async () => undefined })
  return { db: { update, insert, delete: del } }
})
vi.mock('@/lib/auth', () => ({ requireAdmin: async () => ({ id: 'u1' }) }))
vi.mock('next/cache', () => ({ revalidatePath: (p: string) => state.revalidated.push(p) }))
vi.mock('next/navigation', () => ({
  redirect: (p: string) => {
    state.redirected = p
    throw new Error('NEXT_REDIRECT')
  },
}))

beforeEach(() => {
  state.updateCalls = []
  state.insertCalls = []
  state.redirected = null
  state.revalidated = []
})

function form(fields: Record<string, string>): FormData {
  const fd = new FormData()
  for (const [k, v] of Object.entries(fields)) fd.set(k, v)
  return fd
}

async function invoke(fd: FormData) {
  const { savePortfolioAction } = await import(
    '@/app/(dashboard)/dashboard/(main)/portofolio/actions'
  )
  try {
    return await savePortfolioAction(undefined, fd)
  } catch (e) {
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') return null
    throw e
  }
}

it('rejects when thumbnailId is missing', async () => {
  const result = await invoke(
    form({
      title: 'Proyek Web Baru',
      clientName: 'Klien A',
      summary: 'Ringkasan proyek',
      status: 'published',
    }),
  )
  expect(result?.error).toBe('Thumbnail portofolio wajib dipilih atau diunggah.')
  expect(state.insertCalls).toHaveLength(0)
})

it('rejects when thumbnailId format is invalid', async () => {
  const result = await invoke(
    form({
      title: 'Proyek Web Baru',
      clientName: 'Klien A',
      summary: 'Ringkasan proyek',
      status: 'published',
      thumbnailId: 'invalid-id',
    }),
  )
  expect(result?.error).toBe('Thumbnail tidak valid.')
  expect(state.insertCalls).toHaveLength(0)
})

it('accepts valid portfolio payload with mandatory thumbnailId', async () => {
  await invoke(
    form({
      title: 'Proyek Sukses',
      clientName: 'Klien Sukses',
      summary: 'Ringkasan pengerjaan',
      status: 'published',
      thumbnailId: '23553537-6262-4bae-a5ad-44b0ed9edab6',
    }),
  )
  expect(state.insertCalls).toHaveLength(1)
  expect(state.redirected).toBe('/dashboard/portofolio')
})
