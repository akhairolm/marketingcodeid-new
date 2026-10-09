import React from 'react'
import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { portfolios } from '@/db/schema'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { PortfolioForm } from '../PortfolioForm'

export const dynamic = 'force-dynamic'

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const rows = await db.select().from(portfolios).where(eq(portfolios.id, id)).limit(1)
  const item = rows[0]
  if (!item) notFound()

  const resultsText = (item.results ?? []).map((r) => [r.value, r.label].filter(Boolean).join(' | ')).join('\n')

  return (
    <>
      <DashboardHeader title={`Edit: ${item.title}`} subtitle={`/portfolio/${item.slug}`} />
      <main className="p-8 max-w-7xl w-full mx-auto">
        <PortfolioForm
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
    </>
  )
}
