import React from 'react'
import { asc, count, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories } from '@/db/schema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteDialog } from '@/components/dashboard/DeleteDialog'
import { deleteCategoryAction } from './actions'
import { CategoryCreateForm } from './CategoryCreateForm'
import { Layers, Trash2 } from 'lucide-react'

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
    <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Tambah Kategori</CardTitle>
          <CardDescription>Kategori dipakai untuk mengelompokkan artikel di /blog</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryCreateForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base">Daftar Kategori</CardTitle>
          <CardDescription>Total {rows.length} kategori terdaftar</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Nama Kategori</TableHead>
                <TableHead>Slug URL</TableHead>
                <TableHead>Jumlah Artikel</TableHead>
                <TableHead className="pr-6 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-4 pl-6 font-semibold text-sm">{item.name}</TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">
                      /blog?category={item.slug}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.articleCount}</Badge>
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-right">
                      <DeleteDialog
                        action={deleteCategoryAction}
                        id={item.id}
                        label={item.name}
                        description="Artikel yang memakai kategori ini akan kehilangan kategori (tidak terhapus)."
                      >
                        <Button variant="ghost" size="icon" className="text-destructive" aria-label={`Hapus ${item.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 space-y-3">
                    <Layers className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">Belum ada kategori di database.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
