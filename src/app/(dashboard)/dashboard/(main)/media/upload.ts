import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { db } from '@/db'
import { media } from '@/db/schema'
import { slugify } from '@/lib/slugify'

export type UploadState = { error: string | null; success: string | null }

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

/** Magic-byte signatures for allowed raster image types (SVG intentionally excluded — XSS vector). */
const MIME_SIGNATURES: { mime: string; bytes: number[] }[] = [
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

/**
 * Neon S3-compatible storage client (credentials from .env).
 * ponytail: singleton via globalThis to survive HMR in dev.
 */
export function getS3(): { client: S3Client; bucket: string } {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3
  const bucket = process.env.S3_BUCKET
  if (!endpoint || !bucket || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error(
      'Storage belum dikonfigurasi: set AWS_ENDPOINT_URL_S3, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, dan S3_BUCKET di .env',
    )
  }
  const globalForS3 = globalThis as unknown as { __s3Client?: S3Client }
  const client =
    globalForS3.__s3Client ??
    new S3Client({
      region: process.env.AWS_REGION ?? 'auto',
      endpoint,
      forcePathStyle: true,
    })
  globalForS3.__s3Client = client
  // Bucket Neon bersifat private — objek di-serve publik lewat route /api/media/<id>
  // (signed GET server-side). publicBase tidak dipakai untuk URL langsung.
  return { client, bucket }
}

/** Delete a stored object (called when removing media rows). */
export async function deleteStorageObject(storagePath: string): Promise<void> {
  const { client, bucket } = getS3()
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: storagePath }))
}

/**
 * Validates + uploads an image to Neon S3-compatible storage, records it in
 * the media table, returns the public URL. Shared by the media page,
 * thumbnail picker, and Tiptap editor image insertion. Throws with a
 * user-readable message on failure.
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

  const { client, bucket } = getS3()

  const ext = extFromMime(detectedMime)
  const baseName = slugify(file.name.replace(/\.[^.]+$/, '')) || 'media'
  const storagePath = `${Date.now()}-${baseName}.${ext}`

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: storagePath,
      Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: detectedMime,
    }),
  )

  // Simpan row dulu agar punya id, lalu URL publik = route proxy /api/media/<id>
  const inserted = await db
    .insert(media)
    .values({
      filename: file.name,
      mimeType: detectedMime,
      filesize: file.size,
      storagePath,
      publicUrl: '', // diisi setelah row dibuat
      altText: altText || null,
    })
    .returning({ id: media.id })
  const rowId = inserted[0].id

  const publicUrl = `/api/media/${rowId}`
  await db.update(media).set({ publicUrl }).where(eq(media.id, rowId))

  revalidatePath('/dashboard/media')
  revalidatePath('/')
  return publicUrl
}

// Keep eq import used if future queries need it; avoid unused-import lint
