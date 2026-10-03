'use client'

import React, { useEffect, useState } from 'react'
import type { TocHeading } from '@/lib/content/types'
import { cn } from '@/lib/utils'

/** Sticky table of contents that highlights the section currently in view. */
export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null)

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Daftar isi">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-3">Daftar Isi</p>
      <ol className="space-y-0.5 border-l border-neutral-200">
        {headings.map((h) => {
          const active = h.id === activeId
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  '-ml-px block border-l-2 py-1.5 text-[13px] leading-snug transition-colors',
                  h.level === 3 ? 'pl-6' : 'pl-4',
                  active
                    ? 'border-[#FF5C28] text-neutral-900 font-semibold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300',
                )}
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
