import React from 'react'
import Image from 'next/image'
import { desc } from 'drizzle-orm'
import { db } from '@/db'
import { media } from '@/db/schema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DeleteDialog } from '@/components/dashboard/DeleteDialog'
import { deleteMediaAction } from './actions'
import { MediaUploadForm } from './MediaUploadForm'
import { ImageIcon, Trash2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default async function MediaPage() {
  let rows: (typeof media.$inferSelect)[] = []
  try {
    rows = await db.select().from(media).orderBy(desc(media.createdAt)).limit(200)
  } catch (error) {
    console.error('[dashboard] list media failed', error)
  }

  return (
    <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Unggah Media</CardTitle>
          <CardDescription>
            Aset tersimpan di Neon Storage, siap dipakai artikel &amp; portofolio. Maksimal 10MB (JPEG, PNG, WebP, GIF).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MediaUploadForm />
        </CardContent>
      </Card>

      {rows.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {rows.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative aspect-[4/3] bg-secondary">
                <Image
                  src={item.publicUrl}
                  alt={item.altText || item.filename}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-3 space-y-1.5">
                <p className="text-sm font-semibold truncate" title={item.filename}>
                  {item.filename}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.mimeType} · {formatSize(item.filesize)}
                </p>
                <DeleteDialog
                  action={deleteMediaAction}
                  id={item.id}
                  label={item.filename}
                  description="File dihapus dari storage dan database. Artikel/portofolio yang memakai gambar ini akan kehilangan gambar."
                >
                  <Button variant="ghost" size="sm" className="text-destructive px-2 h-7">
                    <Trash2 className="h-3.5 w-3.5" />
                    Hapus
                  </Button>
                </DeleteDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <ImageIcon className="h-10 w-10 text-muted-foreground/40 mx-auto" />
          <p className="text-sm text-muted-foreground">Belum ada media. Unggah gambar pertama lewat form di atas.</p>
        </div>
      )}
    </main>
  )
}
