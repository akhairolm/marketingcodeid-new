'use client'

import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { savePortfolioAction, type PortfolioFormState } from './actions'

const CATEGORIES = [
  { value: 'web', label: 'Web Development' },
  { value: 'app', label: 'Mobile Application' },
  { value: 'marketing', label: 'Digital Marketing' },
  { value: 'video', label: 'Video Editing' },
]

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C28]/30 focus:border-[#FF5C28]'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-zinc-200/80 shadow-sm p-6 space-y-4">
      <h2 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3">{title}</h2>
      {children}
    </div>
  )
}

function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-zinc-700">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-zinc-400">{hint}</span>}
    </label>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#FF5C28] hover:bg-[#ea4510] text-white shadow-sm shadow-[#FF5C28]/25 transition-colors disabled:opacity-60"
    >
      {pending ? 'Menyimpan...' : 'Simpan Portofolio'}
    </button>
  )
}

export function PortfolioForm({
  initial,
}: {
  initial?: {
    id: string
    title: string
    slug: string
    status: string
    isFeatured: boolean
    completedDate: string
    clientName: string
    category: string
    summary: string
    duration: string
    role: string
    liveUrl: string
    challenge: string
    solution: string
    resultsText: string
    techStack: string
    content: string
    testimonialQuote: string
    testimonialName: string
    testimonialRole: string
    metaTitle: string
    metaDescription: string
  }
}) {
  const [state, formAction] = useActionState<PortfolioFormState | undefined, FormData>(
    savePortfolioAction,
    undefined,
  )

  return (
    <form action={formAction} className="space-y-6 max-w-4xl">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {state?.error && (
        <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <Section title="Informasi Utama">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul Proyek *">
            <input name="title" required defaultValue={initial?.title} className={inputClass} placeholder="mis. Website Company Profile Manufaktur" />
          </Field>
          <Field label="Slug URL" hint="Kosongkan untuk dibuat otomatis dari judul">
            <input name="slug" defaultValue={initial?.slug} className={inputClass} placeholder="website-company-profile" />
          </Field>
          <Field label="Nama / Sektor Klien *">
            <input name="clientName" required defaultValue={initial?.clientName} className={inputClass} placeholder="mis. Manufaktur B2B" />
          </Field>
          <Field label="Kategori Layanan">
            <select name="category" defaultValue={initial?.category || 'web'} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={initial?.status || 'draft'} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Tanggal Selesai">
            <input type="date" name="completedDate" defaultValue={initial?.completedDate} className={inputClass} />
          </Field>
        </div>
        <Field label="Ringkasan Singkat *" hint="Tampil di kartu portofolio dan hero studi kasus">
          <textarea name="summary" required rows={3} defaultValue={initial?.summary} className={inputClass} />
        </Field>
        <label className="inline-flex items-center gap-2 text-xs font-medium text-zinc-700">
          <input type="checkbox" name="isFeatured" defaultChecked={initial?.isFeatured} className="rounded border-zinc-300" />
          Tampilkan sebagai unggulan di beranda
        </label>
      </Section>

      <Section title="Detail Pengerjaan">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Durasi Pengerjaan">
            <input name="duration" defaultValue={initial?.duration} className={inputClass} placeholder="mis. 6 minggu" />
          </Field>
          <Field label="URL Live Demo">
            <input type="url" name="liveUrl" defaultValue={initial?.liveUrl} className={inputClass} placeholder="https://" />
          </Field>
        </div>
        <Field label="Lingkup Peran Kami">
          <input name="role" defaultValue={initial?.role} className={inputClass} placeholder="mis. Desain UI, Frontend, Backend" />
        </Field>
      </Section>

      <Section title="Cerita Studi Kasus">
        <Field label="Tantangan Klien">
          <textarea name="challenge" rows={3} defaultValue={initial?.challenge} className={inputClass} />
        </Field>
        <Field label="Solusi yang Dibangun">
          <textarea name="solution" rows={3} defaultValue={initial?.solution} className={inputClass} />
        </Field>
        <Field label="Hasil / KPI" hint="Satu baris per hasil. Format: Nilai | Keterangan — contoh: 3.4x | Kenaikan konversi">
          <textarea
            name="results"
            rows={3}
            defaultValue={initial?.resultsText}
            className={`${inputClass} font-mono`}
            placeholder={'3.4x | Kenaikan konversi\n-42% | Biaya akuisisi'}
          />
        </Field>
        <Field label="Tech Stack" hint="Pisahkan dengan koma">
          <input name="techStack" defaultValue={initial?.techStack} className={inputClass} placeholder="Next.js, PostgreSQL, Tailwind CSS" />
        </Field>
        <Field label="Konten Tambahan (Markdown)" hint="Rendered di halaman studi kasus, opsional">
          <textarea name="content" rows={6} defaultValue={initial?.content} className={`${inputClass} font-mono`} />
        </Field>
      </Section>

      <Section title="Testimoni Klien (Opsional)">
        <Field label="Kutipan">
          <textarea name="testimonialQuote" rows={2} defaultValue={initial?.testimonialQuote} className={inputClass} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nama Klien">
            <input name="testimonialName" defaultValue={initial?.testimonialName} className={inputClass} />
          </Field>
          <Field label="Jabatan">
            <input name="testimonialRole" defaultValue={initial?.testimonialRole} className={inputClass} />
          </Field>
        </div>
      </Section>

      <Section title="SEO Metadata">
        <Field label="Meta Title" hint="Kosongkan untuk memakai judul proyek">
          <input name="metaTitle" defaultValue={initial?.metaTitle} className={inputClass} />
        </Field>
        <Field label="Meta Description">
          <textarea name="metaDescription" rows={2} defaultValue={initial?.metaDescription} className={inputClass} />
        </Field>
      </Section>

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link href="/dashboard/portofolio" className="text-xs font-semibold text-zinc-500 hover:text-zinc-900">
          Batal
        </Link>
      </div>
    </form>
  )
}
