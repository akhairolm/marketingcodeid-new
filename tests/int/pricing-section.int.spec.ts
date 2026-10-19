import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import { PricingSection } from '@/components/home/PricingSection'

describe('PricingSection component', () => {
  beforeEach(() => cleanup())

  it('renders all 3 website tiers with correct names, price anchoring, and positive framing', () => {
    render(React.createElement(PricingSection))

    // Check package names
    expect(screen.getByRole('heading', { level: 3, name: 'Landing Page Konversi' })).toBeTruthy()
    expect(screen.getByRole('heading', { level: 3, name: 'Web Katalog, Profil & Blog' })).toBeTruthy()
    expect(screen.getByRole('heading', { level: 3, name: 'Company Profile Pro / Toko Online' })).toBeTruthy()

    // Check selling prices
    expect(screen.getByText('Rp 1.190.000')).toBeTruthy()
    expect(screen.getByText('Rp 2.190.000')).toBeTruthy()
    expect(screen.getByText('Rp 3.490.000')).toBeTruthy()

    // Check price anchoring (original prices crossed out)
    expect(screen.getByText('Rp 1.850.000')).toBeTruthy()
    expect(screen.getByText('Rp 3.200.000')).toBeTruthy()
    expect(screen.getByText('Rp 5.500.000')).toBeTruthy()

    // Check highlight on middle tier
    expect(screen.getByText(/PALING DIMINATI/i)).toBeTruthy()

    // Verify positive framing: no negative phrases
    const bodyText = document.body.textContent || ''
    expect(bodyText).not.toContain('Tanpa Dashboard Admin')
    expect(bodyText).not.toContain('Tanpa Payment Gateway')
  })

  it('does not render the removed enterprise banner, bundling callout, and hosting note', () => {
    render(React.createElement(PricingSection))

    expect(screen.queryByText('SOLUSI ENTERPRISE & INSTANSI')).toBeNull()
    expect(screen.queryByText(/Paket Siap Banjir Order/i)).toBeNull()
    expect(screen.queryByText(/Ketentuan Domain & Cloud Server/i)).toBeNull()
  })

  it('switches tabs smoothly between web, app, and ads', () => {
    render(React.createElement(PricingSection))

    const appTab = screen.getByRole('tab', { name: /Mobile Application/i })
    fireEvent.click(appTab)
    expect(appTab.getAttribute('aria-selected')).toBe('true')
    expect(screen.getByText('MVP Mobile Starter')).toBeTruthy()

    const webTab = screen.getByRole('tab', { name: /Website Development/i })
    fireEvent.click(webTab)
    expect(webTab.getAttribute('aria-selected')).toBe('true')
    expect(screen.getByText('Landing Page Konversi')).toBeTruthy()
  })
})
