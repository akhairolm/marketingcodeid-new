'use client'

import React, { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { renderMarkdown, isHtmlContent } from '@/lib/content/markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormSection, FormError } from '@/components/dashboard/FormSection'
import { TiptapEditor } from '@/components/dashboard/TiptapEditor'
import { ThumbnailPicker } from '../portofolio/ThumbnailPicker'
import { uploadEditorImageAction } from '../media/actions'
import { saveArticleAction, type ArticleFormState } from './actions'

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? 'Menyimpan...' : isEdit ? 'Update Artikel' : 'Simpan Artikel'}
    </Button>
  )
}

export function ArticleForm({
  initial,
  categories,
  mediaItems = [],
}: {
  initial?: {
    id: string
    title: string
    slug: string
    status: string
    publishedAt: string
    categoryId: string
    coverImageId?: string
    coverImageUrl?: string
    excerpt: string
    content: string
    tags: string
    authorName: string
    authorRole: string
    metaTitle: string
    metaDescription: string
  }
  categories: { id: string; name: string }[]
  mediaItems?: { id: string; filename: string; publicUrl: string; altText: string | null }[]
}) {
  const isEdit = Boolean(initial?.id)
  const [state, formAction] = useActionState<ArticleFormState | undefined, FormData>(
    async (prev, formData) => {
      const result = await saveArticleAction(prev, formData)
      if (!result || !result.error) {
        toast.success(isEdit ? 'Artikel berhasil diupdate.' : 'Artikel berhasil disimpan.')
      } else {
        toast.error(result.error)
      }
      return result
    },
    undefined,
  )
  const [content, setContent] = useState(initial?.content || '')
  const [status, setStatus] = useState(initial?.status || 'draft')
  const [categoryId, setCategoryId] = useState(initial?.categoryId || 'none')
  const [publishedAt, setPublishedAt] = useState<Date | undefined>(
    initial?.publishedAt ? new Date(initial.publishedAt) : undefined,
  )

  // Legacy markdown content must be converted to HTML for the editor;
  // Tiptap content is already HTML and passes through untouched.
  const initialContent = initial ? (isHtmlContent(initial.content) ? initial.content : renderMarkdown(initial.content)) : ''

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget)
        const cover = formData.get('coverImageId')
        if (!cover || String(cover).trim() === '') {
          e.preventDefault()
          toast.error('Thumbnail / cover artikel wajib dipilih atau diunggah.')
          return
        }
      }}
      className="space-y-6 max-w-4xl"
    >
      {isEdit && <input type="hidden" name="id" value={initial!.id} />}
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="categoryId" value={categoryId === 'none' ? '' : categoryId} />

      <FormError error={state?.error} />

      <FormSection title="Informasi Artikel">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Artikel *</Label>
            <Input id="title" name="title" required defaultValue={initial?.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug URL</Label>
            <Input id="slug" name="slug" defaultValue={initial?.slug} placeholder="otomatis dari judul" />
            <p className="text-xs text-muted-foreground">Kosongkan untuk dibuat otomatis dari judul</p>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
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
            <Label htmlFor="publishedAt">Tanggal Terbit</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  id="publishedAt"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  {publishedAt ? format(publishedAt, "d MMM yyyy, HH.mm", { locale: idLocale }) : <span>Pilih tanggal &amp; jam terbit</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={publishedAt}
                  defaultMonth={publishedAt}
                  onSelect={(date) => setPublishedAt(date ?? undefined)}
                />
                <div className="border-t border-border p-3">
                  <Label htmlFor="publishedTime" className="text-xs">Jam terbit</Label>
                  <Input
                    id="publishedTime"
                    type="time"
                    className="mt-1.5"
                    value={publishedAt ? format(publishedAt, 'HH:mm') : ''}
                    onChange={(e) => {
                      const [h, m] = e.target.value.split(':').map(Number)
                      const base = publishedAt ?? new Date()
                      const next = new Date(base)
                      next.setHours(h || 0, m || 0, 0, 0)
                      setPublishedAt(next)
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <input type="hidden" name="publishedAt" value={publishedAt ? publishedAt.toISOString() : ''} />
            <p className="text-xs text-muted-foreground">Kosongkan saat publish untuk memakai hari ini</p>
          </div>
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— Tanpa Kategori —</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tag</Label>
            <Input id="tags" name="tags" defaultValue={initial?.tags} placeholder="SEO, Website, UMKM" />
            <p className="text-xs text-muted-foreground">Pisahkan dengan koma</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt">Ringkasan / Excerpt</Label>
          <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={initial?.excerpt} />
          <p className="text-xs text-muted-foreground">Tampil di kartu blog dan meta description fallback</p>
        </div>
        <ThumbnailPicker
          name="coverImageId"
          items={mediaItems}
          initialId={initial?.coverImageId}
          initialUrl={initial?.coverImageUrl}
          label="Pilih Thumbnail Artikel"
          helperText="Thumbnail tampil di kartu artikel di halaman depan & halaman /blog. Rasio disarankan 16:9."
        />
      </FormSection>

      <FormSection title="Konten Artikel" description="WYSIWYG editor — tampilan saat menulis sama dengan hasil di website">
        <input type="hidden" name="content" value={content} />
        <TiptapEditor
          content={initialContent}
          onChange={setContent}
          placeholder="Tulis konten artikel di sini..."
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
      </FormSection>

      <FormSection title="Penulis & SEO">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="authorName">Nama Penulis</Label>
            <Input id="authorName" name="authorName" defaultValue={initial?.authorName || 'Tim MarketingCode.ID'} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authorRole">Peran Penulis</Label>
            <Input id="authorRole" name="authorRole" defaultValue={initial?.authorRole} placeholder="mis. Web Development" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input id="metaTitle" name="metaTitle" defaultValue={initial?.metaTitle} />
            <p className="text-xs text-muted-foreground">Kosongkan untuk memakai judul artikel</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea id="metaDescription" name="metaDescription" rows={2} defaultValue={initial?.metaDescription} />
          </div>
        </div>
      </FormSection>

      <div className="flex items-center gap-3">
        <SubmitButton isEdit={isEdit} />
        <Button asChild variant="ghost">
          <Link href="/dashboard/artikel">Batal</Link>
        </Button>
      </div>
    </form>
  )
}
