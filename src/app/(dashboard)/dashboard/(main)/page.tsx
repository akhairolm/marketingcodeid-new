import React from 'react'
import Link from 'next/link'
import { count, desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories, media, portfolios } from '@/db/schema'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Briefcase,
  FileText,
  Layers,
  Image as ImageIcon,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

async function loadStats() {
  try {
    const [
      totalPortfolios,
      publishedPortfolios,
      totalArticles,
      publishedArticles,
      totalCategories,
      totalMedia,
      latestPortfolios,
      latestArticles,
    ] = await Promise.all([
      db.select({ value: count() }).from(portfolios),
      db.select({ value: count() }).from(portfolios).where(eq(portfolios.status, 'published')),
      db.select({ value: count() }).from(articles),
      db.select({ value: count() }).from(articles).where(eq(articles.status, 'published')),
      db.select({ value: count() }).from(categories),
      db.select({ value: count() }).from(media),
      db.select().from(portfolios).orderBy(desc(portfolios.createdAt)).limit(5),
      db.select().from(articles).orderBy(desc(articles.createdAt)).limit(5),
    ])

    return {
      error: false,
      totalPortfolios: totalPortfolios[0]?.value ?? 0,
      publishedPortfolios: publishedPortfolios[0]?.value ?? 0,
      totalArticles: totalArticles[0]?.value ?? 0,
      publishedArticles: publishedArticles[0]?.value ?? 0,
      totalCategories: totalCategories[0]?.value ?? 0,
      totalMedia: totalMedia[0]?.value ?? 0,
      latestPortfolios,
      latestArticles,
    }
  } catch (error) {
    console.error('[dashboard] stats query failed', error)
    return {
      error: true,
      totalPortfolios: 0,
      publishedPortfolios: 0,
      totalArticles: 0,
      publishedArticles: 0,
      totalCategories: 0,
      totalMedia: 0,
      latestPortfolios: [],
      latestArticles: [],
    }
  }
}

function StatusBadge({ status }: { status: string }) {
  const published = status === 'published'
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
        published
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-amber-50 text-amber-700 border border-amber-200'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

export default async function DashboardPage() {
  const stats = await loadStats()

  return (
    <>
      <DashboardHeader
        title="Ringkasan Performa Konten"
        subtitle="Dashboard fullstack Next.js + Drizzle ORM — tanpa CMS pihak ketiga"
      />

      <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        {stats.error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700">
            Gagal terhubung ke database. Periksa DATABASE_URL lalu jalankan <code>pnpm db:push</code>.
          </div>
        )}

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="bg-white border-zinc-200/80 shadow-sm hover:border-[#FF5C28]/50 hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Total Portofolio
              </CardTitle>
              <div className="p-2 rounded-xl bg-orange-500/10 text-[#FF5C28]">
                <Briefcase className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                {stats.totalPortfolios}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  <CheckCircle2 className="w-3 h-3" />
                  {stats.publishedPortfolios} Live
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  <Clock className="w-3 h-3" />
                  {stats.totalPortfolios - stats.publishedPortfolios} Draft
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-zinc-200/80 shadow-sm hover:border-blue-400 hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Artikel Blog
              </CardTitle>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
                <FileText className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                {stats.totalArticles}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  <CheckCircle2 className="w-3 h-3" />
                  {stats.publishedArticles} Live
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  <Clock className="w-3 h-3" />
                  {stats.totalArticles - stats.publishedArticles} Draft
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-zinc-200/80 shadow-sm hover:border-purple-400 hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Kategori Konten
              </CardTitle>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
                <Layers className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                {stats.totalCategories}
              </div>
              <p className="text-xs text-zinc-500">Taksonomi topik artikel &amp; studi kasus</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-zinc-200/80 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Media Library
              </CardTitle>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <ImageIcon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                {stats.totalMedia}
              </div>
              <p className="text-xs text-zinc-500">Penyimpanan gambar &amp; aset digital</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border-zinc-200/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <CardTitle className="text-base font-bold text-zinc-900">Portofolio Terbaru</CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Studi kasus klien yang terdaftar di sistem
                </CardDescription>
              </div>
              <Link
                href="/dashboard/portofolio"
                className="text-xs font-semibold text-[#FF5C28] hover:underline flex items-center gap-1"
              >
                Lihat Semua
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-zinc-100">
                    <TableHead className="text-xs font-semibold text-zinc-500">Proyek &amp; Klien</TableHead>
                    <TableHead className="text-xs font-semibold text-zinc-500">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-zinc-500 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.latestPortfolios.length > 0 ? (
                    stats.latestPortfolios.map((item) => (
                      <TableRow key={item.id} className="border-zinc-100 hover:bg-zinc-50/80">
                        <TableCell className="py-3">
                          <div className="font-semibold text-xs text-zinc-900 truncate max-w-[200px]">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-zinc-400">{item.clientName}</div>
                        </TableCell>
                        <TableCell className="py-3">
                          <StatusBadge status={item.status} />
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          <Link
                            href={`/dashboard/portofolio/${item.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF5C28] hover:underline p-1 rounded"
                          >
                            <span>Edit</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-xs text-zinc-400">
                        Belum ada portofolio di database.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white border-zinc-200/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <CardTitle className="text-base font-bold text-zinc-900">Artikel Blog Terkini</CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Wawasan editorial &amp; strategi bisnis digital
                </CardDescription>
              </div>
              <Link
                href="/dashboard/artikel"
                className="text-xs font-semibold text-[#FF5C28] hover:underline flex items-center gap-1"
              >
                Lihat Semua
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-zinc-100">
                    <TableHead className="text-xs font-semibold text-zinc-500">Judul Artikel</TableHead>
                    <TableHead className="text-xs font-semibold text-zinc-500">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-zinc-500 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.latestArticles.length > 0 ? (
                    stats.latestArticles.map((item) => (
                      <TableRow key={item.id} className="border-zinc-100 hover:bg-zinc-50/80">
                        <TableCell className="py-3">
                          <div className="font-semibold text-xs text-zinc-900 truncate max-w-[200px]">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-zinc-400">/blog/{item.slug}</div>
                        </TableCell>
                        <TableCell className="py-3">
                          <StatusBadge status={item.status} />
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          <Link
                            href={`/dashboard/artikel/${item.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF5C28] hover:underline p-1 rounded"
                          >
                            <span>Edit</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-xs text-zinc-400">
                        Belum ada artikel di database.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-xl p-4 bg-white border border-zinc-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-[#FF5C28]/40 text-[#FF5C28]">
              Fullstack
            </Badge>
            <span className="font-semibold text-zinc-800">Stack Aktif:</span>
            <span>Next.js 16 · Drizzle ORM · PostgreSQL · Supabase Storage · shadcn/ui</span>
          </div>
        </div>
      </main>
    </>
  )
}
