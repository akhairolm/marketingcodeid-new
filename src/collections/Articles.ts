import type { Access, CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/** Publik hanya bisa membaca artikel berstatus "published"; admin login bisa membaca semua. */
const readPublishedOrAdmin: Access = ({ req }) => {
  if (req.user) return true
  return { status: { equals: 'published' } }
}

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Artikel',
    plural: 'Artikel',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Konten',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: readPublishedOrAdmin,
  },
  defaultSort: '-publishedAt',
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Isi tanggal terbit otomatis saat artikel pertama kali dipublikasikan.
        if (data?.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Judul Artikel',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      label: 'Tanggal Terbit',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'relationship',
      relationTo: 'categories',
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Konten',
          fields: [
            {
              name: 'excerpt',
              label: 'Ringkasan',
              type: 'textarea',
              required: true,
              admin: { description: 'Satu-dua kalimat yang tampil di bawah judul dan di kartu artikel.' },
            },
            {
              name: 'coverImage',
              label: 'Cover Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              label: 'Isi Artikel',
              type: 'richText',
              required: true,
            },
            {
              name: 'tags',
              label: 'Tag',
              type: 'array',
              fields: [{ name: 'tag', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Penulis',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'authorName', label: 'Nama Penulis', type: 'text', defaultValue: 'Tim MarketingCode.ID' },
                { name: 'authorRole', label: 'Peran Penulis', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', label: 'Meta Title', type: 'text' },
            { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
