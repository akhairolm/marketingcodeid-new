import { test, expect, Page } from '@playwright/test'

const BASE = 'http://localhost:3000'

async function login(page: Page) {
  await page.goto(`${BASE}/dashboard/login`)
  await page.fill('input[name="email"]', process.env.ADMIN_EMAIL || 'admin@marketingcode.id')
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || '')
  await page.click('button[type="submit"]')
  await page.waitForURL(`${BASE}/dashboard`)
}

test.describe('Custom Dashboard', () => {
  test('redirects unauthenticated visitors to login', async ({ page }) => {
    await page.goto(`${BASE}/dashboard`)
    await expect(page).toHaveURL(/\/dashboard\/login/)
  })

  test('login → dashboard → create article draft', async ({ page }) => {
    await login(page)

    await expect(page.locator('h1', { hasText: 'Ringkasan' })).toBeVisible()

    await page.goto(`${BASE}/dashboard/artikel/baru`)
    const unique = Date.now()
    await page.fill('input[name="title"]', `E2E Test Artikel ${unique}`)
    await page.fill('textarea[name="content"]', `## Bagian Uji\n\nKonten e2e ${unique}.`)
    await page.getByRole('button', { name: 'Simpan Artikel' }).click()

    await page.waitForURL(`${BASE}/dashboard/artikel`)
    await expect(page.locator('table')).toContainText(`E2E Test Artikel ${unique}`)
  })
})
