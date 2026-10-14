import React from 'react'
import Link from 'next/link'
import { count, desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories, media, portfolios } from '@/db/schema'
import { Plus, ArrowRight } from 'lucide-react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import { QuickStart } from './QuickStart'

export const dynamic = 'force-dynamic'

async function loadStats() {
  try {
    const [p, a, c, m, lp, la] = await Promise.all([
      db.select({ value: count() }).from(portfolios),
      db.select({ value: count() }).from(articles),
      db.select({ value: count() }).from(categories),
      db.select({ value: count() }).from(media),
      db.select().from(portfolios).orderBy(desc(portfolios.createdAt)).limit(4),
      db.select().from(articles).orderBy(desc(articles.createdAt)).limit(4),
    ])
    return {
      error: false,
      p: p[0]?.value ?? 0,
      a: a[0]?.value ?? 0,
      c: c[0]?.value ?? 0,
      m: m[0]?.value ?? 0,
      lp,
      la,
    }
  } catch (error) {
    console.error('[dashboard] stats query failed', error)
    return { error: true as const, p: 0, a: 0, c: 0, m: 0, lp: [], la: [] }
  }
}

function greeting(hour: number): string {
  if (hour < 11) return 'Selamat pagi'
  if (hour < 15) return 'Selamat siang'
  if (hour < 19) return 'Selamat sore'
  return 'Selamat malam'
}

