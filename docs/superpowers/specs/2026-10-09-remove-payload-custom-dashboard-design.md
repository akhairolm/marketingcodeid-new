# Design Doc — Remove Payload CMS, Full Custom Next.js Dashboard

Date: 2026-10-09
Status: Approved

## Goal

Remove Payload CMS entirely. Everything (public frontend + admin dashboard)
runs as one Next.js 16 fullstack app with direct DB access via Drizzle ORM.
Dashboard is 100% custom (shadcn/ui), no third-party admin UI.

## Decisions (user-approved)

- Data: start fresh, no migration of existing Payload data
- ORM: Drizzle ORM standalone (`drizzle-orm` + `drizzle-kit` + `postgres` driver)
- Article content: Markdown (stored as text, rendered with `marked`)
- Media: Supabase Storage via `@supabase/supabase-js` (S3 SDK not needed)
- Auth: custom session cookie (httpOnly), scrypt hash from `node:crypto`,
  `sessions` table, Next.js middleware protects `/dashboard/*`
- Scope: full CRUD — portofolio, artikel, kategori, media, stats, auth

## Removed

- deps: `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`,
  `@payloadcms/richtext-lexical`, `@payloadcms/storage-s3`, `@payloadcms/ui`,
  `graphql`
- files: `src/payload.config.ts`, `src/payload-types.ts`, `src/collections/`,
  `src/fields/`, `src/app/(payload)/`, `src/components/admin/`,
  payload scripts in package.json

## Added deps

- `drizzle-orm`, `postgres` (runtime)
- `drizzle-kit` (dev, for `drizzle-kit push`)
- `@supabase/supabase-js` (runtime)
- `marked` (runtime, markdown render)

## Schema (`src/db/schema.ts`)

Follows PRD ERD, plus:

- `users` (id uuid, email unique, password_hash, name, created_at)
- `sessions` (id uuid, user_id FK, token_hash unique, expires_at, created_at)
- `services`, `portfolios`, `articles`, `categories`, `media` per PRD ERD
- `articles.content` = markdown text (replaces Lexical richText JSON)
- slug unique + status (draft|published) + published_at on portfolios/articles
- media stores `path`, `public_url`, `mime_type`, `filesize`, `alt_text`

Migrations: `drizzle-kit push` (fresh DB, no migration files needed).

## Auth

- `src/lib/auth.ts`: scrypt hash/verify, createSession (random 32-byte token,
  sha256 stored), getSessionUser (cookie → join sessions/users), destroySession
- Login: server action sets httpOnly, secure (prod), sameSite=lax cookie
  `mcid_session`, 7-day expiry
- `middleware.ts`: redirects unauthenticated `/dashboard/*` (except
  `/dashboard/login`) to login; authenticated users on login page → dashboard
- Seed: `src/db/seed.ts` creates admin from `ADMIN_EMAIL`/`ADMIN_PASSWORD` env

## Dashboard pages (all custom, shadcn/ui)

| Route | Function |
|---|---|
| `/dashboard/login` | login form (server action) |
| `/dashboard` | KPI stats + recent lists (Drizzle counts) |
| `/dashboard/portofolio` | list table |
| `/dashboard/portofolio/baru`, `/[id]` | create/edit form (server actions) |
| `/dashboard/artikel` | list table |
| `/dashboard/artikel/baru`, `/[id]` | create/edit form, markdown textarea |
| `/dashboard/kategori` | list + inline create/delete |
| `/dashboard/media` | grid + upload + delete (Supabase Storage) |

All mutations are Server Actions + `revalidatePath`.

## Public frontend

Existing pages (home, blog, blog/[slug], portfolio, portfolio/[slug],
digital-marketing, video-editing) rewired: `getPayload` → Drizzle queries.
Lexical RichText → `marked` render. SEO metadata, JSON-LD, WhatsApp CTA
unchanged.

## Media upload

Server action: validate mime/size → `supabase.storage.from('media').upload()`
→ public URL → insert `media` row. Delete: remove row + `storage.remove()`.

## Testing

- Vitest unit: auth utils (hash/verify/session token), slugify, markdown render
- Playwright e2e: login → create article → appears on /blog (kept light)
- `pnpm lint`, `tsc --noEmit`, `next build` must pass

## Out of scope

- Multi-user roles (single admin), image resizing (Supabase handles transform
  via URL params), comments, analytics
