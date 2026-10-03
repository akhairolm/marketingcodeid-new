import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import type { ArticleItem } from '@/lib/content/types'
import { formatDate } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Article card. `featured` renders a wide two-column variant for the blog lead story. */
export function ArticleCard({
  article,
  featured = false,
  priority = false,
}: {
  article: ArticleItem
  featured?: boolean
  priority?: boolean
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        'group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all duration-300 flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28] focus-visible:ring-offset-2',
        featured ? 'flex-col lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]' : 'flex-col hover:-translate-y-1',
      )}
    >
      <div className={cn('w-full overflow-hidden relative bg-neutral-100', featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[340px]' : 'aspect-[16/10]')}>
        <Image
          src={article.coverImage.url}
          alt={article.coverImage.alt}
          fill
          priority={priority}
          sizes={featured ? '(min-width: 1024px) 600px, 100vw' : '(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw'}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className={cn('flex flex-col flex-1', featured ? 'p-6 sm:p-9 lg:justify-center' : 'p-6')}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold">
          {article.category && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5F0] text-[#EA4510] border border-orange-200/60">
              {article.category.name}
            </span>
          )}
          <span className="text-neutral-400">{formatDate(article.publishedAt)}</span>
        </div>

        <h3
          className={cn(
            'mt-3 font-bold text-neutral-900 leading-snug group-hover:text-[#FF5C28] transition-colors [overflow-wrap:anywhere]',
            featured ? 'text-2xl sm:text-[28px] tracking-tight' : 'text-lg',
          )}
        >
          {article.title}
        </h3>
        <p className={cn('text-neutral-600 mt-2.5 leading-relaxed', featured ? 'text-sm line-clamp-4' : 'text-[13px] line-clamp-3')}>
          {article.excerpt}
        </p>

        <div className={cn('flex items-center gap-1.5 text-[11px] font-medium text-neutral-400', featured ? 'mt-6' : 'mt-auto pt-5')}>
          <Clock className="w-3.5 h-3.5" />
          <span>{article.readingMinutes} menit baca</span>
          {featured && <span className="ml-auto text-xs font-semibold text-[#FF5C28] whitespace-nowrap">Baca artikel →</span>}
        </div>
      </div>
    </Link>
  )
}
