'use client'

import React, { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { FormSection, FormError } from '@/components/dashboard/FormSection'
import { TiptapEditor } from '@/components/dashboard/TiptapEditor'
import { uploadEditorImageAction } from '../media/actions'
import { renderMarkdown, isHtmlContent } from '@/lib/content/markdown'
import { savePortfolioAction, type PortfolioFormState } from './actions'

const CATEGORIES = [
  { value: 'web', label: 'Web Development' },
  { value: 'app', label: 'Mobile Application' },
  { value: 'marketing', label: 'Digital Marketing' },
  { value: 'video', label: 'Video Editing' },
]

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? 'Menyimpan...' : isEdit ? 'Update Portofolio' : 'Simpan Portofolio'}
    </Button>
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
  const isEdit = Boolean(initial?.id)
  const [content, setContent] = useState(initial?.content || '')
  // Legacy markdown must be converted to HTML for the editor
  const initialContent = initial
    ? isHtmlContent(initial.content)
      ? initial.content
      : renderMarkdown(initial.content)
    : ''
  const [state, formAction] = useActionState<PortfolioFormState | undefined, FormData>(
    async (prev, formData) => {
      const result = await savePortfolioAction(prev, formData)
      if (!result || !result.error) {
        toast.success(isEdit ? 'Portofolio berhasil diupdate.' : 'Portofolio berhasil disimpan.')
      } else {
        toast.error(result.error)
      }
      return result
    },
    undefined,
  )

  return (
    <form action={formAction} className="space-y-6 max-w-4xl">
      {isEdit && <input type="hidden" name="id" value={initial!.id} />}

      <FormError error={state?.error} />

      <FormSection title="Informasi Utama">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Proyek *</Label>
            <Input id="title" name="title" required defaultValue={initial?.title} placeholder="mis. Website Company Profile Manufaktur" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug URL</Label>
            <Input id="slug" name="slug" defaultValue={initial?.slug} placeholder="otomatis dari judul" />
            <p className="text-xs text-muted-foreground">Kosongkan untuk dibuat otomatis dari judul</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientName">Nama / Sektor Klien *</Label>
            <Input id="clientName" name="clientName" required defaultValue={initial?.clientName} placeholder="mis. Manufaktur B2B" />
          </div>
          <div className="space-y-2">
            <Label>Kategori Layanan</Label>
            <Select name="category" defaultValue={initial?.category || 'web'}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select name="status" defaultValue={initial?.status || 'draft'}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="completedDate">Tanggal Selesai</Label>
            <Input id="completedDate" name="completedDate" type="date" defaultValue={initial?.completedDate} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Ringkasan Singkat *</Label>
          <Textarea id="summary" name="summary" required rows={3} defaultValue={initial?.summary} />
          <p className="text-xs text-muted-foreground">Tampil di kartu portofolio dan hero studi kasus</p>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="isFeatured" name="isFeatured" defaultChecked={initial?.isFeatured} />
          <Label htmlFor="isFeatured" className="font-normal">
            Tampilkan sebagai unggulan di beranda
          </Label>
        </div>
      </FormSection>

      <FormSection title="Detail Pengerjaan">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Durasi Pengerjaan</Label>
            <Input id="duration" name="duration" defaultValue={initial?.duration} placeholder="mis. 6 minggu" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">URL Live Demo</Label>
            <Input id="liveUrl" name="liveUrl" type="url" defaultValue={initial?.liveUrl} placeholder="https://" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Lingkup Peran Kami</Label>
          <Input id="role" name="role" defaultValue={initial?.role} placeholder="mis. Desain UI, Frontend, Backend" />
        </div>
      </FormSection>

      <FormSection title="Cerita Studi Kasus">
        <div className="space-y-2">
          <Label htmlFor="challenge">Tantangan Klien</Label>
          <Textarea id="challenge" name="challenge" rows={3} defaultValue={initial?.challenge} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="solution">Solusi yang Dibangun</Label>
          <Textarea id="solution" name="solution" rows={3} defaultValue={initial?.solution} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="results">Hasil / KPI</Label>
          <Textarea
            id="results"
            name="results"
            rows={3}
            defaultValue={initial?.resultsText}
            className="font-mono"
            placeholder={'3.4x | Kenaikan konversi\n-42% | Biaya akuisisi'}
          />
          <p className="text-xs text-muted-foreground">Satu baris per hasil. Format: Nilai | Keterangan</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input id="techStack" name="techStack" defaultValue={initial?.techStack} placeholder="Next.js, PostgreSQL, Tailwind CSS" />
          <p className="text-xs text-muted-foreground">Pisahkan dengan koma</p>
        </div>
        <div className="space-y-2">
          <Label>Konten Tambahan</Label>
          <input type="hidden" name="content" value={content} />
          <TiptapEditor
            content={initialContent}
            onChange={setContent}
            placeholder="Tulis konten tambahan studi kasus (opsional)..."
            onUploadImage={async (file) => {
              try {
                const url = await uploadEditorImageAction(file)
                toast.success('Gambar berhasil diunggah.')
                return url
              } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Upload gambar gagal.')
                throw error
              }
            }}
          />
          <p className="text-xs text-muted-foreground">Tampil di halaman studi kasus, opsional</p>
        </div>
      </FormSection>

      <FormSection title="Testimoni Klien (Opsional)">
        <div className="space-y-2">
          <Label htmlFor="testimonialQuote">Kutipan</Label>
          <Textarea id="testimonialQuote" name="testimonialQuote" rows={2} defaultValue={initial?.testimonialQuote} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="testimonialName">Nama Klien</Label>
            <Input id="testimonialName" name="testimonialName" defaultValue={initial?.testimonialName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonialRole">Jabatan</Label>
            <Input id="testimonialRole" name="testimonialRole" defaultValue={initial?.testimonialRole} />
          </div>
        </div>
      </FormSection>

      <FormSection title="SEO Metadata">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input id="metaTitle" name="metaTitle" defaultValue={initial?.metaTitle} />
          <p className="text-xs text-muted-foreground">Kosongkan untuk memakai judul proyek</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea id="metaDescription" name="metaDescription" rows={2} defaultValue={initial?.metaDescription} />
        </div>
      </FormSection>

      <div className="flex items-center gap-3">
        <SubmitButton isEdit={isEdit} />
        <Button asChild variant="ghost">
          <Link href="/dashboard/portofolio">Batal</Link>
        </Button>
      </div>
    </form>
  )
}
