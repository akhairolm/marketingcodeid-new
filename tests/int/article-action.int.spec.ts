import { beforeEach, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  rows: [] as Array<{ publishedAt: Date | null }>,
  updateCalls: [] as unknown[],
  insertCalls: [] as unknown[],
  redirected: null as string | null,
  revalidated: [] as string[],
}))

vi.mock('@/db', () => {
  const select = () => ({
    from: () => ({
      where: () => ({ limit: async () => state.rows }),
    }),
  })
  const update = () => ({ set: (v: unknown) => ({ where: async () => state.updateCalls.push(v) }) })
  const insert = () => ({ values: async (v: unknown) => state.insertCalls.push(v) })
  const del = () => ({ where: async () => undefined })
  return { db: { select, update, insert, delete: del } }
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
  state.rows = []
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
  const { saveArticleAction } = await import(
    '@/app/(dashboard)/dashboard/(main)/artikel/actions'
  )
  try {
    return await saveArticleAction(undefined, fd)
  } catch (e) {
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') return null
    throw e
  }
}

it('invalid publishedAt input rejects before DB write', async () => {
  const result = await invoke(
    form({ title: 'T', content: 'c', status: 'published', publishedAt: 'bogus' }),
  )
  expect(result?.error).toBe('Tanggal publikasi tidak valid.')
  expect(state.insertCalls).toHaveLength(0)
})

it('missing row on edit returns error without writing', async () => {
  state.rows = []
  const result = await invoke(
    form({ id: 'x', title: 'T', content: 'c', status: 'draft' }),
  )
  expect(result?.error).toBe('Artikel tidak ditemukan.')
  expect(state.updateCalls).toHaveLength(0)
})

it('republish of existing row keeps previous publishedAt when not overridden', async () => {
  const existing = new Date('2025-01-02T03:04:05.000Z')
  state.rows = [{ publishedAt: existing }]
  await invoke(
    form({
      id: 'x',
      title: 'T',
      content: 'c',
      status: 'published',
      publishedAt: '',
      coverImageId: '11111111-1111-1111-1111-111111111111',
    }),
  )
  const written = state.updateCalls[0] as { publishedAt: Date }
  expect(written.publishedAt).toEqual(existing)
  expect(state.redirected).toBe('/dashboard/artikel')
})

it('rejects when coverImageId is missing', async () => {
  const result = await invoke(
    form({ title: 'T', content: 'c', status: 'published' }),
  )
  expect(result?.error).toBe('Thumbnail artikel wajib dipilih atau diunggah.')
  expect(state.insertCalls).toHaveLength(0)
})
