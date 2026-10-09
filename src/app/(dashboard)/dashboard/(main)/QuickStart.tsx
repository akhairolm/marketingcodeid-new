'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const STEPS = [
  { title: 'Buat kategori', desc: 'Atur taksonomi topik konten', href: '/dashboard/kategori' },
  { title: 'Unggah media', desc: 'Simpan gambar ke Media Library', href: '/dashboard/media' },
  { title: 'Tambah portofolio', desc: 'Publikasikan studi kasus pertama', href: '/dashboard/portofolio/baru' },
  { title: 'Tulis artikel', desc: 'Bagikan wawasan digital pertama', href: '/dashboard/artikel/baru' },
] as const

const STORAGE_KEY = 'mc-onboarding-done'

export function QuickStart() {
  const [done, setDone] = useState<Record<number, boolean>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) setDone(JSON.parse(raw))
      } catch {
        // ignore corrupt storage
      }
      setHydrated(true)
    }
    load()
  }, [])

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = { ...prev, [i]: !prev[i] }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage full/blocked — state still works in-session
      }
      return next
    })
  }

  const doneCount = STEPS.filter((_, i) => done[i]).length
  const pct = (doneCount / STEPS.length) * 100
  const RING_LEN = 213.6 // 2πr, r=34
  const ringOff = RING_LEN * (1 - doneCount / STEPS.length)
  const allDone = doneCount === STEPS.length

  return (
    <div className="relative flex-1 min-w-[280px] max-w-sm bg-card text-card-foreground rounded-3xl border border-border p-5 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <svg width="84" height="84" viewBox="0 0 84 84" role="img" aria-label={`Progres ${Math.round(pct)} persen`}>
          <circle cx="42" cy="42" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <circle
            cx="42"
            cy="42"
            r="34"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={RING_LEN}
            strokeDashoffset={hydrated ? ringOff : RING_LEN}
            transform="rotate(-90 42 42)"
            style={{ transition: 'stroke-dashoffset .7s cubic-bezier(.2,.8,.2,1)' }}
          />
          <text x="42" y="49" textAnchor="middle" fontSize="19" fontWeight="800" fill="currentColor">
            {doneCount}/4
          </text>
        </svg>
        <div>
          <p className="font-display font-extrabold text-lg leading-tight">Mulai Cepat</p>
          <p className="text-sm text-muted-foreground">
            {allDone ? 'Semua langkah selesai. Kerja bagus!' : `${doneCount} dari 4 langkah selesai`}
          </p>
        </div>
      </div>

      {STEPS.map((step, i) => (
        <button
          key={step.title}
          type="button"
          onClick={() => toggle(i)}
          aria-pressed={Boolean(done[i])}
          className="flex items-center gap-3 w-full min-h-13 px-3 py-2 rounded-2xl border border-border bg-card text-left transition-all hover:translate-x-1 hover:border-primary"
        >
          <span
            className={`flex-none w-6 h-6 rounded-full border-2 grid place-items-center transition-all ${
              done[i] ? 'bg-primary border-primary' : 'border-muted-foreground'
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={done[i] ? 'opacity-100' : 'opacity-0'}
            >
              <path d="M5 12l5 5 9-10" stroke="hsl(var(--primary-foreground))" />
            </svg>
          </span>
          <span className="min-w-0">
            <span
              className={`block text-sm font-bold leading-tight ${
                done[i] ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {step.title}
            </span>
            <span className="block text-xs text-muted-foreground leading-tight mt-0.5">{step.desc}</span>
          </span>
        </button>
      ))}

      {allDone && (
        <Link
          href="/dashboard/portofolio/baru"
          className="inline-flex items-center gap-1.5 justify-center min-h-11 rounded-full bg-zinc-950 text-white text-sm font-bold hover:bg-zinc-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Lanjut tambah konten
        </Link>
      )}
    </div>
  )
}
