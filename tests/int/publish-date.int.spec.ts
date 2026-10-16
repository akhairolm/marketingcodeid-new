import { describe, expect, it } from 'vitest'
import { computePublishedAt } from '@/lib/content/publish-date'

describe('computePublishedAt', () => {
  it('new article saved as draft stays null', () => {
    expect(
      computePublishedAt({
        incomingStatus: 'draft',
        incomingRaw: '',
        existingPublishedAt: null,
      }),
    ).toBeNull()
  })

  it('new article published without date uses now', () => {
    const result = computePublishedAt({
      incomingStatus: 'published',
      incomingRaw: '',
      existingPublishedAt: null,
      now: new Date('2026-01-01T00:00:00.000Z'),
    })
    expect(result?.toISOString()).toBe('2026-01-01T00:00:00.000Z')
  })

  it('new article published with explicit date uses that date', () => {
    const result = computePublishedAt({
      incomingStatus: 'published',
      incomingRaw: '2025-06-15',
      existingPublishedAt: null,
    })
    expect(result?.toISOString()).toBe('2025-06-15T00:00:00.000Z')
  })

  it('unpublish keeps original publishedAt instead of nulling', () => {
    const original = new Date('2025-05-10T08:00:00.000Z')
    expect(
      computePublishedAt({
        incomingStatus: 'draft',
        incomingRaw: '',
        existingPublishedAt: original,
      }),
    ).toEqual(original)
  })

  it('republish without explicit date keeps original publishedAt', () => {
    const original = new Date('2025-05-10T08:00:00.000Z')
    expect(
      computePublishedAt({
        incomingStatus: 'published',
        incomingRaw: '',
        existingPublishedAt: original,
        now: new Date('2026-01-01T00:00:00.000Z'),
      }),
    ).toEqual(original)
  })

  it('republish with explicit date overrides original', () => {
    const original = new Date('2025-05-10T08:00:00.000Z')
    expect(
      computePublishedAt({
        incomingStatus: 'published',
        incomingRaw: '2026-02-02',
        existingPublishedAt: original,
      })?.toISOString(),
    ).toBe('2026-02-02T00:00:00.000Z')
  })

  it('invalid date string rejects instead of silently replacing input', () => {
    const original = new Date('2025-05-10T08:00:00.000Z')
    expect(() =>
      computePublishedAt({
        incomingStatus: 'published',
        incomingRaw: 'not-a-date',
        existingPublishedAt: original,
      }),
    ).toThrow('Tanggal publikasi tidak valid.')
  })
})
