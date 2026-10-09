import React from 'react'
import { asc, count, eq } from 'drizzle-orm'
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
import { deleteCategoryAction } from './actions'
import { CategoryCreateForm } from './CategoryCreateForm'
import { Layers } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CategoriesManagementPage() {
  let rows: { id: string; name: string; slug: string; articleCount: number }[] = []
  try {
    const counted = await db
      .select({ id: categories.id, name: categories.name, slug: categories.slug, articleCount: count(articles.id) })
      .from(categories)
      .leftJoin(articles, eq(articles.categoryId, categories.id))
      .groupBy(categories.id, categories.name, categories.slug)
      .orderBy(asc(categories.name))
    rows = counted.map((r) => ({ ...r, articleCount: Number(r.articleCount) }))
  } catch (error) {
    console.error('[dashboard] list categories failed', error)
  }

  return (
    <>
      <DashboardHeader
        title="Kategori & Taksonomi Konten"
        subtitle="Struktur topik untuk pengelompokan artikel dan wawasan agensi"
      />

      <main className="p-8 space-y-6 max-w-7xl w-full mx-auto">
        <Card className="bg-white border-zinc-200/80 shadow-sm p-5">
          <CategoryCreateForm />
        </Card>

        <Card className="bg-white border-zinc-200/80 shadow-sm overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
            <CardTitle className="text-sm font-bold text-zinc-900">Daftar Kategori</CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Kategori dipakai untuk filter artikel di halaman /blog
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-100 bg-zinc-50/30">
                  <TableHead className="text-xs font-semibold text-zinc-500 pl-6">Nama Kategori</TableHead>
                  <TableHead className="text-xs font-semibold text-zinc-500">Slug URL</TableHead>
                  <TableHead className="text-xs font-semibold text-zinc-500">Jumlah Artikel</TableHead>
                  <TableHead className="text-xs font-semibold text-zinc-500 text-right pr-6">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((item) => (
                    <TableRow key={item.id} className="border-zinc-100 hover:bg-zinc-50/80">
                      <TableCell className="py-4 pl-6 font-semibold text-xs text-zinc-900">{item.name}</TableCell>
                      <TableCell className="py-4 text-xs font-mono text-zinc-400">/blog?category={item.slug}</TableCell>
                      <TableCell className="py-4 text-xs text-zinc-600">{item.articleCount}</TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <DeleteButton
                          action={deleteCategoryAction}
                          id={item.id}
                          label={item.name}
                          confirmMessage={`Hapus kategori "${item.name}"? Artikel yang memakai kategori ini akan kehilangan kategori (tidak terhapus).`}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 space-y-3">
                      <Layers className="w-8 h-8 text-zinc-300 mx-auto" />
                      <p className="text-xs text-zinc-500">Belum ada kategori di database.</p>
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
