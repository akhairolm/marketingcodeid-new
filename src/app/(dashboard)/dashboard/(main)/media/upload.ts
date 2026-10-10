import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { createClient } from '@supabase/supabase-js'
import { db } from '@/db'
import { media } from '@/db/schema'
import { slugify } from '@/lib/slugify'

export type UploadState = { error: string | null; success: string | null }

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'media'
  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi di .env')
  }
  return { client: createClient(url, key, { auth: { persistSession: false } }), bucket }
}

export { getSupabase }

/**
 * Validates + uploads an image to Supabase Storage, records it in the media
 * table, returns the public URL. Shared by the media page and Tiptap editor
 * image insertion. Throws on failure with a user-readable message.
 */
export async function uploadMediaFile(file: File, altText = ''): Promise<string> {
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('File gambar tidak valid.')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Ukuran file maksimal 10MB.')
  }
  if (!ALLOWED_MIME.includes(file.type)) {
    throw new Error(`Tipe file ${file.type} tidak didukung. Gunakan JPEG, PNG, WebP, GIF, atau SVG.`)
  }

  const supabase = getSupabase()

  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
  const baseName = slugify(file.name.replace(/\.[^.]+$/, '')) || 'media'
  const storagePath = `${Date.now()}-${baseName}.${ext}`

  const { error: uploadError } = await supabase.client.storage
    .from(supabase.bucket)
    .upload(storagePath, file, { contentType: file.type, upsert: false })
  if (uploadError) throw uploadError

  const { data } = supabase.client.storage.from(supabase.bucket).getPublicUrl(storagePath)

  await db.insert(media).values({
    filename: file.name,
    mimeType: file.type,
    filesize: file.size,
    storagePath,
    publicUrl: data.publicUrl,
    altText: altText || null,
  })

  revalidatePath('/dashboard/media')
  revalidatePath('/')
  return data.publicUrl
}
