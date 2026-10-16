'use client'

import React, { useMemo, useState } from 'react'
import type { PortfolioCard as PortfolioCardType, PortfolioCategory } from '@/lib/content/types'
import { PORTFOLIO_CATEGORY_LABEL } from '@/lib/content/types'
import { PortfolioCard } from './PortfolioCard'
import { cn } from '@/lib/utils'

type Filter = 'all' | PortfolioCategory

export function PortfolioFilterGrid({ items }: { items: PortfolioCardType[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))) as PortfolioCategory[],
    [items],
  )
  const visible = filter === 'all' ? items : items.filter((i) => i.category === filter)

  const tabs: { value: Filter; label: string; count: number }[] = [
    { value: 'all', label: 'Semua Proyek', count: items.length },
    ...categories.map((c) => ({
      value: c,
      label: PORTFOLIO_CATEGORY_LABEL[c],
      count: items.filter((i) => i.category === c).length,
    })),
  ]

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div role="group" aria-label="Filter kategori portofolio" className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200 overflow-x-auto max-w-full snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              id={`portfolio-filter-${tab.value}`}
              type="button"
              aria-pressed={filter === tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                'px-4 sm:px-5 py-2 text-xs rounded-full transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28]',
                filter === tab.value
                  ? 'font-bold bg-white text-neutral-900 shadow-sm'
                  : 'font-semibold text-neutral-600 hover:text-neutral-900',
              )}
            >
              {tab.label}
              <span className="ml-1.5 font-mono text-[10px] text-neutral-400">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((item, idx) => (
          <PortfolioCard key={item.slug} item={item} priority={idx < 3} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-center text-sm text-neutral-500 py-16">Belum ada proyek pada kategori ini.</p>
      )}
    </div>
  )
}
