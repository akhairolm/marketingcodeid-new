import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
const s3 = new S3Client({ region: process.env.AWS_REGION!, endpoint: process.env.AWS_ENDPOINT_URL_S3, forcePathStyle: true })
// coba dengan ACL public-read
try {
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64')
  await s3.send(new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: 'acl-test.png', Body: new Uint8Array(png), ContentType: 'image/png', ACL: 'public-read' }))
  console.log('upload with ACL OK')
} catch (e: unknown) {
  const err = e as { name?: string; message?: string }
  console.error('ACL ERR:', err.name, String(err.message).slice(0, 200))
}
process.exit(0)
