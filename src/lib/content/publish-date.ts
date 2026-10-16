/**
 * Pure helper for deciding what `publishedAt` to persist when saving an article.
 *
 * Rules:
 * - Draft → never clear an existing publication timestamp. First publish date is historical.
 * - Published without explicit date → keep existing date, or fall back to `now` on first publish.
 * - Published with a valid explicit date → use that date.
 * - Invalid explicit date → reject the save.
 */
export interface ComputePublishedAtInput {
  incomingStatus: 'draft' | 'published'
  /** Raw string from the form (e.g. 'YYYY-MM-DD' or ''). */
  incomingRaw: string
  existingPublishedAt: Date | null
  /** Overridable for tests. */
  now?: Date
}

export function computePublishedAt(input: ComputePublishedAtInput): Date | null {
  const { incomingStatus, incomingRaw, existingPublishedAt, now = new Date() } = input

  const explicit = parseDate(incomingRaw)

  if (incomingStatus === 'draft') {
    // Never discard the first publish date when temporarily unpublishing.
    return existingPublishedAt
  }

  if (explicit) return explicit
  if (existingPublishedAt) return existingPublishedAt
  return now
}

function parseDate(raw: string): Date | null {
  if (!raw) return null
  const d = new Date(raw)
  if (Number.isNaN(d.getTime()) || (/^\d{4}-\d{2}-\d{2}$/.test(raw) && d.toISOString().slice(0, 10) !== raw)) {
    throw new Error('Tanggal publikasi tidak valid.')
  }
  return d
}
