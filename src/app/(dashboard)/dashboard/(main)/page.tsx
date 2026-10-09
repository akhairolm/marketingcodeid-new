import React from 'react'
import Link from 'next/link'
import { count, desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories, media, portfolios } from '@/db/schema'
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
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import {
  Briefcase,
  FileText,
  Layers,
  Image as ImageIcon,
  ArrowUpRight,
  PlusCircle,
  CircleCheck,
  Clock,
  Terminal,
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
    <Badge variant={published ? 'default' : 'secondary'} className="gap-1 font-medium">
      <span className={`h-1.5 w-1.5 rounded-full ${published ? 'bg-primary-foreground' : 'bg-muted-foreground'}`} />
      {published ? 'Published' : 'Draft'}
    </Badge>
  )
}

function KpiCard({
  title,
  value,
  live,
  draft,
  icon: Icon,
  hint,
  href,
}: {
  title: string
  value: number
  live?: number
  draft?: number
  icon: React.ComponentType<{ className?: string }>
  hint?: string
  href: string
}) {
  return (
    <Card className="hover:border-primary/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-extrabold tracking-tight">{value}</div>
        {typeof live === 'number' && typeof draft === 'number' ? (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 text-emerald-600 border-emerald-200">
              <CircleCheck className="h-3 w-3" />
              {live} Live
            </Badge>
            <Badge variant="outline" className="gap-1 text-amber-600 border-amber-200">
              <Clock className="h-3 w-3" />
              {draft} Draft
            </Badge>
          </div>
        ) : (
          hint && <p className="text-xs text-muted-foreground">{hint}</p>
        )}
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Kelola
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  )
}

export default async function DashboardPage() {
  const stats = await loadStats()

  return (
    <main className="p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
      {stats.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Gagal terhubung ke database</AlertTitle>
          <AlertDescription>
            Periksa <code>DATABASE_URL</code> di <code>.env</code> lalu jalankan{' '}
            <code>pnpm db:push</code>.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          title="Total Portofolio"
          value={stats.totalPortfolios}
          live={stats.publishedPortfolios}
          draft={stats.totalPortfolios - stats.publishedPortfolios}
          icon={Briefcase}
          href="/dashboard/portofolio"
        />
        <KpiCard
          title="Artikel Blog"
          value={stats.totalArticles}
          live={stats.publishedArticles}
          draft={stats.totalArticles - stats.publishedArticles}
          icon={FileText}
          href="/dashboard/artikel"
        />
        <KpiCard
          title="Kategori Konten"
          value={stats.totalCategories}
          icon={Layers}
          hint="Taksonomi topik artikel & studi kasus"
          href="/dashboard/kategori"
        />
        <KpiCard
          title="Media Library"
          value={stats.totalMedia}
          icon={ImageIcon}
          hint="Gambar tersimpan di Supabase Storage"
          href="/dashboard/media"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
            <div>
              <CardTitle className="text-base">Portofolio Terbaru</CardTitle>
              <CardDescription>Studi kasus klien yang terdaftar di sistem</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-primary">
              <Link href="/dashboard/portofolio">
                Lihat Semua
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proyek &amp; Klien</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.latestPortfolios.length > 0 ? (
                  stats.latestPortfolios.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-semibold text-sm truncate max-w-[220px]">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.clientName}</div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm" className="text-primary">
                          <Link href={`/dashboard/portofolio/${item.id}`}>Edit</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-sm text-muted-foreground">
                      Belum ada portofolio di database.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
            <div>
              <CardTitle className="text-base">Artikel Blog Terkini</CardTitle>
              <CardDescription>Wawasan editorial &amp; strategi bisnis digital</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-primary">
              <Link href="/dashboard/artikel">
                Lihat Semua
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul Artikel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.latestArticles.length > 0 ? (
                  stats.latestArticles.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-semibold text-sm truncate max-w-[220px]">{item.title}</div>
                        <div className="text-xs text-muted-foreground font-mono">/blog/{item.slug}</div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm" className="text-primary">
                          <Link href={`/dashboard/artikel/${item.id}`}>Edit</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-sm text-muted-foreground">
                      Belum ada artikel di database.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild>
          <Link href="/dashboard/portofolio/baru">
            <PlusCircle className="h-4 w-4" />
            Tambah Portofolio
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/artikel/baru">
            <PlusCircle className="h-4 w-4" />
            Tulis Artikel
          </Link>
        </Button>
      </div>
    </main>
  )
}
