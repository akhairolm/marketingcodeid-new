import React from 'react'
import { notFound } from 'next/navigation'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories, media } from '@/db/schema'
import { getRecentMedia } from '@/lib/media-queries'
import { ArticleForm } from '../ArticleForm'

export const dynamic = 'force-dynamic'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [rows, categoryRows, mediaItems] = await Promise.all([
    db.select().from(articles).where(eq(articles.id, id)).limit(1),
    db.select({ id: categories.id, name: categories.name }).from(categories).orderBy(asc(categories.name)),
    getRecentMedia(),
  ])
  const item = rows[0]
  if (!item) notFound()

  const coverRows = item.coverImageId
    ? await db.select().from(media).where(eq(media.id, item.coverImageId)).limit(1)
    : []

  return (
    <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold tracking-tight truncate">{item.title}</h2>
        <p className="text-sm text-muted-foreground font-mono">/blog/{item.slug}</p>
      </div>
      <ArticleForm
        categories={categoryRows}
        mediaItems={mediaItems}
        initial={{
          id: item.id,
          title: item.title,
          slug: item.slug,
          status: item.status,
          publishedAt: item.publishedAt ? toLocalInput(item.publishedAt) : '',
          categoryId: item.categoryId ?? '',
          coverImageId: item.coverImageId ?? '',
          coverImageUrl: coverRows[0]?.publicUrl ?? '',
          excerpt: item.excerpt ?? '',
          content: item.content,
          tags: (item.tags ?? []).join(', '),
          authorName: item.authorName,
          authorRole: item.authorRole ?? '',
          metaTitle: item.metaTitle ?? '',
          metaDescription: item.metaDescription ?? '',
        }}
      />
    </main>
  )
}

function toLocalInput(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
