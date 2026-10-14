import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { absoluteUrl } from '@/lib/site'
import { jsonLdString } from '@/lib/seo'

export interface Crumb {
  label: string
  href?: string
}

/** Visible breadcrumb trail + BreadcrumbList JSON-LD for rich results. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-1.5 text-xs text-neutral-500 min-w-0">
        {items.map((item, idx) => {
          const last = idx === items.length - 1
          return (
            <li key={`${item.label}-${idx}`} className={last ? 'min-w-0 truncate' : 'flex items-center gap-1.5 shrink-0'}>
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-[#FF5C28] transition-colors whitespace-nowrap">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-neutral-800 font-medium' : ''}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className="w-3.5 h-3.5 text-neutral-300" />}
            </li>
          )
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
    </nav>
  )
}
