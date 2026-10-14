import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { createClient } from '@supabase/supabase-js'
import { db } from '@/db'
import { media } from '@/db/schema'
import { slugify } from '@/lib/slugify'

export type UploadState = { error: string | null; success: string | null }

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

/** Magic-byte signatures for allowed raster image types (SVG intentionally excluded — XSS vector). */
const MIME_SIGNATURES: { mime: string; bytes: number[]; offsets?: number[] }[] = [
  { mime: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/png', bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: 'image/gif', bytes: [0x47, 0x49, 0x46, 0x38] },
  // WebP: "RIFF"...."WEBP"
  { mime: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46] },
]

async function detectMime(file: File): Promise<string | null> {
  const header = new Uint8Array(await file.slice(0, 16).arrayBuffer())
  for (const sig of MIME_SIGNATURES) {
    if (sig.bytes.every((b, i) => header[i] === b)) {
      if (sig.mime === 'image/webp') {
        const webp = [0x57, 0x45, 0x42, 0x50] // "WEBP" at offset 8
        if (!webp.every((b, i) => header[8 + i] === b)) continue
      }
      return sig.mime
    }
  }
  return null
}

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  }
  return map[mime] ?? 'bin'
}

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

  // Server-side content sniffing — client-supplied file.type is untrusted.
  const detectedMime = await detectMime(file)
  if (!detectedMime || !ALLOWED_MIME.includes(detectedMime)) {
    throw new Error('Tipe file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.')
  }

  const supabase = getSupabase()

  const ext = extFromMime(detectedMime)
  const baseName = slugify(file.name.replace(/\.[^.]+$/, '')) || 'media'
  const storagePath = `${Date.now()}-${baseName}.${ext}`

  const { error: uploadError } = await supabase.client.storage
    .from(supabase.bucket)
    .upload(storagePath, file, { contentType: detectedMime, upsert: false })
  if (uploadError) throw uploadError

  const { data } = supabase.client.storage.from(supabase.bucket).getPublicUrl(storagePath)

  await db.insert(media).values({
    filename: file.name,
    mimeType: detectedMime,
    filesize: file.size,
    storagePath,
    publicUrl: data.publicUrl,
    altText: altText || null,
  })

  revalidatePath('/dashboard/media')
  revalidatePath('/')
  return data.publicUrl
}
