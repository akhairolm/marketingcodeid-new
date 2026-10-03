import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategori',
    plural: 'Kategori Blog',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Konten',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Kategori',
      type: 'text',
      required: true,
    },
    slugField('name'),
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
    },
  ],
}
