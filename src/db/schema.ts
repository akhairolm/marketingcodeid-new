import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const media = pgTable('media', {
  id: uuid('id').primaryKey().defaultRandom(),
  filename: varchar('filename', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  filesize: integer('filesize').notNull(),
  storagePath: text('storage_path').notNull(),
  publicUrl: text('public_url').notNull(),
  altText: varchar('alt_text', { length: 500 }),
  width: integer('width'),
  height: integer('height'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const portfolios = pgTable('portfolios', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  isFeatured: boolean('is_featured').notNull().default(false),
  completedDate: timestamp('completed_date', { withTimezone: true }),
  // Ringkasan
  clientName: varchar('client_name', { length: 255 }).notNull(),
  category: varchar('category', { length: 20 }).notNull().default('web'),
  summary: text('summary').notNull(),
  thumbnailId: uuid('thumbnail_id').references(() => media.id, {
    onDelete: 'set null',
  }),
  duration: varchar('duration', { length: 100 }),
  role: text('role'),
  liveUrl: text('live_url'),
  // Cerita
  challenge: text('challenge'),
  solution: text('solution'),
  results: jsonb('results').$type<{ value: string; label: string }[]>().notNull().default([]),
  techStack: jsonb('tech_stack').$type<string[]>().notNull().default([]),
  content: text('content'),
  testimonialQuote: text('testimonial_quote'),
  testimonialName: varchar('testimonial_name', { length: 255 }),
  testimonialRole: varchar('testimonial_role', { length: 255 }),
  // SEO
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
}, (table) => [
  index('portfolios_status_completed_date_idx').on(table.status, table.completedDate),
])

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  categoryId: uuid('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  excerpt: text('excerpt'),
  coverImageId: uuid('cover_image_id').references(() => media.id, {
    onDelete: 'set null',
  }),
  content: text('content').notNull(),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  authorName: varchar('author_name', { length: 255 }).notNull().default('Tim MarketingCode.ID'),
  authorRole: varchar('author_role', { length: 255 }),
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
}, (table) => [
  index('articles_status_published_at_idx').on(table.status, table.publishedAt),
])

export type User = typeof users.$inferSelect
export type Session = typeof sessions.$inferSelect
export type MediaRow = typeof media.$inferSelect
export type PortfolioRow = typeof portfolios.$inferSelect
export type CategoryRow = typeof categories.$inferSelect
export type ArticleRow = typeof articles.$inferSelect

export const SESSION_COOKIE = 'mcid_session'
export const SESSION_TTL_DAYS = 7
