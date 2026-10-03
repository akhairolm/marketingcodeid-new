# MarketingCode.ID — Digital Solutions & Web Agency

Modern high-performance web agency platform built with **Next.js 16 (App Router)**, **React 19**, **Payload CMS 3**, **Tailwind CSS**, and **Shadcn UI**.

---

## 🌟 Tech Stack

- **Framework**: [Next.js 16 (App Router & Turbopack)](https://nextjs.org/)
- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **CMS**: [Payload CMS 3](https://payloadcms.com/) (Serverless embedded within Next.js)
- **Database**: PostgreSQL (via Supabase / `@payloadcms/db-postgres`)
- **Storage**: Supabase Storage S3 (`@payloadcms/storage-s3`)
- **Deployment**: Optimized for single-repository deployment on [Vercel](https://vercel.com/)
- **Design Philosophy**: [Hallmark Anti-AI-Slop System](.agents/skills/hallmark/SKILL.md)

---

## 🚀 Key Features

1. **High-Converting Landing Page**:
   - Modern floating capsule navigation with quick anchor links & mobile menu.
   - Interactive hero section with live video showreel dialog modal.
   - 4 Core agency pillars: Web Development, Mobile App Dev, Digital Marketing, and UI/UX Design.
   - Key metrics display (180+ apps, Rp 45M+ client GMV, 98.6% satisfaction).
   - Core Web Vitals score showcase (Score 99) & ROI growth chart simulation (+320% ROI).
   - Dynamic 3-tier investment pricing cards with category filter tabs.
   - 3-Step streamlined onboarding workflow.
   - Interactive consultation lead form connected to automated WhatsApp message pipeline.
   - Accordion FAQ and dark glowing CTA banner.

2. **Full-Stack Architecture**:
   - Integrated Payload CMS 3 admin dashboard under `/admin`.
   - Local API querying (`getPayload`) without external HTTP overhead.
   - Vercel-ready serverless configuration.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18.20.2+ or 20.9.0+
- pnpm 9+

### 2. Environment Setup
Copy the example environment file and configure your credentials:

```bash
cp .env.example .env
```

Ensure the following variables are configured in `.env`:
```env
DATABASE_URI=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
PAYLOAD_SECRET=[YOUR_RANDOM_SECRET_KEY]
S3_BUCKET=[YOUR_SUPABASE_BUCKET_NAME]
S3_ACCESS_KEY_ID=[YOUR_S3_ACCESS_KEY]
S3_SECRET_ACCESS_KEY=[YOUR_S3_SECRET_KEY]
S3_REGION=[YOUR_S3_REGION]
S3_ENDPOINT=[YOUR_SUPABASE_S3_ENDPOINT]
```

### 3. Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the homepage.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access Payload CMS.

### 4. Production Build

```bash
pnpm build
pnpm start
```

---

## 📄 License

Proprietary © 2026 MarketingCode.ID Digital Agency. All rights reserved.
