import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword, hashToken, generateSessionToken } from '@/lib/auth-core'
import { slugify } from '@/lib/slugify'

describe('auth-core', () => {
  it('hashes and verifies a password', async () => {
    const hash = await hashPassword('rahasia-ku')
    expect(hash.startsWith('scrypt:')).toBe(true)
    expect(await verifyPassword('rahasia-ku', hash)).toBe(true)
    expect(await verifyPassword('salah', hash)).toBe(false)
  })

  it('rejects malformed hashes without throwing', async () => {
    expect(await verifyPassword('x', 'not-a-hash')).toBe(false)
    expect(await verifyPassword('x', '')).toBe(false)
  })

  it('produces unique salts', async () => {
    const a = await hashPassword('same')
    const b = await hashPassword('same')
    expect(a).not.toBe(b)
  })

  it('session token hashes deterministically with sha256', () => {
    const token = generateSessionToken()
    expect(token).toMatch(/^[a-f0-9]{64}$/)
    expect(hashToken(token)).toBe(hashToken(token))
    expect(hashToken('a')).toHaveLength(64)
  })
})

describe('slugify', () => {
  it('converts titles to url-safe slugs', () => {
    expect(slugify('Strategi SEO 2026: Panduan Lengkap!')).toBe('strategi-seo-2026-panduan-lengkap')
  })

  it('handles indonesian spaces, ampersand, underscores', () => {
    expect(slugify('Web & Mobile App_dev')).toBe('web-dan-mobile-app-dev')
  })

  it('returns empty string for symbols-only input', () => {
    expect(slugify('***')).toBe('')
  })
})
