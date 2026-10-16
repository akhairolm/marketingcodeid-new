import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioCard as PortfolioCardType } from '@/lib/content/types'

/** Clickable case-study card used on the archive and "related projects" rows. */
export function PortfolioCard({ item, priority = false }: { item: PortfolioCardType; priority?: boolean }) {
  const headline = item.headlineResult

  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card hover:border-[#FF5C28] hover:-translate-y-1 transition-all duration-300 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28] focus-visible:ring-offset-2"
    >
      <div className="aspect-[16/10] w-full overflow-hidden relative bg-neutral-100">
        <Image
          src={item.thumbnail.url}
          alt={item.thumbnail.alt || `Portofolio ${item.title} — ${item.categoryLabel} ${item.clientName}`}
          title={item.thumbnail.alt || `Portofolio ${item.title} — ${item.clientName}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
          {item.categoryLabel}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs font-semibold text-neutral-500">{item.clientName}</p>
        <h3 className="mt-1.5 text-lg font-bold text-neutral-900 leading-snug group-hover:text-[#FF5C28] transition-colors [overflow-wrap:anywhere]">
          {item.title}
        </h3>
        <p className="text-[13px] text-neutral-600 mt-2 leading-relaxed line-clamp-3">{item.summary}</p>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          {headline ? (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 truncate">
              {headline.value} · {headline.label}
            </span>
          ) : (
            <span />
          )}
          <span aria-hidden="true" className="w-9 h-9 shrink-0 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center group-hover:bg-[#FF5C28] group-hover:text-white transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
