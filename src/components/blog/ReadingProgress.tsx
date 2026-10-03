'use client'

import React, { useEffect, useState } from 'react'

/** Thin accent bar at the very top that fills as the reader scrolls the article. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = target.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      setProgress(total > 0 ? scrolled / total : 1)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [targetId])

  return (
    <div aria-hidden className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#FF5C28] to-[#EA4510] origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
