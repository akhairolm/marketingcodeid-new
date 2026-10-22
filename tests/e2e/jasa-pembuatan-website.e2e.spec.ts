import { test, expect } from '@playwright/test'

test.describe('Jasa Pembuatan Website UX & Responsiveness', () => {
  test('Desktop Viewport (1280x800) - Layout, Pricing, and WhatsApp Links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('http://localhost:3000/jasa-pembuatan-website')

    // Page title and H1
    await expect(page).toHaveTitle(/Jasa Pembuatan Website & Toko Online Profesional/i)
    const h1 = page.locator('h1')
    await expect(h1).toContainText('Miliki Website & Toko Online Profesional')
    await expect(h1).toContainText('Tanpa Ribet Koding')

    // No horizontal scroll overflow
    const hasNoOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
    expect(hasNoOverflow).toBe(true)

    // Pricing tiers matching homepage
    await expect(page.getByText('Rp 1.190.000', { exact: true })).toBeVisible()
    await expect(page.getByText('Rp 2.190.000', { exact: true })).toBeVisible()
    await expect(page.getByText('Rp 3.490.000', { exact: true })).toBeVisible()
    await expect(page.locator('text=PALING DIMINATI')).toBeVisible()

    const waLinks = await page.$$eval('a[href*="wa.me"]', (links) =>
      links.map((l) => (l as HTMLAnchorElement).href)
    )
    expect(waLinks.length).toBeGreaterThan(0)
    for (const href of waLinks) {
      expect(href).toContain('6285128038243')
    }

    // Floating WhatsApp button
    await expect(page.locator('#floating-whatsapp-btn')).toBeVisible()

    // Suara Pengguna section visible
    await expect(page.locator('#suara-pengguna')).toBeVisible()
    await expect(page.locator('text=Cerita & Pengalaman Nyata Klien Kami')).toBeVisible()
  })

  test('301 / 308 Permanent Redirect from /website-umkm', async ({ page }) => {
    await page.goto('http://localhost:3000/website-umkm')
    await page.waitForURL('**/jasa-pembuatan-website')
    expect(page.url()).toContain('/jasa-pembuatan-website')
  })

  test('Mobile Viewport (390x844) - No Overflow, Hamburger Nav & Drawer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('http://localhost:3000/jasa-pembuatan-website')

    // Check no horizontal scroll overflow on mobile
    const hasNoOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
    expect(hasNoOverflow).toBe(true)

    // Hamburger button
    const hamburgerBtn = page.locator('button[aria-label="Buka menu"]')
    await expect(hamburgerBtn).toBeVisible()
    await hamburgerBtn.click()

    // Navigation drawer opens with Jasa Pembuatan Website link
    const drawerLink = page.locator('div.fixed.inset-x-4 a[href="/jasa-pembuatan-website"]')
    await expect(drawerLink).toBeVisible()

    // Close menu
    const closeBtn = page.locator('button[aria-label="Tutup menu"]')
    await closeBtn.click()

    // Floating WhatsApp button is visible on mobile
    await expect(page.locator('#floating-whatsapp-btn')).toBeVisible()
  })
})
