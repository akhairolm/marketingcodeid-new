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

    await expect(page.getByText('Mulai Cepat', { exact: true })).toBeVisible()

    await page.goto(`${BASE}/dashboard/artikel/baru`)
    const unique = Date.now()
    await page.fill('input[name="title"]', `E2E Test Artikel ${unique}`)
    // Tiptap editor: click into the contenteditable and type
    const editorBody = page.locator('.tiptap-content')
    await editorBody.click()
    await page.keyboard.type(`Konten e2e ${unique}.`)

    // Select required thumbnail
    const pickThumbBtn = page.getByRole('button', { name: /Pilih Thumbnail/i })
    if (await pickThumbBtn.isVisible()) {
      await pickThumbBtn.click()
      const mediaOption = page.locator('[role="dialog"] button').filter({ has: page.locator('img') }).first()
      await mediaOption.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
      if (await mediaOption.isVisible()) {
        await mediaOption.click()
      }
    }

    await page.getByRole('button', { name: 'Simpan Artikel' }).click()

    await page.waitForURL(`${BASE}/dashboard/artikel`)
    await expect(page.locator('table')).toContainText(`E2E Test Artikel ${unique}`)
  })
})
