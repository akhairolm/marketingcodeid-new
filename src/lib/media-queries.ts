import { cache } from 'react'
import { desc } from 'drizzle-orm'
import { db } from '@/db'
import { media } from '@/db/schema'

export type MediaItem = {
  id: string
  filename: string
  publicUrl: string
  altText: string | null
  createdAt: Date
}

/** Recent uploads for pickers (thumbnail selector, editor inserts). */
export const getRecentMedia = cache(async (limit = 60): Promise<MediaItem[]> => {
  try {
    const rows = await db
      .select({
        id: media.id,
        filename: media.filename,
        publicUrl: media.publicUrl,
        altText: media.altText,
        createdAt: media.createdAt,
      })
      .from(media)
      .orderBy(desc(media.createdAt))
      .limit(limit)
    return rows
  } catch {
    return []
  }
})
