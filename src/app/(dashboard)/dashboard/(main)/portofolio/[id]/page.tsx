import React from 'react'
import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { media, portfolios } from '@/db/schema'
import { PortfolioForm } from '../PortfolioForm'
import { getRecentMedia } from '@/lib/media-queries'

export const dynamic = 'force-dynamic'

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [rows, mediaItems] = await Promise.all([
    db.select().from(portfolios).where(eq(portfolios.id, id)).limit(1),
    getRecentMedia(),
  ])
  const item = rows[0]
  if (!item) notFound()

  let thumbnailUrl = ''
  if (item.thumbnailId) {
    const thumb = await db
      .select({ publicUrl: media.publicUrl })
      .from(media)
      .where(eq(media.id, item.thumbnailId))
      .limit(1)
    thumbnailUrl = thumb[0]?.publicUrl ?? ''
  }

  const resultsText = (item.results ?? []).map((r) => [r.value, r.label].filter(Boolean).join(' | ')).join('\n')

  return (
    <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold tracking-tight truncate">{item.title}</h2>
        <p className="text-sm text-muted-foreground font-mono">/portfolio/{item.slug}</p>
      </div>
      <PortfolioForm
        mediaItems={mediaItems}
        initial={{
          id: item.id,
          title: item.title,
          slug: item.slug,
          status: item.status,
          isFeatured: item.isFeatured,
          completedDate: item.completedDate ? item.completedDate.toISOString().slice(0, 10) : '',
          clientName: item.clientName,
          category: item.category,
          summary: item.summary,
          thumbnailId: item.thumbnailId ?? '',
          thumbnailUrl,
          duration: item.duration ?? '',
          role: item.role ?? '',
          liveUrl: item.liveUrl ?? '',
          challenge: item.challenge ?? '',
          solution: item.solution ?? '',
          resultsText,
          techStack: (item.techStack ?? []).join(', '),
          content: item.content ?? '',
          testimonialQuote: item.testimonialQuote ?? '',
          testimonialName: item.testimonialName ?? '',
          testimonialRole: item.testimonialRole ?? '',
          metaTitle: item.metaTitle ?? '',
          metaDescription: item.metaDescription ?? '',
        }}
      />
    </main>
  )
}
