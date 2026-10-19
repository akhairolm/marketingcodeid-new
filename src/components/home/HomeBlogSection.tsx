import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { ArticleCard } from '@/components/blog/ArticleCard'
import type { ArticleCard as ArticleCardType } from '@/lib/content/types'
import { sampleArticles } from '@/lib/content/sample-data'

export function HomeBlogSection({ articles = [] }: { articles?: ArticleCardType[] }) {
  // Use provided articles or fallback to top 3 sample articles
  const displayArticles: ArticleCardType[] =
    articles.length > 0
      ? articles.slice(0, 3)
      : sampleArticles.slice(0, 3).map((a) => ({
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          category: a.category,
          coverImage: a.coverImage,
          publishedAt: a.publishedAt,
          updatedAt: a.updatedAt,
          readingMinutes: a.readingMinutes,
        }))

  return (
    <section id="blog-terbaru" aria-label="Artikel dan Edukasi Bisnis" className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 sm:mt-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Wawasan &amp; Edukasi Digital</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Artikel &amp; Panduan Praktis Bisnis Digital
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
            Wawasan teknologi, tips optimasi konversi, dan strategi iklan untuk membantu Anda mengambil keputusan terbaik bagi bisnis.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#FF5C28] hover:text-[#EA4510] group shrink-0"
        >
          <span>Lihat Semua Artikel</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {displayArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
