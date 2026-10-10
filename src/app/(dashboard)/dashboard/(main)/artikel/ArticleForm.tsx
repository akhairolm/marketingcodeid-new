'use client'

import React, { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { renderMarkdown, isHtmlContent } from '@/lib/content/markdown'
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
import { FormSection, FormError } from '@/components/dashboard/FormSection'
import { TiptapEditor } from '@/components/dashboard/TiptapEditor'
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

  // Legacy markdown content must be converted to HTML for the editor;
  // Tiptap content is already HTML and passes through untouched.
  const initialContent = initial ? (isHtmlContent(initial.content) ? initial.content : renderMarkdown(initial.content)) : ''

  return (
    <form action={formAction} className="space-y-6 max-w-4xl">
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
            <Input
              id="publishedAt"
              name="publishedAt"
              type="datetime-local"
              defaultValue={initial?.publishedAt}
            />
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
