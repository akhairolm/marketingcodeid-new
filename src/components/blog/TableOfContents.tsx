'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { TocHeading } from '@/lib/content/types'
import { cn } from '@/lib/utils'

/** Sticky table of contents that highlights the section currently in view. */
export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null)
  const isClickRef = useRef(false)
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    const updateActiveHeading = () => {
      if (isClickRef.current) return

      // 1. If scrolled to near the bottom of the page, activate the last heading (e.g. Kesimpulan)
      const scrollBottom = window.innerHeight + window.scrollY
      const totalHeight = document.documentElement.scrollHeight
      if (scrollBottom >= totalHeight - 60) {
        const lastHeading = headings[headings.length - 1]
        if (lastHeading) {
          setActiveId(lastHeading.id)
          return
        }
      }

      // 2. Active section is the last heading whose top has scrolled past header offset
      // Fixed header height is ~80px, so 130px gives comfortable reading buffer
      const headerOffset = 130
      let currentId = headings[0]?.id ?? null

      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top <= headerOffset) {
            currentId = h.id
          } else {
            // Headings are ordered chronologically; stop as soon as we find one below the offset
            break
          }
        }
      }

      if (currentId) {
        setActiveId(currentId)
      }
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveHeading()
          ticking = false
        })
        ticking = true
      }
    }

    // Run on initial mount
    updateActiveHeading()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    }
  }, [headings])

  const handleClick = (id: string) => {
    setActiveId(id)
    isClickRef.current = true
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = setTimeout(() => {
      isClickRef.current = false
    }, 800)
  }

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
                onClick={() => handleClick(h.id)}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  '-ml-px block border-l-2 py-1.5 text-[13px] leading-snug transition-colors',
                  h.level === 3 ? 'pl-6' : 'pl-4',
                  active
                    ? 'border-[#FF5C28] text-[#FF5C28] font-semibold'
                    : 'border-transparent text-neutral-500 hover:text-[#FF5C28] hover:border-neutral-300',
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
