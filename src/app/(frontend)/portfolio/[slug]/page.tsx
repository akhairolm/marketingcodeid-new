import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Layers,
  Lightbulb,
  MessageCircle,
  Quote,
  Target,
  Timer,
  UserRound,
} from 'lucide-react'
import {
  getPortfolioBySlug,
  getPortfolioSitemapEntries,
  getRelatedPortfolios,
} from '@/lib/content/queries'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { jsonLdString } from '@/lib/seo'
import { SITE_NAME, absoluteUrl, formatMonth } from '@/lib/site'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { CtaBanner } from '@/components/site/CtaBanner'
import { RichText } from '@/components/common/RichText'
import { PortfolioCard } from '@/components/portfolio/PortfolioCard'

export const revalidate = 60

const RESULT_COLS: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
}

export async function generateStaticParams() {
  const items = await getPortfolioSitemapEntries()
  return items.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/portfolio/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const item = await getPortfolioBySlug(slug)
  if (!item) return { title: `Proyek tidak ditemukan | ${SITE_NAME}` }

  const title = item.metaTitle || `${item.title} — Studi Kasus`
  const description = item.metaDescription || item.summary
  const url = absoluteUrl(`/portfolio/${item.slug}`)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'id_ID',
      images: [
        {
          url: absoluteUrl(item.thumbnail.url),
          width: 1200,
          height: 630,
          alt: item.thumbnail.alt || `${item.title} — Studi Kasus Portofolio MarketingCode.ID`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(item.thumbnail.url)],
    },
  }
}

function SectionHeading({ index, icon: Icon, children }: { index: string; icon: typeof Target; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3 sm:mb-4">
      <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#FFF5F0] border border-orange-200/60 text-[#FF5C28] flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-400">{index}</p>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">{children}</h2>
      </div>
    </div>
  )
}

