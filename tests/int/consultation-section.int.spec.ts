import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import { ConsultationSection } from '@/components/home/ConsultationSection'
import * as analytics from '@/lib/analytics'

describe('ConsultationSection form & WhatsApp flow', () => {
  beforeEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('rejects whitespace-only names with an accessible alert', () => {
    render(React.createElement(ConsultationSection))
    const nameInput = screen.getByLabelText(/nama lengkap/i)
    const phoneInput = screen.getByLabelText(/nomor whatsapp/i)
    const submitBtn = screen.getByRole('button', { name: /konsultasi website via whatsapp/i })

    fireEvent.change(nameInput, { target: { value: '   ' } })
    fireEvent.change(phoneInput, { target: { value: '08123456789' } })
    fireEvent.click(submitBtn)

    const alert = screen.getByRole('alert')
    expect(alert).toBeTruthy()
    expect(alert.textContent).toMatch(/minimal 2 karakter/i)
  })

  it('rejects phone numbers with fewer than 9 digits', () => {
    render(React.createElement(ConsultationSection))
    const nameInput = screen.getByLabelText(/nama lengkap/i)
    const phoneInput = screen.getByLabelText(/nomor whatsapp/i)
    const submitBtn = screen.getByRole('button', { name: /konsultasi website via whatsapp/i })

    fireEvent.change(nameInput, { target: { value: 'Budi' } })
    fireEvent.change(phoneInput, { target: { value: '08123' } })
    fireEvent.click(submitBtn)

    const alert = screen.getByRole('alert')
    expect(alert).toBeTruthy()
    expect(alert.textContent).toMatch(/antara 9 hingga 15 digit/i)
  })

  it('navigates synchronously to WhatsApp and preserves form values', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const trackSpy = vi.spyOn(analytics, 'trackWhatsAppClick')

    render(React.createElement(ConsultationSection))
    const nameInput = screen.getByLabelText(/nama lengkap/i) as HTMLInputElement
    const phoneInput = screen.getByLabelText(/nomor whatsapp/i) as HTMLInputElement
    const businessInput = screen.getByLabelText(/nama usaha/i) as HTMLInputElement
    const submitBtn = screen.getByRole('button', { name: /konsultasi website via whatsapp/i })

    fireEvent.change(nameInput, { target: { value: 'Budi Santoso' } })
    fireEvent.change(phoneInput, { target: { value: '081234567890' } })
    fireEvent.change(businessInput, { target: { value: 'Toko Berkah' } })
    fireEvent.click(submitBtn)

    // Window open called immediately
    expect(windowOpenSpy).toHaveBeenCalledTimes(1)
    const [openedUrl, target] = windowOpenSpy.mock.calls[0]
    expect(openedUrl).toContain('wa.me/6285128038243')
    expect(openedUrl).toContain(encodeURIComponent('Budi Santoso'))
    expect(target).toBe('_blank')

    // Form data is retained, not wiped
    expect(nameInput.value).toBe('Budi Santoso')
    expect(phoneInput.value).toBe('081234567890')
    expect(businessInput.value).toBe('Toko Berkah')

    // Honest guidance banner rendered
    expect(screen.getByRole('status')).toBeTruthy()
    expect(screen.getByText(/Lanjutkan Pengiriman Pesan di WhatsApp/i)).toBeTruthy()

    // Non-PII analytics tracking verified
    expect(trackSpy).toHaveBeenCalledWith({
      position: 'consultation_form',
      service: 'umkm',
    })
  })
})
