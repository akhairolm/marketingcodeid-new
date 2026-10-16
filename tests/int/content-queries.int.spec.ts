import { beforeEach, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({ rows: [] as unknown[], error: null as Error | null, limits: [] as number[] }))
vi.mock('@/db', () => {
  const query = {
    from: () => query, leftJoin: () => query, where: () => query, orderBy: () => query,
    limit: (n: number) => { state.limits.push(n); return query },
    then: (resolve: (rows: unknown[]) => unknown, reject: (error: Error) => unknown) =>
      state.error ? Promise.reject(state.error).then(resolve, reject) : Promise.resolve(state.rows).then(resolve, reject),
  }
  return { db: { select: () => query } }
})
vi.mock('react', () => ({ cache: (fn: unknown) => fn }))

beforeEach(() => {
  vi.resetModules()
  vi.stubEnv('CONTENT_DEMO_MODE', '0')
  state.rows = []
  state.error = null
  state.limits = []
})

it('card projection carries techStack for summary cards without the body', async () => {
  state.rows = [
    {
      portfolio: {
        slug: 'p',
        title: 'P',
        clientName: 'C',
        category: 'video',
        summary: 's',
        techStack: ['Premiere Pro', 'After Effects'],
        results: [],
        isFeatured: false,
        thumbnailId: null,
      },
      thumbnail: null,
    },
  ]
  const { getPortfolioCards } = await import('@/lib/content/queries')
  const [card] = await getPortfolioCards()
  expect(card.techStack).toEqual(['Premiere Pro', 'After Effects'])
  expect(card.category).toBe('video')
  expect(card).not.toHaveProperty('content')
})

it('enumerates sitemap beyond listing limits without truncation', async () => {
  state.rows = Array.from({ length: 50101 }, (_, i) => ({ slug: `article-${i}`, updatedAt: new Date(), createdAt: new Date() }))
  const { getArticleSitemapEntries } = await import('@/lib/content/queries')
  expect(await getArticleSitemapEntries()).toHaveLength(50101)
  expect(state.limits).toEqual([])
})

it('keeps empty database results empty outside demo mode', async () => {
  const q = await import('@/lib/content/queries')
  expect(await q.getArticleCards()).toEqual([])
  expect(await q.getPortfolioCards()).toEqual([])
  expect(await q.getArticleBySlug('missing')).toBeNull()
  expect(await q.getPortfolioBySlug('missing')).toBeNull()
})

it('propagates database errors outside demo mode', async () => {
  state.error = new Error('offline')
  const q = await import('@/lib/content/queries')
  await expect(q.getArticleCards()).rejects.toThrow('offline')
  await expect(q.getPortfolioSitemapEntries()).rejects.toThrow('offline')
})

it('explicit demo mode works without a database and returns body-free cards respecting limits', async () => {
  vi.stubEnv('CONTENT_DEMO_MODE', '1')
  state.error = new Error('offline')
  const q = await import('@/lib/content/queries')
  const articles = await q.getArticleCards(1)
  const portfolios = await q.getPortfolioCards(1)
  expect(articles).toHaveLength(1)
  expect(portfolios).toHaveLength(1)
  expect(articles[0]).not.toHaveProperty('content')
  expect(portfolios[0]).not.toHaveProperty('content')
})

it('related queries in demo mode filter current slug and prioritize matching category', async () => {
  vi.stubEnv('CONTENT_DEMO_MODE', '1')
  const q = await import('@/lib/content/queries')
  const relatedP = await q.getRelatedPortfolios('warehouse-stock-inventory-erp', 'web', 2)
  expect(relatedP).toHaveLength(2)
  expect(relatedP.some((p) => p.slug === 'warehouse-stock-inventory-erp')).toBe(false)
  expect(relatedP[0]?.category).toBe('web')

  const relatedA = await q.getRelatedArticles('panduan-lengkap-seo-lokal-kalimantan-selatan', 'seo', 2)
  expect(relatedA).toHaveLength(2)
  expect(relatedA.some((a) => a.slug === 'panduan-lengkap-seo-lokal-kalimantan-selatan')).toBe(false)
})

