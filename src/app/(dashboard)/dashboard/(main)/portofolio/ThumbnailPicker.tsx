'use client'

import React, { useState, useTransition } from 'react'
import Image from 'next/image'
import { Loader2, UploadCloud, ImageIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadMediaAction } from '@/app/(dashboard)/dashboard/(main)/media/actions'

export function ThumbnailPicker({
  items,
  initialId,
  initialUrl,
  name = 'thumbnailId',
  label = 'Pilih Thumbnail dari Media Library',
  helperText = 'Thumbnail tampil di kartu di halaman depan & listing. Rasio disarankan 16:9.',
}: {
  items: { id: string; filename: string; publicUrl: string; altText: string | null }[]
  initialId?: string
  initialUrl?: string
  name?: string
  label?: string
  helperText?: string
}) {
  const [selectedId, setSelectedId] = useState(initialId || '')
  const [selectedUrl, setSelectedUrl] = useState(initialUrl || '')
  const [open, setOpen] = useState(false)
  const [uploadedItems, setUploadedItems] = useState<
    { id: string; filename: string; publicUrl: string; altText: string | null }[]
  >([])
  const [uploadState, setUploadState] = useState<{ file?: File; error?: string; busy?: boolean }>({})
  const [, startTransition] = useTransition()

  const allItems = [
    ...uploadedItems,
    ...items.filter((item) => !uploadedItems.some((u) => u.id === item.id)),
  ]

  async function handleUpload() {
    if (!uploadState.file) return
    setUploadState((s) => ({ ...s, busy: true, error: undefined }))
    const formData = new FormData()
    formData.set('file', uploadState.file)
    formData.set('altText', uploadState.file.name.replace(/\.[^.]+$/, ''))
    const result = await uploadMediaAction(undefined, formData)
    if (result.error || !result.success) {
      setUploadState((s) => ({ ...s, busy: false, error: result.error || 'Upload gagal.' }))
      return
    }
    if (result.item) {
      setUploadedItems((prev) => [result.item!, ...prev.filter((i) => i.id !== result.item!.id)])
      setSelectedId(result.item.id)
      setSelectedUrl(result.item.publicUrl)
    }
    setUploadState({})
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={selectedId} />

      <Dialog open={open} onOpenChange={setOpen}>
        {selectedUrl ? (
          <div className="flex items-center gap-3">
            <div className="relative w-40 aspect-video rounded-xl overflow-hidden border border-border bg-muted">
              <Image
                src={selectedUrl}
                alt="Thumbnail terpilih"
                fill
                unoptimized
                className="object-cover"
                sizes="160px"
              />
            </div>
            <div className="flex items-center gap-2">
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm" className="gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Ganti Thumbnail
                </Button>
              </DialogTrigger>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedId('')
                  setSelectedUrl('')
                }}
              >
                Hapus Thumbnail
              </Button>
            </div>
          </div>
        ) : (
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              {label}
            </Button>
          </DialogTrigger>
        )}

        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pilih Thumbnail</DialogTitle>
            <DialogDescription>
              Pilih gambar yang sudah diunggah, atau unggah gambar baru di bawah.
            </DialogDescription>
          </DialogHeader>

          {allItems.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              Media library masih kosong. Unggah gambar terlebih dahulu.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id)
                    setSelectedUrl(item.publicUrl)
                    setOpen(false)
                  }}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                    selectedId === item.id
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={item.publicUrl}
                    alt={item.altText || item.filename}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-border pt-4 space-y-2">
            <Label htmlFor="thumbnail-upload">Unggah Gambar Baru</Label>
            <Input
              id="thumbnail-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => setUploadState((s) => ({ ...s, file: e.target.files?.[0] }))}
            />
            {uploadState.error && <p className="text-xs text-destructive">{uploadState.error}</p>}
            <Button
              type="button"
              size="sm"
              disabled={!uploadState.file || uploadState.busy}
              onClick={() => startTransition(() => void handleUpload())}
              className="gap-2"
            >
              {uploadState.busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
              {uploadState.busy ? 'Mengunggah...' : 'Unggah & Gunakan'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <p className="text-xs text-muted-foreground">
        {helperText}
      </p>
    </div>
  )
}
