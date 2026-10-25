import { describe, it, expect } from 'vitest'
import { extractAdParamsFromSearch, formatMetaFbc } from '@/lib/tracking/ad-params'
import { generateRefCode, isValidRefCode } from '@/lib/tracking/ref-code'
import {
  extractRefCodeFromMessage,
  normalizePhoneNumberE164,
} from '@/lib/tracking/whatsapp-parser'
import { hashSha256 } from '@/lib/tracking/hashing'
import { generateGoogleAdsConversionCsv } from '@/lib/integrations/google-csv-export'
import { formatGoogleAdsDateTime } from '@/lib/integrations/google-ads'
import { appendRefCodeToMessage } from '@/lib/tracking/client-tracker'

describe('Offline Conversion Tracking Unit & Integration Suite', () => {
  describe('Ad Params Extractor & Formatter', () => {
    it('mengambil parameter gclid, fbclid, wbraid, dan gbraid dari URL search params', () => {
      const search =
        'gclid=CjwKCAjw9_dummy&fbclid=IwAR0_dummy&wbraid=wb_123&gbraid=gb_456'
      const params = extractAdParamsFromSearch(search)

      expect(params.gclid).toBe('CjwKCAjw9_dummy')
      expect(params.fbclid).toBe('IwAR0_dummy')
      expect(params.wbraid).toBe('wb_123')
      expect(params.gbraid).toBe('gb_456')
      expect(params.fbc).toMatch(/^fb\.1\.\d+\.IwAR0_dummy$/)
    })

    it('menghasilkan format standar Meta fbc yang valid', () => {
      const fixedTime = 1700000000000
      const formatted = formatMetaFbc('test_fbclid_123', fixedTime)
      expect(formatted).toBe('fb.1.1700000000000.test_fbclid_123')
    })

    it('mengembalikan null jika fbclid kosong', () => {
      expect(formatMetaFbc('')).toBeNull()
      expect(formatMetaFbc(null)).toBeNull()
    })
  })

  describe('Reference Code Generator & Validator', () => {
    it('menghasilkan kode referensi acak dengan prefix dan panjang yang benar', () => {
      const code = generateRefCode('MC', 4)
      expect(code).toMatch(/^#MC-[A-Z0-9]{4}$/)
      expect(isValidRefCode(code)).toBe(true)
    })

    it('memvalidasi format kode referensi yang sah dan menolak format salah', () => {
      expect(isValidRefCode('#MC-9K2A')).toBe(true)
      expect(isValidRefCode('MC-9K2A')).toBe(true)
      expect(isValidRefCode('invalid_code')).toBe(false)
      expect(isValidRefCode('')).toBe(false)
    })
  })

  describe('WhatsApp Message Parser & Phone Normalizer', () => {
    it('mengekstrak kode referensi dari pesan WhatsApp calon pembeli', () => {
      const msg1 =
        'Halo Admin MarketingCode.ID, saya tertarik konsultasi layanan (Ref: #MC-9K2A)'
      expect(extractRefCodeFromMessage(msg1)).toBe('#MC-9K2A')

      const msg2 = 'Saya mau tanya paket website Ref: MC-7B8C terima kasih'
      expect(extractRefCodeFromMessage(msg2)).toBe('#MC-7B8C')

      const msg3 = 'Halo admin #MC-3X9Y tolong dibantu'
      expect(extractRefCodeFromMessage(msg3)).toBe('#MC-3X9Y')

      const msgWithoutRef = 'Halo admin, berapa biaya buat landing page?'
      expect(extractRefCodeFromMessage(msgWithoutRef)).toBeNull()
    })

    it('menormalisasi nomor telepon lokal dan WhatsApp JID ke format standar internasional E.164', () => {
      expect(normalizePhoneNumberE164('081234567890')).toBe('+6281234567890')
      expect(normalizePhoneNumberE164('6281234567890@c.us')).toBe('+6281234567890')
      expect(normalizePhoneNumberE164('+62 812-3456-7890')).toBe('+6281234567890')
      expect(normalizePhoneNumberE164('81234567890')).toBe('+6281234567890')
    })
  })

  describe('Hashing SHA-256 Privacy Compliance', () => {
    it('menghasilkan hash SHA-256 huruf kecil yang konsisten untuk nomor telepon', () => {
      const phone = '+6281234567890'
      const hash1 = hashSha256(phone)
      const hash2 = hashSha256('  +6281234567890  ')

      expect(hash1).toBeDefined()
      expect(hash1).toHaveLength(64)
      expect(hash1).toBe(hash2)
      expect(hash1).toBe(hash1?.toLowerCase())
    })

    it('mengembalikan null jika input kosong', () => {
      expect(hashSha256('')).toBeNull()
      expect(hashSha256(null)).toBeNull()
    })
  })

  describe('Google Ads Offline Conversion CSV Generator', () => {
    it('menghasilkan header dan baris data sesuai format resmi Google Ads', () => {
      const fixedDate = new Date('2026-10-25T10:00:00Z')
      const rows = [
        {
          gclid: 'CjwKCAjw9_dummy123',
          conversionName: 'Closing_WhatsApp_Sales',
          conversionTime: fixedDate,
          conversionValue: 1190000,
          currency: 'IDR',
        },
      ]

      const csv = generateGoogleAdsConversionCsv(rows)
      const lines = csv.split('\n')

      expect(lines[0]).toBe(
        'Parameters: Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency'
      )
      expect(lines[1]).toContain('CjwKCAjw9_dummy123')
      expect(lines[1]).toContain('Closing_WhatsApp_Sales')
      expect(lines[1]).toContain('1190000')
      expect(lines[1]).toContain('IDR')
    })

    it('memformat tanggal ke format standar Google yyyy-mm-dd hh:mm:ss+zz:zz', () => {
      const formatted = formatGoogleAdsDateTime(new Date('2026-10-25T12:30:45+08:00'))
      expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/)
    })
  })

  describe('Client-side WhatsApp Link Builder', () => {
    it('menyisipkan kode referensi ke pesan tanpa merusak isi pesan asli', () => {
      const baseMsg = 'Halo Admin, saya ingin order'
      const result = appendRefCodeToMessage(baseMsg, '#MC-8F21')
      expect(result).toBe('Halo Admin, saya ingin order (Ref: #MC-8F21)')
    })

    it('tidak menduplikasi kode referensi jika pesan sudah memuat Ref:', () => {
      const msgWithRef = 'Halo Admin, saya ingin order (Ref: #MC-8F21)'
      const result = appendRefCodeToMessage(msgWithRef, '#MC-8F21')
      expect(result).toBe(msgWithRef)
    })
  })
})
