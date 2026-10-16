import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { GetObjectCommand, type GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { db } from '@/db'
import { media } from '@/db/schema'
import { getS3 } from '@/app/(dashboard)/dashboard/(main)/media/upload'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Serves media objects from the private Neon S3 bucket via signed GET.
 * Public URL stored in the media table points here; the image URL becomes
 * /api/media/<media-row-id> so access control stays server-side.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!UUID_RE.test(id)) {
    return new NextResponse('Invalid media id', { status: 400 })
  }

  let row
  try {
    const rows = await db.select().from(media).where(eq(media.id, id)).limit(1)
    row = rows[0]
    if (!row) return new NextResponse('Not found', { status: 404 })
  } catch (error) {
    console.error('[media] lookup failed', error)
    return new NextResponse('Failed to load media record', { status: 500 })
  }

  let obj: GetObjectCommandOutput
  try {
    const { client, bucket } = getS3()
    obj = await client.send(new GetObjectCommand({ Bucket: bucket, Key: row.storagePath }))
  } catch (error) {
    console.error('[media] serve object failed', error)
    return new NextResponse('Failed to load object', { status: 500 })
  }
  if (!obj.Body) return new NextResponse('Empty object', { status: 404 })

  // Stream the S3 body straight to the client — no full-buffer in RAM.
  // Body here is a Node Readable (SDK v3 default on Node runtime); converting
  // via Web Streams keeps `new Response(ReadableStream)` happy.
  const body = obj.Body.transformToWebStream()
  const headers: Record<string, string> = {
    'Content-Type': row.mimeType,
    'Cache-Control': 'public, max-age=31536000, immutable',
  }
  if (typeof obj.ContentLength === 'number') {
    headers['Content-Length'] = String(obj.ContentLength)
  }
  return new NextResponse(body, { headers })
}
