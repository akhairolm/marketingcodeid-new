'use client'

import React, { useMemo, useState } from 'react'
import type { ArticleCategory, ArticleItem } from '@/lib/content/types'
import { ArticleCard } from './ArticleCard'
import { cn } from '@/lib/utils'

export function BlogFilterGrid({ articles }: { articles: ArticleItem[] }) {
  const [category, setCategory] = useState<string>('all')

  const categories = useMemo(() => {
    const map = new Map<string, ArticleCategory>()
    articles.forEach((a) => a.category && map.set(a.category.slug, a.category))
    return Array.from(map.values())
  }, [articles])

  const filtered = category === 'all' ? articles : articles.filter((a) => a.category?.slug === category)
  const [lead, ...rest] = filtered

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filter kategori artikel">
          {[{ slug: 'all', name: 'Semua Artikel' }, ...categories].map((c) => (
            <button
              key={c.slug}
              id={`blog-filter-${c.slug}`}
              type="button"
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                'px-4 py-2 text-xs rounded-full border transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28] focus-visible:ring-offset-2',
                category === c.slug
                  ? 'bg-[#18181B] border-[#18181B] text-white font-bold'
                  : 'bg-white border-neutral-200 text-neutral-600 font-semibold hover:border-neutral-400 hover:text-neutral-900',
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {lead ? (
        <div className="space-y-6">
          <ArticleCard article={lead} featured priority />
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-sm text-neutral-500 py-16">Belum ada artikel pada kategori ini.</p>
      )}
    </div>
  )
}
