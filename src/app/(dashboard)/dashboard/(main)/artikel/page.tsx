import React from 'react'
import Link from 'next/link'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories } from '@/db/schema'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteButton } from '@/components/dashboard/DeleteButton'
import { deleteArticleAction } from './actions'
import {
  FileText,
  PlusCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Globe,
  Tag,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ArticlesManagementPage() {
  let rows: { article: typeof articles.$inferSelect; categoryName: string | null }[] = []
  try {
    rows = await db
      .select({ article: articles, categoryName: categories.name })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .orderBy(desc(articles.createdAt))
      .limit(200)
  } catch (error) {
    console.error('[dashboard] list articles failed', error)
  }

  const publishedCount = rows.filter((r) => r.article.status === 'published').length
  const draftCount = rows.length - publishedCount

  return (
    <>
      <DashboardHeader
        title="Kelola Artikel & Blog"
        subtitle="Daftar konten wawasan, artikel edukasi, dan status publikasi editorial"
      />

      <main className="p-8 space-y-6 max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-zinc-600">Total:</span>
            <span className="text-base font-bold text-zinc-900">{rows.length} Artikel</span>
            <span className="text-zinc-300">|</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              {publishedCount} Published
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              <Clock className="w-3 h-3" />
              {draftCount} Draft
            </span>
          </div>

          <Link
            href="/dashboard/artikel/baru"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#FF5C28] hover:bg-[#ea4510] text-white shadow-sm shadow-[#FF5C28]/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </Link>
        </div>

        <Card className="bg-white border-zinc-200/80 shadow-sm overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
            <CardTitle className="text-sm font-bold text-zinc-900">Semua Artikel Blog</CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Konten ditulis dalam format Markdown
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-100 bg-zinc-50/30">
                  <TableHead className="text-xs font-semibold text-zinc-500 pl-6">Judul &amp; Slug</TableHead>
                  <TableHead className="text-xs font-semibold text-zinc-500">Kategori</TableHead>
                  <TableHead className="text-xs font-semibold text-zinc-500">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-zinc-500 text-right pr-6">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map(({ article: item, categoryName }) => (
                    <TableRow key={item.id} className="border-zinc-100 hover:bg-zinc-50/80">
                      <TableCell className="py-4 pl-6">
                        <div className="font-semibold text-xs text-zinc-900 max-w-[280px] truncate">{item.title}</div>
                        <div className="text-[11px] text-zinc-400 font-mono mt-0.5">/blog/{item.slug}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        {categoryName ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                            <Tag className="w-3 h-3 text-zinc-400" />
                            {categoryName}
                          </span>
                        ) : (
                          <span className="text-xs text-zinc-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            item.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          {item.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-3">
                          {item.status === 'published' && (
                            <Link
                              href={`/blog/${item.slug}`}
                              target="_blank"
                              className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 hover:underline"
                            >
                              <Globe className="w-3 h-3 text-[#FF5C28]" />
                              <span>Live</span>
                            </Link>
                          )}
                          <Link
                            href={`/dashboard/artikel/${item.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF5C28] hover:underline"
                          >
                            <span>Edit</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                          <DeleteButton
                            action={deleteArticleAction}
                            id={item.id}
                            label={item.title}
                            confirmMessage={`Hapus artikel "${item.title}"? Tindakan ini tidak bisa dibatalkan.`}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 space-y-3">
                      <FileText className="w-8 h-8 text-zinc-300 mx-auto" />
                      <p className="text-xs text-zinc-500">Belum ada artikel di database.</p>
                      <Link
                        href="/dashboard/artikel/baru"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FF5C28] text-white hover:bg-[#ea4510]"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        Tulis Artikel Pertama
                      </Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
