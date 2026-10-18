import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import PertanyaanPage from '@/app/(frontend)/pertanyaan/page'
import { FaqClient } from '@/app/(frontend)/pertanyaan/faq-client'
import { AGENCY_FAQS } from '@/data/faqs'

describe('Pertanyaan (FAQ) Page & Client Accordion', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders the complete FAQ page with breadcrumb and heading', () => {
    render(React.createElement(PertanyaanPage))

    // Main H1 is present
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Pertanyaan yang Sering Diajukan Seputar Layanan Website/i,
      }),
    ).toBeTruthy()

    // Breadcrumb is present
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeTruthy()

    // WhatsApp CTA button is present and points to official number
    const whatsappBtn = screen.getByRole('link', { name: /tanya tim via whatsapp/i })
    expect(whatsappBtn).toBeTruthy()
    expect(whatsappBtn.getAttribute('href')).toContain('6285128038243')
  })

  it('filters questions by category pill', () => {
    render(React.createElement(FaqClient, { faqs: AGENCY_FAQS }))

    const biayaTab = screen.getByRole('tab', { name: /biaya & paket/i })
    fireEvent.click(biayaTab)

    expect(screen.getByText(/Berapa biaya pembuatan website di MarketingCode\?/i)).toBeTruthy()
    expect(screen.queryByText(/Apakah MarketingCode melayani klien di luar Banjarmasin/i)).toBeNull()
  })

  it('filters questions by keyword search and displays empty state when not found', () => {
    render(React.createElement(FaqClient, { faqs: AGENCY_FAQS }))

    const searchInput = screen.getByPlaceholderText(/ketik kata kunci/i)
    fireEvent.change(searchInput, { target: { value: 'domain' } })

    expect(screen.getByText(/Apakah biaya sudah termasuk domain dan cloud hosting\?/i)).toBeTruthy()

    // Search with non-matching term
    fireEvent.change(searchInput, { target: { value: 'xyz123randomstring' } })
    expect(screen.getByText(/Pertanyaan Tidak Ditemukan/i)).toBeTruthy()
  })

  it('toggles accordion item open and closed', () => {
    render(React.createElement(FaqClient, { faqs: AGENCY_FAQS }))

    // First item is open by default
    const firstTrigger = screen.getAllByRole('button', { name: /Berapa biaya pembuatan website/i })[0]
    expect(firstTrigger.getAttribute('aria-expanded')).toBe('true')

    // Click to toggle closed
    fireEvent.click(firstTrigger)
    expect(firstTrigger.getAttribute('aria-expanded')).toBe('false')

    // Click again to toggle open
    fireEvent.click(firstTrigger)
    expect(firstTrigger.getAttribute('aria-expanded')).toBe('true')
  })
})
