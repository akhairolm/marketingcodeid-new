import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
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

export const adClickSessions = pgTable('ad_click_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  refCode: varchar('ref_code', { length: 20 }).notNull().unique(),
  sourceUrl: text('source_url'),
  gclid: text('gclid'),
  wbraid: text('wbraid'),
  gbraid: text('gbraid'),
  fbclid: text('fbclid'),
  fbc: text('fbc'),
  fbp: text('fbp'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  phoneNumber: varchar('phone_number', { length: 30 }),
  phoneHash: text('phone_hash'),
  status: varchar('status', { length: 20 }).notNull().default('CLICKED'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
}, (table) => [
  index('ad_click_sessions_ref_code_idx').on(table.refCode),
  index('ad_click_sessions_status_idx').on(table.status),
  index('ad_click_sessions_created_at_idx').on(table.createdAt),
])

export const offlineConversions = pgTable('offline_conversions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => adClickSessions.id, { onDelete: 'set null' }),
  platform: varchar('platform', { length: 20 }).notNull(),
  eventName: varchar('event_name', { length: 50 }).notNull(),
  conversionValue: numeric('conversion_value', { precision: 15, scale: 2 }),
  currency: varchar('currency', { length: 10 }).notNull().default('IDR'),
  conversionTime: timestamp('conversion_time', { withTimezone: true }).notNull().defaultNow(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
}, (table) => [
  index('offline_conversions_platform_idx').on(table.platform),
  index('offline_conversions_created_at_idx').on(table.createdAt),
])

export const conversionApiLogs = pgTable('conversion_api_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversionId: uuid('conversion_id').references(() => offlineConversions.id, { onDelete: 'cascade' }),
  platform: varchar('platform', { length: 20 }).notNull(),
  endpoint: text('endpoint').notNull(),
  requestPayload: jsonb('request_payload').notNull(),
  responseStatus: integer('response_status').notNull(),
  responsePayload: jsonb('response_payload'),
  isSuccess: boolean('is_success').notNull(),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
}, (table) => [
  index('conversion_api_logs_platform_idx').on(table.platform),
  index('conversion_api_logs_created_at_idx').on(table.createdAt),
])

export const adPlatformConfigs = pgTable('ad_platform_configs', {
  id: uuid('id').primaryKey().defaultRandom(),
  platform: varchar('platform', { length: 20 }).notNull().unique(),
  credentialsEncrypted: jsonb('credentials_encrypted').notNull().default({}),
  isActive: boolean('is_active').notNull().default(true),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type User = typeof users.$inferSelect
export type Session = typeof sessions.$inferSelect
export type MediaRow = typeof media.$inferSelect
export type PortfolioRow = typeof portfolios.$inferSelect
export type CategoryRow = typeof categories.$inferSelect
export type ArticleRow = typeof articles.$inferSelect
export type AdClickSessionRow = typeof adClickSessions.$inferSelect
export type NewAdClickSession = typeof adClickSessions.$inferInsert
export type OfflineConversionRow = typeof offlineConversions.$inferSelect
export type NewOfflineConversion = typeof offlineConversions.$inferInsert
export type ConversionApiLogRow = typeof conversionApiLogs.$inferSelect
export type NewConversionApiLog = typeof conversionApiLogs.$inferInsert
export type AdPlatformConfigRow = typeof adPlatformConfigs.$inferSelect
export type NewAdPlatformConfig = typeof adPlatformConfigs.$inferInsert

export const SESSION_COOKIE = 'mcid_session'
export const SESSION_TTL_DAYS = 7
