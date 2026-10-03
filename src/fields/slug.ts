import type { Field, FieldHook } from 'payload'
import { slugify } from '../lib/slugify'

/**
 * Auto-generates a slug from `sourceField` when the slug is left empty.
 * Manually typed slugs are still normalised.
 */
const formatSlug =
  (sourceField: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      return slugify(value)
    }

    const source = data?.[sourceField] ?? originalDoc?.[sourceField]
    if (typeof source === 'string' && source.trim().length > 0) {
      return slugify(source)
    }

    return value
  }

export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  label: 'Slug URL',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: `Kosongkan untuk dibuat otomatis dari "${sourceField}".`,
  },
  hooks: {
    beforeValidate: [formatSlug(sourceField)],
  },
})
