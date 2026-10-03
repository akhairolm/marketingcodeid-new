import type { Access, CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/** Publik hanya bisa membaca dokumen berstatus "published"; admin login bisa membaca semua. */
const readPublishedOrAdmin: Access = ({ req }) => {
  if (req.user) return true
  return { status: { equals: 'published' } }
}

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  labels: {
    singular: 'Portofolio',
    plural: 'Portofolio',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Konten',
    defaultColumns: ['title', 'clientName', 'category', 'status', 'completedDate'],
  },
  access: {
    read: readPublishedOrAdmin,
  },
  defaultSort: '-completedDate',
  fields: [
    {
      name: 'title',
      label: 'Judul Proyek',
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
      name: 'isFeatured',
      label: 'Tampilkan di Beranda',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'completedDate',
      label: 'Tanggal Selesai',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'monthOnly', displayFormat: 'MMMM yyyy' } },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Ringkasan',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'clientName', label: 'Nama / Sektor Klien', type: 'text', required: true },
                {
                  name: 'category',
                  label: 'Kategori Layanan',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Web Development', value: 'web' },
                    { label: 'Mobile Application', value: 'app' },
                    { label: 'Digital Marketing', value: 'marketing' },
                    { label: 'Video Editing', value: 'video' },
                  ],
                },
              ],
            },
            {
              name: 'summary',
              label: 'Ringkasan Singkat',
              type: 'textarea',
              required: true,
              admin: { description: 'Tampil di kartu portofolio dan sebagai deskripsi hero.' },
            },
            {
              name: 'thumbnail',
              label: 'Gambar Utama / Mockup',
              type: 'upload',
              relationTo: 'media',
            },
            {
              type: 'row',
              fields: [
                { name: 'duration', label: 'Durasi Pengerjaan', type: 'text', admin: { placeholder: 'mis. 6 minggu' } },
                { name: 'role', label: 'Lingkup Peran Kami', type: 'text', admin: { placeholder: 'mis. Desain UI, Frontend, Backend' } },
              ],
            },
            { name: 'liveUrl', label: 'URL Live Demo', type: 'text' },
          ],
        },
        {
          label: 'Studi Kasus',
          fields: [
            { name: 'challenge', label: 'Tantangan Klien', type: 'textarea' },
            { name: 'solution', label: 'Solusi yang Dibangun', type: 'textarea' },
            {
              name: 'results',
              label: 'Hasil / Dampak',
              type: 'array',
              labels: { singular: 'Hasil', plural: 'Hasil' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', label: 'Nilai', type: 'text', required: true, admin: { placeholder: 'mis. 3.4x' } },
                    { name: 'label', label: 'Keterangan', type: 'text', required: true, admin: { placeholder: 'mis. Rasio konversi' } },
                  ],
                },
              ],
            },
            {
              name: 'techStack',
              label: 'Tech Stack',
              type: 'array',
              labels: { singular: 'Teknologi', plural: 'Teknologi' },
              fields: [{ name: 'name', label: 'Nama', type: 'text', required: true }],
            },
            {
              name: 'content',
              label: 'Cerita Lengkap (opsional)',
              type: 'richText',
            },
            {
              name: 'testimonial',
              label: 'Testimoni Klien (opsional)',
              type: 'group',
              fields: [
                { name: 'quote', label: 'Kutipan', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'name', label: 'Nama', type: 'text' },
                    { name: 'role', label: 'Jabatan', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Galeri',
          fields: [
            {
              name: 'gallery',
              label: 'Galeri Mockup',
              type: 'array',
              labels: { singular: 'Gambar', plural: 'Gambar' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', label: 'Keterangan', type: 'text' },
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
