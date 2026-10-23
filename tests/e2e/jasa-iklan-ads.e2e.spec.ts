import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

test.describe('Halaman /jasa-iklan-ads', () => {
  test('tampil di desktop 1280x800 tanpa overflow horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    const response = await page.goto(`${BASE}/jasa-iklan-ads`)
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/Rp 3\.5jt/).first()).toBeVisible()

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
    expect(overflow).toBe(true)
  })

  test('tampil di mobile 390x844 tanpa overflow horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${BASE}/jasa-iklan-ads`)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
    expect(overflow).toBe(true)
  })

  test('tombol WhatsApp mengarah ke nomor resmi', async ({ page }) => {
    await page.goto(`${BASE}/jasa-iklan-ads`)
    const waLinks = page.locator('a[href^="https://wa.me/"]')
    expect(await waLinks.count()).toBeGreaterThanOrEqual(4)

    const firstHref = await waLinks.first().getAttribute('href')
    expect(firstHref).toContain('6285128038243')
  })

  test('URL lama /company-profile dialihkan permanen', async ({ page }) => {
    const response = await page.goto(`${BASE}/company-profile`, { waitUntil: 'commit' })
    const redirectStatus = (await response?.request().redirectedFrom()?.response())?.status()
    expect([301, 308]).toContain(redirectStatus ?? response?.status())
    await page.waitForURL('**/jasa-pembuatan-website')
  })

  test('URL lama /landing-page dialihkan permanen', async ({ page }) => {
    const response = await page.goto(`${BASE}/landing-page`, { waitUntil: 'commit' })
    const redirectStatus = (await response?.request().redirectedFrom()?.response())?.status()
    expect([301, 308]).toContain(redirectStatus ?? response?.status())
    await page.waitForURL('**/jasa-pembuatan-website')
  })

  test('URL lama /jasa-iklan-meta-ads dialihkan ke halaman baru', async ({ page }) => {
    const response = await page.goto(`${BASE}/jasa-iklan-meta-ads`, { waitUntil: 'commit' })
    const redirectStatus = (await response?.request().redirectedFrom()?.response())?.status()
    expect([301, 308]).toContain(redirectStatus ?? response?.status())
    await page.waitForURL('**/jasa-iklan-ads')
  })

  test('URL /digital-marketing menghasilkan 404', async ({ page }) => {
    const response = await page.goto(`${BASE}/digital-marketing`, { waitUntil: 'commit' })
    expect(response?.status()).toBe(404)
  })
})
