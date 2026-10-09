'use client'

import React, { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { renderMarkdown } from '@/lib/content/markdown'
import { saveArticleAction, type ArticleFormState } from './actions'

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
      {pending ? 'Menyimpan...' : 'Simpan Artikel'}
    </button>
  )
}

export function ArticleForm({
  initial,
  categories,
}: {
  initial?: {
    id: string
    title: string
    slug: string
    status: string
    publishedAt: string
    categoryId: string
    excerpt: string
    content: string
    tags: string
    authorName: string
    authorRole: string
    metaTitle: string
    metaDescription: string
  }
  categories: { id: string; name: string }[]
}) {
  const [state, formAction] = useActionState<ArticleFormState | undefined, FormData>(
    saveArticleAction,
    undefined,
  )
  const [content, setContent] = useState(initial?.content || '')
  const [preview, setPreview] = useState(false)

  return (
    <form action={formAction} className="space-y-6 max-w-4xl">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {state?.error && (
        <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <Section title="Informasi Artikel">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul Artikel *">
            <input name="title" required defaultValue={initial?.title} className={inputClass} />
          </Field>
          <Field label="Slug URL" hint="Kosongkan untuk dibuat otomatis dari judul">
            <input name="slug" defaultValue={initial?.slug} className={inputClass} />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={initial?.status || 'draft'} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Tanggal Terbit" hint="Kosongkan saat publish untuk memakai hari ini">
            <input type="datetime-local" name="publishedAt" defaultValue={initial?.publishedAt} className={inputClass} />
          </Field>
          <Field label="Kategori">
            <select name="categoryId" defaultValue={initial?.categoryId || ''} className={inputClass}>
              <option value="">— Tanpa Kategori —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tag" hint="Pisahkan dengan koma">
            <input name="tags" defaultValue={initial?.tags} className={inputClass} placeholder="SEO, Website, UMKM" />
          </Field>
        </div>
        <Field label="Ringkasan / Excerpt" hint="Tampil di kartu blog dan meta description fallback">
          <textarea name="excerpt" rows={2} defaultValue={initial?.excerpt} className={inputClass} />
        </Field>
      </Section>

      <Section title="Konten (Markdown)">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-zinc-400">
            Dukungan: <code className="font-mono">## Judul</code>, <code className="font-mono">**tebal**</code>,{' '}
            <code className="font-mono">*miring*</code>, list, quote, link, dan gambar.
          </p>
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-colors"
          >
            {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>
        {preview ? (
          <div
            className="prose-article min-h-[320px] rounded-xl border border-zinc-200 bg-zinc-50/50 p-5"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        ) : (
          <textarea
            name="content"
            required
            rows={18}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${inputClass} font-mono leading-relaxed`}
            placeholder={'## Pendahuluan\n\nTulis konten artikel di sini...'}
          />
        )}
      </Section>

      <Section title="Penulis & SEO">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nama Penulis">
            <input name="authorName" defaultValue={initial?.authorName || 'Tim MarketingCode.ID'} className={inputClass} />
          </Field>
          <Field label="Peran Penulis">
            <input name="authorRole" defaultValue={initial?.authorRole} className={inputClass} placeholder="mis. Web Development" />
          </Field>
          <Field label="Meta Title" hint="Kosongkan untuk memakai judul artikel">
            <input name="metaTitle" defaultValue={initial?.metaTitle} className={inputClass} />
          </Field>
          <Field label="Meta Description">
            <textarea name="metaDescription" rows={2} defaultValue={initial?.metaDescription} className={inputClass} />
          </Field>
        </div>
      </Section>

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link href="/dashboard/artikel" className="text-xs font-semibold text-zinc-500 hover:text-zinc-900">
          Batal
        </Link>
      </div>
    </form>
  )
}
