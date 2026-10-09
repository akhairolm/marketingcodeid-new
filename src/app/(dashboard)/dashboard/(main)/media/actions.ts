'use server'

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

export async function uploadMediaAction(
  _prev: UploadState | undefined,
  formData: FormData,
): Promise<UploadState> {
  const file = formData.get('file')
  const altText = String(formData.get('altText') || '').trim()

  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Pilih file gambar untuk diunggah.', success: null }
  }
  if (file.size > MAX_FILE_SIZE) {
    return { error: 'Ukuran file maksimal 10MB.', success: null }
  }
  if (!ALLOWED_MIME.includes(file.type)) {
    return { error: `Tipe file ${file.type} tidak didukung. Gunakan JPEG, PNG, WebP, GIF, atau SVG.`, success: null }
  }

  let supabase: ReturnType<typeof getSupabase>
  try {
    supabase = getSupabase()
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Storage belum dikonfigurasi.', success: null }
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
  const baseName = slugify(file.name.replace(/\.[^.]+$/, '')) || 'media'
  const storagePath = `${Date.now()}-${baseName}.${ext}`

  try {
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
  } catch (error) {
    console.error('[dashboard] upload media failed', error)
    return {
      error: error instanceof Error ? error.message : 'Upload gagal. Periksa koneksi dan konfigurasi storage.',
      success: null,
    }
  }

  revalidatePath('/dashboard/media')
  revalidatePath('/')
  return { error: null, success: `${file.name} berhasil diunggah.` }
}

export async function deleteMediaAction(formData: FormData) {
  const id = String(formData.get('id') || '')
  if (!id) return

  const rows = await db.select().from(media).where(eq(media.id, id)).limit(1)
  const row = rows[0]
  if (!row) return

  try {
    const supabase = getSupabase()
    await supabase.client.storage.from(supabase.bucket).remove([row.storagePath])
  } catch (error) {
    console.error('[dashboard] remove storage object failed', error)
  }

  await db.delete(media).where(eq(media.id, id))
  revalidatePath('/dashboard/media')
  revalidatePath('/')
}
