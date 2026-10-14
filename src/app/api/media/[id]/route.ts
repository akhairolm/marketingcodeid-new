import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { db } from '@/db'
import { media } from '@/db/schema'
import { getS3 } from '@/app/(dashboard)/dashboard/(main)/media/upload'

/**
 * Serves media objects from the private Neon S3 bucket via signed GET.
 * Public URL stored in the media table points here; the image URL becomes
 * /api/media/<media-row-id> so access control stays server-side.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return new NextResponse('Invalid media id', { status: 400 })
  }

  const rows = await db.select().from(media).where(eq(media.id, id)).limit(1)
  const row = rows[0]
  if (!row) return new NextResponse('Not found', { status: 404 })

  const { client, bucket } = getS3()
  try {
    const obj = await client.send(new GetObjectCommand({ Bucket: bucket, Key: row.storagePath }))
    if (!obj.Body) return new NextResponse('Empty object', { status: 404 })

    const bytes = await obj.Body.transformToByteArray()
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': row.mimeType,
        'Content-Length': String(bytes.byteLength),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('[media] serve object failed', error)
    return new NextResponse('Failed to load object', { status: 500 })
  }
}
