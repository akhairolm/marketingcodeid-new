import React from 'react'
import { notFound } from 'next/navigation'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories } from '@/db/schema'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ArticleForm } from '../ArticleForm'

export const dynamic = 'force-dynamic'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [rows, categoryRows] = await Promise.all([
    db.select().from(articles).where(eq(articles.id, id)).limit(1),
    db.select({ id: categories.id, name: categories.name }).from(categories).orderBy(asc(categories.name)),
  ])
  const item = rows[0]
  if (!item) notFound()

  return (
    <>
      <DashboardHeader title={`Edit: ${item.title}`} subtitle={`/blog/${item.slug}`} />
      <main className="p-8 max-w-7xl w-full mx-auto">
        <ArticleForm
          categories={categoryRows}
          initial={{
            id: item.id,
            title: item.title,
            slug: item.slug,
            status: item.status,
            publishedAt: item.publishedAt ? toLocalInput(item.publishedAt) : '',
            categoryId: item.categoryId ?? '',
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
    </>
  )
}

function toLocalInput(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
