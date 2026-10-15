import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import '@/app/(frontend)/tiptap.css'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, MessageCircle } from 'lucide-react'
import { getArticleBySlug, getArticles } from '@/lib/content/queries'
import { extractHeadings } from '@/lib/content/markdown'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { jsonLdString } from '@/lib/seo'
import { SITE_NAME, absoluteUrl, formatDate } from '@/lib/site'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { CtaBanner } from '@/components/site/CtaBanner'
import { RichText } from '@/components/common/RichText'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ShareActions } from '@/components/blog/ShareActions'

export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: `Artikel tidak ditemukan | ${SITE_NAME}` }

  const title = article.metaTitle || article.title
  const description = article.metaDescription || article.excerpt
  const url = absoluteUrl(`/blog/${article.slug}`)

  return {
    title,
    description,
    keywords: article.tags,
    authors: [{ name: article.authorName }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'id_ID',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.authorName],
      tags: article.tags,
      images: [
        {
          url: absoluteUrl(article.coverImage.url),
          width: 1200,
          height: 630,
          alt: article.coverImage.alt || article.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(article.coverImage.url)],
    },
  }
}

function initials(name: string) {
  return name
    .replace(/[^A-Za-z\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('') || 'MC'
}

export default async function ArticleDetailPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const all = await getArticles()
  const others = all.filter((a) => a.slug !== article.slug)
  const related = [
    ...others.filter((a) => a.category && a.category.slug === article.category?.slug),
    ...others.filter((a) => !a.category || a.category.slug !== article.category?.slug),
  ].slice(0, 3)

  const headings = extractHeadings(article.content)
  const url = absoluteUrl(`/blog/${article.slug}`)
  const waHref = getWhatsAppUrl('article', article.title)
  const published = formatDate(article.publishedAt)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: [absoluteUrl(article.coverImage.url)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { '@type': 'Person', name: article.authorName },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: article.tags.join(', '),
    ...(article.category ? { articleSection: article.category.name } : {}),
  }

  const faqJsonLd =
    article.slug === 'apakah-umkm-perlu-website-sendiri'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Saya gaptek dan nggak ngerti koding, apa nanti bisa kelola websitenya?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Bisa banget! Website yang dibuatkan untuk UMKM sudah dilengkapi halaman admin yang sangat mudah digunakan. Mengganti harga, mengedit promo, atau menambah foto produk baru semudah membuat postingan di media sosial.',
              },
            },
            {
              '@type': 'Question',
              name: 'Apakah pembeli tetap bisa pesan langsung lewat WhatsApp?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Tentu saja. Setiap produk atau layanan di website akan dilengkapi tombol Pesan via WhatsApp yang langsung mengirimkan rincian pesanan pelanggan ke ruang chat admin Anda.',
              },
            },
            {
              '@type': 'Question',
              name: 'Berapa lama proses pembuatan website untuk UMKM sampai siap pakai?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Untuk pembuatan Landing Page promosi, website katalog UMKM, atau Company Profile, rata-rata sudah siap online dalam 3 sampai 7 hari kerja setelah materi produk dan profil usaha terkumpul.',
              },
            },
            {
              '@type': 'Question',
              name: 'Usaha saya di daerah kabupaten seperti Kandangan (HSS), apa tetap efektif pakai website?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Justru sangat efektif karena persaingan digital di tingkat kabupaten dan kota sekitarnya masih rendah, sehingga website bisnis Anda bisa jauh lebih cepat naik ke peringkat pertama pencarian Google.',
              },
            },
          ],
        }
      : null

  return (
    <div className="min-h-screen">
      <ReadingProgress targetId="article-body" />

      <main className="relative pt-28 sm:pt-32 pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[520px] bg-grid-pattern [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />

        <article>
          {/* ── Header ──────────────────────────────────────── */}
          <header className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-4">
            <Breadcrumbs
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: article.title },
              ]}
            />

            <div className="mt-8 animate-fade-up">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold">
                {article.category && (
                  <span className="px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510]">
                    {article.category.name}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-neutral-500">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingMinutes} menit baca
                </span>
              </div>

              <h1 className="mt-5 text-[32px] sm:text-[44px] lg:text-[50px] font-extrabold text-[#111827] tracking-tight leading-[1.1] [overflow-wrap:anywhere]">
                {article.title}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">{article.excerpt}</p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-neutral-200/80 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5C28] to-[#EA4510] text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {initials(article.authorName)}
                  </span>
                  <div className="min-w-0 text-sm leading-tight">
                    <p className="font-semibold text-neutral-900 truncate">{article.authorName}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {article.authorRole ? `${article.authorRole} · ` : ''}
                      <time dateTime={article.publishedAt}>{published}</time>
                    </p>
                  </div>
                </div>
                <ShareActions url={url} title={article.title} />
              </div>
            </div>
          </header>

          {/* ── Cover ───────────────────────────────────────── */}
          <figure className="relative max-w-5xl mx-auto px-4 sm:px-6 mt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-100 shadow-soft">
              <Image
                src={article.coverImage.url}
                alt={article.coverImage.alt || article.title}
                title={article.coverImage.alt || article.title}
                fill
                priority
                sizes="(min-width: 1024px) 976px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>

          {/* ── Body ────────────────────────────────────────── */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-14 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10 lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <TableOfContents headings={headings} />
                <div className="rounded-3xl p-5 bg-gradient-to-br from-[#FFF5F0] to-white border border-orange-200/60">
                  <p className="text-sm font-bold text-neutral-900 leading-snug">Butuh bantuan menerapkannya?</p>
                  <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">Konsultasi awal gratis bersama tim kami.</p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            </aside>

            <div id="article-body" className="min-w-0 max-w-[68ch]">
              {headings.length > 0 && (
                <details className="lg:hidden mb-10 rounded-2xl border border-neutral-200 bg-white px-5 py-4 group">
                  <summary className="cursor-pointer list-none flex items-center justify-between text-sm font-semibold text-neutral-800">
                    Daftar Isi
                    <span className="text-neutral-400 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <ol className="mt-3 space-y-2 text-sm text-neutral-600">
                    {headings.map((h) => (
                      <li key={h.id} className={h.level === 3 ? 'pl-4' : undefined}>
                        <a href={`#${h.id}`} className="hover:text-[#FF5C28]">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              <RichText data={article.content} />

              {article.tags.length > 0 && (
                <ul aria-label="Tag artikel" className="mt-12 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li key={tag} className="px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}

              {/* Author + share */}
              <div className="mt-10 rounded-3xl border border-neutral-200/80 bg-white shadow-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5">
                <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5C28] to-[#EA4510] text-white text-lg font-bold flex items-center justify-center shrink-0">
                  {initials(article.authorName)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400">Ditulis oleh</p>
                  <p className="mt-1 font-bold text-neutral-900">{article.authorName}</p>
                  {article.authorRole && <p className="text-xs text-neutral-500 mt-0.5">{article.authorRole}</p>}
                </div>
                <div className="sm:text-right">
                  <p className="text-xs text-neutral-500 mb-2">Bagikan artikel ini</p>
                  <ShareActions url={url} title={article.title} />
                </div>
              </div>

              <Link
                href="/blog"
                className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#FF5C28] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali ke semua artikel
              </Link>
            </div>
          </div>
        </article>

        {/* ── Related ─────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">Artikel Terkait</h2>
              <Link href="/blog" className="text-xs font-semibold text-neutral-600 hover:text-[#FF5C28] whitespace-nowrap transition-colors">
                Lihat semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-24">
          <CtaBanner
            title="Ingin Menerapkan Strategi Ini di Bisnis Anda?"
            description="Diskusikan kondisi bisnis Anda bersama tim developer dan digital marketer kami. Kami bantu susun langkah yang paling masuk akal untuk dimulai."
            whatsappHref={waHref}
            secondary={{ href: '/portfolio', label: 'Lihat Studi Kasus' }}
          />
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />}
    </div>
  )
}
