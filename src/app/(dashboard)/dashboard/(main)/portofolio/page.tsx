import React from 'react'
import Link from 'next/link'
import { and, count, desc, eq, ilike, or, type SQL } from 'drizzle-orm'
import { db } from '@/db'
import { portfolios } from '@/db/schema'
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
import { deletePortfolioAction } from './actions'
import { Briefcase, MoreHorizontal, Pencil, PlusCircle, Globe, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 10

export default async function PortfolioManagementPage({
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
      or(ilike(portfolios.title, pattern), ilike(portfolios.slug, pattern), ilike(portfolios.clientName, pattern))!,
    )
  }
  if (status === 'published' || status === 'draft') {
    conditions.push(eq(portfolios.status, status))
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined

  let rows: (typeof portfolios.$inferSelect)[] = []
  let total = 0
  try {
    const [countRows, dataRows] = await Promise.all([
      db.select({ value: count() }).from(portfolios).where(where),
      db
        .select()
        .from(portfolios)
        .where(where)
        .orderBy(desc(portfolios.createdAt))
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE),
    ])
    total = countRows[0]?.value ?? 0
    rows = dataRows
  } catch (error) {
    console.error('[dashboard] list portfolios failed', error)
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <ListToolbar searchPlaceholder="Cari judul, slug, atau klien..." statusValue={status} />
        <Button asChild>
          <Link href="/dashboard/portofolio/baru">
            <PlusCircle className="h-4 w-4" />
            Tambah Portofolio
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base">Semua Portofolio Studi Kasus</CardTitle>
          <CardDescription>Klik menu aksi untuk mengedit, melihat live, atau menghapus</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Proyek &amp; Slug</TableHead>
                <TableHead>Klien</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-4 pl-6">
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">/portfolio/{item.slug}</div>
                    </TableCell>
                    <TableCell className="text-sm">{item.clientName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                      {item.isFeatured && (
                        <Badge className="ml-1.5 gap-1">
                          <Star className="h-3 w-3" />
                          Unggulan
                        </Badge>
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
                            <Link href={`/dashboard/portofolio/${item.id}`}>
                              <Pencil className="h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          {item.status === 'published' && (
                            <DropdownMenuItem asChild>
                              <a href={`/portfolio/${item.slug}`} target="_blank" rel="noopener noreferrer">
                                <Globe className="h-4 w-4" />
                                Lihat Live
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DeleteMenuItem
                            action={deletePortfolioAction}
                            id={item.id}
                            label={item.title}
                            description="Portofolio akan dihapus permanen dari database."
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 space-y-3">
                    <Briefcase className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      {q || status !== 'all' ? 'Tidak ada hasil untuk filter ini.' : 'Belum ada portofolio di database.'}
                    </p>
                    <Button asChild size="sm">
                      <Link href="/dashboard/portofolio/baru">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Tambah Sekarang
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="px-6 py-3 border-t">
          <ListPagination page={page} totalPages={totalPages} totalItems={total} label="proyek" />
        </div>
      </Card>
    </main>
  )
}
