import React from 'react'
import Link from 'next/link'
import { and, count, desc, eq, ilike, or, type SQL } from 'drizzle-orm'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteMenuItem } from '@/components/dashboard/DeleteDialog'
import { ListToolbar, ListPagination } from '@/components/dashboard/ListControls'
import { deleteArticleAction } from './actions'
import {
  FileText,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Globe,
  Tag,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 10

export default async function ArticlesManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>
}) {
  const { q = '', status = 'all', page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)

  const conditions: SQL[] = []
  if (q) {
    const pattern = `%${q}%`
    conditions.push(
      or(ilike(articles.title, pattern), ilike(articles.slug, pattern))!,
    )
  }
  if (status === 'published' || status === 'draft') {
    conditions.push(eq(articles.status, status))
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined

  let rows: { article: typeof articles.$inferSelect; categoryName: string | null }[] = []
  let total = 0
  try {
    const [countRows, dataRows] = await Promise.all([
      db.select({ value: count() }).from(articles).where(where),
      db
        .select({ article: articles, categoryName: categories.name })
        .from(articles)
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .where(where)
        .orderBy(desc(articles.createdAt))
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE),
    ])
    total = countRows[0]?.value ?? 0
    rows = dataRows
  } catch (error) {
    console.error('[dashboard] list articles failed', error)
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <ListToolbar searchPlaceholder="Cari judul atau slug..." statusValue={status} />
        <Button asChild>
          <Link href="/dashboard/artikel/baru">
            <PlusCircle className="h-4 w-4" />
            Tulis Artikel
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base">Semua Artikel Blog</CardTitle>
          <CardDescription>Konten ditulis dalam format Markdown</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Judul &amp; Slug</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map(({ article: item, categoryName }) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-4 pl-6">
                      <div className="font-semibold text-sm max-w-[280px] truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">/blog/{item.slug}</div>
                    </TableCell>
                    <TableCell>
                      {categoryName ? (
                        <Badge variant="secondary" className="gap-1 font-medium">
                          <Tag className="h-3 w-3" />
                          {categoryName}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Menu aksi">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/artikel/${item.id}`}>
                              <Pencil className="h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          {item.status === 'published' && (
                            <DropdownMenuItem asChild>
                              <a href={`/blog/${item.slug}`} target="_blank" rel="noopener noreferrer">
                                <Globe className="h-4 w-4" />
                                Lihat Live
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DeleteMenuItem
                            action={deleteArticleAction}
                            id={item.id}
                            label={item.title}
                            description="Artikel akan dihapus permanen dari database."
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 space-y-3">
                    <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      {q || status !== 'all' ? 'Tidak ada hasil untuk filter ini.' : 'Belum ada artikel di database.'}
                    </p>
                    <Button asChild size="sm">
                      <Link href="/dashboard/artikel/baru">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Tulis Artikel Pertama
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="px-6 py-3 border-t">
          <ListPagination page={page} totalPages={totalPages} totalItems={total} label="artikel" />
        </div>
      </Card>
    </main>
  )
}