function StatusChip({ status }: { status: string }) {
  const live = status === 'published'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
        live ? 'bg-chip-live text-chip-live-foreground' : 'bg-chip-draft text-chip-draft-foreground'
      }`}
    >
      {live ? 'Live' : 'Draft'}
    </span>
  )
}

function KpiCard({
  label,
  value,
  icon: Icon,
  live,
  draft,
  desc,
  href,
  delay,
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  live?: number
  draft?: number
  desc?: string
  href: string
  delay: string
}) {
  return (
    <article
      className="group bg-card border border-border rounded-[20px] p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(20,20,22,0.35)] animate-rise"
      style={{ animationDelay: delay }}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs tracking-[0.1em] font-bold text-muted-foreground">{label}</span>
        <span className="w-10 h-10 rounded-xl bg-accent text-accent-foreground grid place-items-center">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="font-display text-[52px] font-extrabold leading-none tracking-tight">{value}</div>
      {typeof live === 'number' && typeof draft === 'number' ? (
        <div className="flex gap-2 flex-wrap">
          <span className="rounded-full px-2.5 py-1 text-xs font-bold bg-chip-live text-chip-live-foreground">
            {live} Live
          </span>
          <span className="rounded-full px-2.5 py-1 text-xs font-bold bg-chip-draft text-chip-draft-foreground">
            {draft} Draft
          </span>
        </div>
      ) : (
        <p className="text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
      )}
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-accent-foreground hover:gap-2.5 transition-all"
      >
        Kelola
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  )
}

function Panel({
  title,
  sub,
  rows,
  empty,
  cta,
  href,
  basePath,
  delay,
}: {
  title: string
  sub: string
  rows: { id: string; title: string; sub: string; status: string }[]
  empty: string
  cta: string
  href: string
  basePath: string
  delay: string
}) {
  return (
    <article
      className="bg-card border border-border rounded-[20px] overflow-hidden animate-rise"
      style={{ animationDelay: delay }}
    >
      <div className="flex justify-between items-start gap-3 px-6 py-5 border-b border-border">
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight m-0">{title}</h3>
          <p className="mt-1 text-[13px] text-muted-foreground">{sub}</p>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-accent-foreground hover:gap-2.5 transition-all shrink-0"
        >
          Lihat Semua
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {rows.length > 0 ? (
        rows.map((r, i) => (
          <Link
            key={r.id}
            href={`${basePath}/${r.id}`}
            className="flex items-center gap-3.5 px-6 py-3.5 border-b border-border last:border-b-0 hover:bg-accent/60 transition-colors"
          >
            <span className="w-10 h-10 rounded-xl bg-accent text-accent-foreground font-display font-extrabold grid place-items-center shrink-0">
              {i + 1}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-bold text-sm truncate">{r.title}</span>
              <span className="block text-xs text-muted-foreground truncate">{r.sub}</span>
            </span>
            <StatusChip status={r.status} />
          </Link>
        ))
      ) : (
        <div className="px-6 py-10 flex flex-col items-center gap-3.5 text-center">
          <svg
            className="animate-float"
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            strokeDasharray="5 5"
            aria-hidden="true"
          >
            <rect x="8" y="8" width="56" height="56" rx="16" />
            <path d="M36 26v20M26 36h20" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-muted-foreground">{empty}</p>
          <Link
            href={href}
            className="inline-flex items-center min-h-11 px-5 rounded-full bg-accent text-accent-foreground text-sm font-bold hover:-translate-y-0.5 transition-transform"
          >
            {cta}
          </Link>
        </div>
      )}
    </article>
  )
}

export default async function DashboardPage() {
  const stats = await loadStats()
  const now = new Date()
  const dateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const hour = now.getHours()
  const hasContent = stats.p > 0 || stats.a > 0

  return (
    <main className="w-full max-w-[1240px] mx-auto p-4 sm:p-8 flex flex-col gap-6">
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

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-zinc-950 rounded-[28px] p-6 sm:p-9 flex flex-wrap items-center justify-between gap-7">
        <span
          aria-hidden="true"
          className="hidden lg:block absolute -right-5 -bottom-28 font-display text-[340px] font-extrabold leading-none tracking-tighter text-zinc-950/10 pointer-events-none select-none"
        >
          &lt;/&gt;
        </span>

        <div className="relative flex-1 min-w-[320px] flex flex-col items-start gap-4">
          <div className="text-[13px] font-bold tracking-[0.1em] uppercase">
            {greeting(hour)}, Admin
          </div>
          <h2 className="font-display m-0 text-[clamp(32px,4vw,52px)] leading-[1.02] tracking-tight max-w-[540px] font-extrabold">
            {hasContent ? 'Konten Anda hidup. Terus tumbuhkan.' : 'Kanvas masih kosong. Saatnya bikin yang pertama.'}
          </h2>
          <p className="m-0 text-[15px] leading-relaxed max-w-[470px]">
            {hasContent
              ? `${stats.p} studi kasus dan ${stats.a} artikel sudah terdaftar. Kelola, perbarui, dan tumbuhkan library konten agensi.`
              : 'Belum ada konten di database. Selesaikan langkah Mulai Cepat di samping, lalu publikasikan studi kasus dan artikel pertama Anda.'}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/dashboard/portofolio/baru"
              className="inline-flex items-center gap-2 min-h-11 px-6 rounded-full bg-zinc-950 text-white text-sm font-bold border-2 border-zinc-950 hover:-translate-y-0.5 transition-transform"
            >
              <Plus className="h-4 w-4" />
              Tambah Portofolio
            </Link>
            <Link
              href="/dashboard/artikel/baru"
              className="inline-flex items-center gap-2 min-h-11 px-6 rounded-full bg-transparent text-zinc-950 text-sm font-bold border-2 border-zinc-950 hover:-translate-y-0.5 transition-transform"
            >
              <Plus className="h-4 w-4" />
              Tulis Artikel
            </Link>
          </div>
        </div>

        <QuickStart />
      </section>

      {/* ── KPI Cards ────────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="TOTAL PORTOFOLIO"
          value={stats.p}
          icon={BriefcaseIcon}
          live={Math.min(stats.p, stats.lp.filter((x) => x.status === 'published').length)}
          draft={stats.p - stats.lp.filter((x) => x.status === 'published').length}
          href="/dashboard/portofolio"
          delay="0ms"
        />
        <KpiCard
          label="ARTIKEL BLOG"
          value={stats.a}
          icon={DocIcon}
          live={stats.la.filter((x) => x.status === 'published').length}
          draft={stats.a - stats.la.filter((x) => x.status === 'published').length}
          href="/dashboard/artikel"
          delay="80ms"
        />
        <KpiCard
          label="KATEGORI KONTEN"
          value={stats.c}
          icon={LayersIcon}
          desc="Taksonomi topik artikel & studi kasus"
          href="/dashboard/kategori"
          delay="160ms"
        />
        <KpiCard
          label="MEDIA LIBRARY"
          value={stats.m}
          icon={ImageIcon}
          desc="Gambar tersimpan di Supabase Storage"
          href="/dashboard/media"
          delay="240ms"
        />
      </section>

      {/* ── Recent Panels ────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel
          title="Portofolio Terbaru"
          sub="Studi kasus klien yang terdaftar di sistem"
          rows={stats.lp.map((x) => ({
            id: x.id,
            title: x.title,
            sub: x.clientName,
            status: x.status,
          }))}
          empty="Belum ada portofolio di database."
          cta="Tambah portofolio pertama"
          href="/dashboard/portofolio"
          basePath="/dashboard/portofolio"
          delay="0ms"
        />
        <Panel
          title="Artikel Blog Terkini"
          sub="Wawasan editorial & strategi bisnis digital"
          rows={stats.la.map((x) => ({
            id: x.id,
            title: x.title,
            sub: `/blog/${x.slug}`,
            status: x.status,
          }))}
          empty="Belum ada artikel di database."
          cta="Tulis artikel pertama"
          href="/dashboard/artikel"
          basePath="/dashboard/artikel"
          delay="120ms"
        />
      </section>
    </main>
  )
}

/* Inline stroke icons (mockup style) */
function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M3 7h18v13H3zM8 7V4h8v3M3 13h18" />
    </svg>
  )
}
function DocIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6" />
    </svg>
  )
}
function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" />
    </svg>
  )
}
function ImageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M3 4h18v16H3zM8 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3M3 17l5-5 4 4 3-3 6 6" />
    </svg>
  )
}