export default async function PortfolioDetailPage({ params }: PageProps<'/portfolio/[slug]'>) {
  const { slug } = await params
  const item = await getPortfolioBySlug(slug)
  if (!item) notFound()

  const related = await getRelatedPortfolios(item.slug, item.category, 3)

  const waHref = getWhatsAppUrl('case-study', item.title)
  const completed = formatMonth(item.completedDate)

  const facts = [
    { icon: Building2, label: 'Klien', value: item.clientName },
    { icon: Layers, label: 'Layanan', value: item.categoryLabel },
    { icon: CalendarDays, label: 'Selesai', value: completed },
    { icon: Timer, label: 'Durasi', value: item.duration },
    { icon: UserRound, label: 'Peran Kami', value: item.role },
  ].filter((f) => Boolean(f.value))

  let step = 0
  const nextIndex = () => String(++step).padStart(2, '0')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    headline: item.title,
    description: item.metaDescription || item.summary,
    image: absoluteUrl(item.thumbnail.url),
    url: absoluteUrl(`/portfolio/${item.slug}`),
    ...(item.completedDate ? { dateCreated: item.completedDate } : {}),
    keywords: item.techStack.join(', '),
    creator: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
  }

  return (
    <div className="min-h-screen">

      <main className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[560px] bg-grid-pattern [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4">
          <Breadcrumbs
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Portofolio', href: '/portfolio' },
              { label: item.title },
            ]}
          />

          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-7 min-w-0 animate-fade-up">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold">
                Studi Kasus · {item.categoryLabel}
              </span>
              <h1 className="mt-4 sm:mt-5 text-[28px] leading-[1.15] sm:text-5xl sm:leading-[1.08] lg:text-[56px] font-extrabold text-[#111827] tracking-tight [overflow-wrap:anywhere]">
                {item.title}
              </h1>
              <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">{item.summary}</p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <a
                  id="portfolio-cta-whatsapp"
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  Bangun Solusi Serupa
                </a>
                {item.liveUrl && (
                  <a
                    id="portfolio-live-demo"
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-800 bg-white border border-neutral-200 hover:border-neutral-400 rounded-full transition-all"
                  >
                    Lihat Live Demo
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {facts.length > 0 && (
              <dl className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200/80 shadow-card p-4 sm:p-0 sm:divide-y sm:divide-neutral-100 grid grid-cols-2 sm:block gap-3 animate-fade-up [animation-delay:120ms]">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4 sm:px-6 sm:py-4">
                    <div className="flex items-center gap-2 sm:contents">
                      <Icon className="w-4 h-4 text-[#FF5C28] shrink-0" />
                      <dt className="sm:w-24 sm:shrink-0 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-neutral-400">{label}</dt>
                    </div>
                    <dd className="text-[13px] sm:text-sm font-semibold text-neutral-800 min-w-0">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* ── Cover + results strip ───────────────────────── */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-10 sm:mt-16">
          <figure className="relative aspect-[16/10] sm:aspect-[16/8] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-neutral-100 shadow-soft">
            <Image
              src={item.thumbnail.url}
              alt={item.thumbnail.alt || `${item.title} — Studi Kasus Portofolio MarketingCode.ID`}
              title={item.thumbnail.alt || `${item.title} — Portofolio ${item.clientName}`}
              fill
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover"
            />
          </figure>

          {item.results.length > 0 && (
            <div
              aria-label="Hasil proyek"
              className={`mt-4 sm:relative sm:-mt-14 sm:mx-10 bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-card grid grid-cols-1 ${RESULT_COLS[Math.min(item.results.length, 4)]} divide-y sm:divide-y-0 sm:divide-x divide-neutral-100`}
            >
              {item.results.map((r) => (
                <div key={r.label} className="px-5 py-4 sm:px-6 sm:py-6 text-center sm:text-left min-w-0">
                  <p className="text-2xl sm:text-[34px] font-extrabold tracking-tight text-neutral-900 [overflow-wrap:anywhere]">
                    {r.value}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 leading-snug">{r.label}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Story ───────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          <div className="lg:col-span-8 lg:order-2 min-w-0 space-y-10 sm:space-y-14">
            {item.challenge && (
              <article>
                <SectionHeading index={nextIndex()} icon={Target}>
                  Tantangan
                </SectionHeading>
                <p className="text-[15px] sm:text-base text-neutral-700 leading-[1.8]">{item.challenge}</p>
              </article>
            )}

            {item.solution && (
              <article>
                <SectionHeading index={nextIndex()} icon={Lightbulb}>
                  Solusi yang Kami Bangun
                </SectionHeading>
                <p className="text-[15px] sm:text-base text-neutral-700 leading-[1.8]">{item.solution}</p>
                {item.content && <RichText data={item.content} className="mt-6" />}
              </article>
            )}

            {item.testimonial && (
              <figure className="relative rounded-2xl sm:rounded-3xl bg-[#121214] text-white p-6 sm:p-10 overflow-hidden">
                <div aria-hidden className="absolute -right-16 -top-16 w-64 h-64 bg-[#FF5C28]/20 rounded-full blur-3xl" />
                <Quote aria-hidden className="relative w-8 h-8 text-[#FF5C28]" />
                <blockquote className="relative mt-4 text-lg sm:text-xl font-semibold leading-relaxed">
                  “{item.testimonial.quote}”
                </blockquote>
                {(item.testimonial.name || item.testimonial.role) && (
                  <figcaption className="relative mt-6 text-sm text-neutral-400">
                    <span className="text-white font-semibold">{item.testimonial.name}</span>
                    {item.testimonial.role && <span> · {item.testimonial.role}</span>}
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          <aside className="lg:col-span-4 lg:order-1 space-y-5 lg:sticky lg:top-28 self-start">
            {item.techStack.length > 0 && (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-card p-5 sm:p-6">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400">Tech Stack</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#FFF5F0] to-white border border-orange-200/60">
              <p className="text-sm font-bold text-neutral-900">Punya tantangan serupa?</p>
              <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                Ceritakan kondisi bisnis Anda. Kami bantu petakan solusi dan estimasinya tanpa biaya.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Diskusi via WhatsApp
              </a>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#FF5C28] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Semua portofolio
            </Link>
          </aside>
        </section>

        {/* ── Gallery ─────────────────────────────────────── */}
        {item.gallery.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-14 sm:mt-24">
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">Galeri Proyek</h2>
            <div className="mt-5 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {item.gallery.map((g, idx) => (
                <figure
                  key={`${g.image.url}-${idx}`}
                  className={idx === 0 && item.gallery.length % 2 === 1 ? 'md:col-span-2' : undefined}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-neutral-100">
                    <Image
                      src={g.image.url}
                      alt={g.image.alt || `${item.title} Screenshot Galeri ${idx + 1}`}
                      title={g.caption || g.image.alt || `${item.title} — Tampilan ${idx + 1}`}
                      fill
                      sizes={idx === 0 && item.gallery.length % 2 === 1 ? '(min-width: 1152px) 1104px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                      className="object-cover hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  {g.caption && <figcaption className="mt-3 text-xs text-neutral-500">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── Related ─────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-14 sm:mt-24">
            <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">Proyek Lainnya</h2>
              <Link
                href="/portfolio"
                className="text-xs font-semibold text-neutral-600 hover:text-[#FF5C28] whitespace-nowrap transition-colors"
              >
                Lihat semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.map((p) => (
                <PortfolioCard key={p.slug} item={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 sm:mt-24">
          <CtaBanner
            title="Siap Membangun Proyek Berikutnya Bersama Kami?"
            description={`Ceritakan kebutuhan Anda — kami siapkan rancangan solusi seperti ${item.title} yang disesuaikan dengan target bisnis Anda.`}
            whatsappHref={waHref}
            secondary={{ href: '/portfolio', label: 'Lihat Portofolio Lain' }}
          />
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
    </div>
  )
}
