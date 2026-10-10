'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { media } from '@/db/schema'
import { uploadMediaFile, type UploadState } from './upload'

export type { UploadState }

export async function uploadMediaAction(
  _prev: UploadState | undefined,
  formData: FormData,
): Promise<UploadState> {
  const file = formData.get('file')
  const altText = String(formData.get('altText') || '').trim()

  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Pilih file gambar untuk diunggah.', success: null }
  }

  try {
    await uploadMediaFile(file, altText)
  } catch (error) {
    console.error('[dashboard] upload media failed', error)
    return {
      error: error instanceof Error ? error.message : 'Upload gagal. Periksa koneksi dan konfigurasi storage.',
      success: null,
    }
  }

  return { error: null, success: `${file.name} berhasil diunggah.` }
}

export async function deleteMediaAction(formData: FormData) {
  const id = String(formData.get('id') || '')
  if (!id) return

  const rows = await db.select().from(media).where(eq(media.id, id)).limit(1)
  const row = rows[0]
  if (!row) return

  try {
    const { getSupabase } = await import('./upload')
    const supabase = getSupabase()
    await supabase.client.storage.from(supabase.bucket).remove([row.storagePath])
  } catch (error) {
    console.error('[dashboard] remove storage object failed', error)
  }
  await db.delete(media).where(eq(media.id, id))
  revalidatePath('/dashboard/media')
  revalidatePath('/')
}

/**
 * Server action wrapper for Tiptap editor image insertion.
 * Client components cannot import upload.ts directly (revalidatePath + 
 * service key must stay server-side).
 */
export async function uploadEditorImageAction(file: File): Promise<string> {
  return uploadMediaFile(file)
}
