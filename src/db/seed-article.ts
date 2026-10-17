import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { eq } from 'drizzle-orm'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { db } from './index'
import { articles, categories, media } from './schema'
import { articleContent, content_iklan_meta_ads_langsung_whatsapp_vs_landing_page, content_cara_membuat_katalog_produk_online_terhubung_whatsapp } from './article-content'

/**
 * Seed artikel blog ke database + upload cover image ke Neon S3-compatible
 * storage. ponytail: seed sekali-jalan — `npx tsx src/db/seed-article.ts
 * [gambar1.jpg] [gambar2.jpg] ...`. Idempotent: upsert by slug, media
 * dilewati jika filename sudah ada. Urutan gambar mengikuti urutan artikel.
 */

const IMAGE_ALT = 'Ilustrasi artikel UMKM & digital marketing MarketingCode.ID'

type ArticleSeed = {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: Date
  tags: string[]
  metaTitle: string
  metaDescription: string
  imagePath?: string
}

const seeds: ArticleSeed[] = [
  {
    slug: 'apakah-umkm-perlu-website-sendiri',
    title: 'Sudah Punya Instagram & Shopee, Apakah UMKM Masih Perlu Website Sendiri?',
    excerpt:
      'Jualan di Instagram dan Shopee makin ketat? Yuk, cari tahu kenapa bisnis UMKM tetap butuh website sendiri biar bebas potongan admin dan gampang dicari di Google.',
    content: articleContent,
    publishedAt: new Date('2026-10-15T09:00:00.000Z'),
    tags: [
      'apakah umkm perlu website',
      'manfaat website untuk umkm',
      'jualan di instagram vs website sendiri',
      'pentingnya website untuk usaha kecil',
      'website katalog umkm nyambung ke wa',
      'biaya buat website umkm',
      'jasa pembuatan website kalimantan selatan',
    ],
    metaTitle: 'Sudah Punya Instagram & Shopee, Apakah UMKM Masih Perlu Website Sendiri?',
    metaDescription:
      'Jualan di Instagram dan Shopee makin ketat? Yuk, cari tahu kenapa bisnis UMKM tetap butuh website sendiri biar bebas potongan admin dan gampang dicari di Google.',
    imagePath: process.argv[2],
  },
  {
    slug: 'iklan-meta-ads-langsung-whatsapp-vs-landing-page',
    title: 'Iklan Meta Ads Langsung ke WhatsApp vs Pakai Landing Page: Mana Lebih Menguntungkan untuk UMKM?',
    excerpt:
      'Pasang iklan FB & IG Ads langsung ke WhatsApp banyak yang chat tapi minim closing? Yuk, bandingkan untung ruginya dengan iklan pakai Landing Page!',
    content: content_iklan_meta_ads_langsung_whatsapp_vs_landing_page,
    publishedAt: new Date('2026-10-15T10:00:00.000Z'),
    tags: [
      'iklan meta ads ke wa atau landing page',
      'fungsi landing page untuk iklan fb',
      'kenapa iklan meta ads boncos',
      'cara optimasi iklan click to whatsapp',
      'jasa iklan meta ads',
      'jasa pembuatan landing page',
      'jasa digital marketing kalimantan selatan',
    ],
    metaTitle: 'Iklan Meta Ads Langsung ke WhatsApp vs Landing Page: Mana Untung? | MarketingCode.ID',
    metaDescription:
      'Pasang iklan FB & IG Ads langsung ke WhatsApp banyak yang chat tapi minim closing? Yuk, bandingkan untung ruginya dengan iklan pakai Landing Page!',
    imagePath: process.argv[3],
  },
  {
    slug: 'cara-membuat-katalog-produk-online-terhubung-whatsapp',
    title: 'Cara Membuat Katalog Produk Online yang Langsung Terhubung ke Order WhatsApp',
    excerpt:
      'Capek kirim foto produk satu-satu tiap ada yang chat? Yuk, simak cara membuat katalog produk online yang langsung nyambung ke order WhatsApp biar jualan makin laris!',
    content: content_cara_membuat_katalog_produk_online_terhubung_whatsapp,
    publishedAt: new Date('2026-10-15T11:00:00.000Z'),
    tags: [
      'cara buat katalog online nyambung ke wa',
      'cara membuat katalog produk online',
      'website katalog produk umkm',
      'katalog online order via whatsapp',
      'buat katalog produk tanpa aplikasi',
      'jasa pembuatan website kalimantan selatan',
    ],
    metaTitle: 'Cara Membuat Katalog Produk Online Terhubung Order WhatsApp | MarketingCode.ID',
    metaDescription:
      'Capek kirim foto produk satu-satu tiap ada yang chat? Yuk, simak cara membuat katalog produk online yang langsung nyambung ke order WhatsApp biar jualan makin laris!',
    imagePath: process.argv[4],
  },
]

