import React from 'react'
import { asc } from 'drizzle-orm'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ArticleForm } from '../ArticleForm'

export const dynamic = 'force-dynamic'

export default async function NewArticlePage() {
  let categoryRows: { id: string; name: string }[] = []
  try {
    categoryRows = await db.select({ id: categories.id, name: categories.name }).from(categories).orderBy(asc(categories.name))
  } catch (error) {
    console.error('[dashboard] load categories failed', error)
  }

  return (
    <>
      <DashboardHeader title="Tulis Artikel Baru" subtitle="Susun artikel Markdown lalu simpan sebagai draft atau publikasikan" />
      <main className="p-8 max-w-7xl w-full mx-auto">
        <ArticleForm categories={categoryRows} />
      </main>
    </>
  )
}
