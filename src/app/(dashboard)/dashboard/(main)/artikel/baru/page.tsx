import React from 'react'
import { asc } from 'drizzle-orm'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { getRecentMedia } from '@/lib/media-queries'
import { ArticleForm } from '../ArticleForm'

export const dynamic = 'force-dynamic'

export default async function NewArticlePage() {
  const [categoryRows, mediaItems] = await Promise.all([
    db.select({ id: categories.id, name: categories.name }).from(categories).orderBy(asc(categories.name)).catch(() => []),
    getRecentMedia(),
  ])

  return (
    <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold tracking-tight">Tulis Artikel Baru</h2>
        <p className="text-sm text-muted-foreground">
          Susun artikel Markdown lalu simpan sebagai draft atau publikasikan
        </p>
      </div>
      <ArticleForm categories={categoryRows} mediaItems={mediaItems} />
    </main>
  )
}
