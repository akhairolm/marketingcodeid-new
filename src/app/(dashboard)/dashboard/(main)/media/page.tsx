import React from 'react'
import Image from 'next/image'
import { desc } from 'drizzle-orm'
import { db } from '@/db'
import { media } from '@/db/schema'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Card, CardContent } from '@/components/ui/card'
import { DeleteButton } from '@/components/dashboard/DeleteButton'
import { deleteMediaAction } from './actions'
import { MediaUploadForm } from './MediaUploadForm'
import { ImageIcon } from 'lucide-react'

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
    <>
      <DashboardHeader
        title="Media Library"
        subtitle="Aset gambar tersimpan di Supabase Storage dan siap dipakai artikel & portofolio"
      />

      <main className="p-8 space-y-6 max-w-7xl w-full mx-auto">
        <Card className="bg-white border-zinc-200/80 shadow-sm p-5">
          <MediaUploadForm />
        </Card>

        {rows.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {rows.map((item) => (
              <Card key={item.id} className="bg-white border-zinc-200/80 shadow-sm overflow-hidden group">
                <div className="relative aspect-[4/3] bg-zinc-100">
                  <Image
                    src={item.publicUrl}
                    alt={item.altText || item.filename}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-zinc-800 truncate" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    {item.mimeType} · {formatSize(item.filesize)}
                  </p>
                  <div className="pt-1">
                    <DeleteButton
                      action={deleteMediaAction}
                      id={item.id}
                      label={item.filename}
                      confirmMessage={`Hapus "${item.filename}" dari storage dan database? Artikel/portofolio yang memakai gambar ini akan kehilangan gambar.`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-3">
            <ImageIcon className="w-10 h-10 text-zinc-300 mx-auto" />
            <p className="text-xs text-zinc-500">Belum ada media. Unggah gambar pertama lewat form di atas.</p>
          </div>
        )}
      </main>
    </>
  )
}
