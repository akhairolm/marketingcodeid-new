import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { db } from './index'
import { users } from './schema'
import { hashPassword } from '../lib/auth-core'

async function seed() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME || 'Admin'

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
    process.exit(1)
  }

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1)
  if (existing.length > 0) {
    console.log(`Admin ${email} already exists, skipping.`)
    process.exit(0)
  }

  const passwordHash = await hashPassword(password)
  await db.insert(users).values({ email, passwordHash, name })
  console.log(`Admin ${email} created.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