async function ensureCoverImage(imagePath: string, filename: string): Promise<string> {
  const existing = await db.select({ id: media.id }).from(media).where(eq(media.filename, filename)).limit(1)
  if (existing[0]) return `/api/media/${existing[0].id}`

  const file = await readFile(imagePath)
  const endpoint = process.env.AWS_ENDPOINT_URL_S3
  const bucket = process.env.S3_BUCKET
  if (!endpoint || !bucket || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('Storage belum dikonfigurasi di .env (AWS_ENDPOINT_URL_S3, S3_BUCKET, kredensial AWS).')
  }
  const client = new S3Client({
    region: process.env.AWS_REGION ?? 'auto',
    endpoint,
    forcePathStyle: true,
  })
  const storagePath = `${Date.now()}-${filename.replace(/\.[^.]+$/, '')}.jpg`
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: storagePath,
      Body: new Uint8Array(file),
      ContentType: 'image/jpeg',
    }),
  )

  const inserted = await db
    .insert(media)
    .values({
      filename,
      mimeType: 'image/jpeg',
      filesize: file.byteLength,
      storagePath,
      publicUrl: '',
      altText: IMAGE_ALT,
    })
    .returning({ id: media.id })
  const id = inserted[0].id
  const publicUrl = `/api/media/${id}`
  await db.update(media).set({ publicUrl }).where(eq(media.id, id))
  return publicUrl
}

async function main() {
  const catName = 'Edukasi UMKM & Digital Marketing'
  const catSlug = 'edukasi-umkm-digital-marketing'
  const existingCat = await db.select({ id: categories.id }).from(categories).where(eq(categories.slug, catSlug)).limit(1)
  const categoryId =
    existingCat[0]?.id ??
    (await db.insert(categories).values({ name: catName, slug: catSlug }).returning({ id: categories.id }))[0].id

  for (const seed of seeds) {
    let coverImageId: string | null = null
    if (seed.imagePath) {
      const filename = seed.imagePath.split('/').pop()!
      const publicUrl = await ensureCoverImage(seed.imagePath, filename)
      const cover = await db.select({ id: media.id }).from(media).where(eq(media.publicUrl, publicUrl)).limit(1)
      coverImageId = cover[0].id
    }

    const existing = await db.select({ id: articles.id, coverImageId: articles.coverImageId }).from(articles).where(eq(articles.slug, seed.slug)).limit(1)

    const values = {
      title: seed.title,
      slug: seed.slug,
      status: 'published',
      publishedAt: seed.publishedAt,
      categoryId,
      excerpt: seed.excerpt,
      coverImageId: coverImageId ?? existing[0]?.coverImageId ?? null,
      tags: seed.tags,
      authorName: 'MarketingCode ID',
      authorRole: 'Digital Agency',
      metaTitle: seed.metaTitle,
      metaDescription: seed.metaDescription,
      content: seed.content,
      updatedAt: new Date(),
    }

    if (existing[0]) {
      await db.update(articles).set(values).where(eq(articles.id, existing[0].id))
      console.log(`Artikel "${seed.slug}" diperbarui.`)
    } else {
      await db.insert(articles).values(values)
      console.log(`Artikel "${seed.slug}" dibuat.`)
    }
  }
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
