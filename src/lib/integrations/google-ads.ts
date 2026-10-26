import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { adPlatformConfigs, conversionApiLogs } from '@/db/schema'
import type { GoogleAdsConversionPayload, GoogleConfigCredentials } from '@/types/offline-conversion'

export interface SendGoogleConversionOptions {
  conversionId?: string
  customerId?: string
  conversionActionName?: string
  payload: GoogleAdsConversionPayload
}

export interface GoogleConversionResponse {
  success: boolean
  partialFailureError?: string
  resultsCount?: number
  error?: string
  httpStatus: number
}

/**
 * Format tanggal ke spesifikasi standar Google Ads:
 * yyyy-mm-dd hh:mm:ss+zz:zz (contoh: 2026-10-25 14:30:00+08:00)
 */
export function formatGoogleAdsDateTime(dateInput: Date | string = new Date()): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  const pad = (n: number) => String(n).padStart(2, '0')

  const year = d.getFullYear()
  const month = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const hours = pad(d.getHours())
  const minutes = pad(d.getMinutes())
  const seconds = pad(d.getSeconds())

  const offsetMinutes = -d.getTimezoneOffset()
  const offsetSign = offsetMinutes >= 0 ? '+' : '-'
  const offsetH = pad(Math.floor(Math.abs(offsetMinutes) / 60))
  const offsetM = pad(Math.abs(offsetMinutes) % 60)

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetSign}${offsetH}:${offsetM}`
}

/**
 * Mengambil kredensial Google Ads dari database
 */
export async function getGoogleConfig(): Promise<GoogleConfigCredentials | null> {
  try {
    const rows = await db
      .select({ credentials: adPlatformConfigs.credentialsEncrypted })
      .from(adPlatformConfigs)
      .where(eq(adPlatformConfigs.platform, 'GOOGLE'))
      .limit(1)

    if (rows[0]?.credentials) {
      return rows[0].credentials as GoogleConfigCredentials
    }
  } catch (error) {
    console.error('[google-ads] Failed to load config from database:', error)
  }
  return null
}

/**
 * Mengirimkan konversi offline ke Google Ads API (Click Conversions / Enhanced Conversions)
 */
export async function sendGoogleOfflineConversion(
  options: SendGoogleConversionOptions
): Promise<GoogleConversionResponse> {
  const dbConfig = await getGoogleConfig()

  const customerId = (
    options.customerId ||
    dbConfig?.customerId ||
    process.env.GOOGLE_ADS_CUSTOMER_ID ||
    ''
  ).replace(/-/g, '')

  const conversionAction =
    options.conversionActionName ||
    dbConfig?.conversionActionName ||
    process.env.GOOGLE_ADS_CONVERSION_ACTION ||
    'Closing_WhatsApp_Sales'

  const developerToken = dbConfig?.developerToken || process.env.GOOGLE_ADS_DEVELOPER_TOKEN

  if (!customerId) {
    return {
      success: false,
      error: 'Google Ads Customer ID belum dikonfigurasi.',
      httpStatus: 400,
    }
  }

  // Siapkan payload konversi
  const conversionEntry: Record<string, unknown> = {
    conversion_action: `customers/${customerId}/conversionActions/${conversionAction}`,
    conversion_date_time: options.payload.conversionDateTime,
    conversion_value: options.payload.conversionValue ?? 0,
    currency_code: options.payload.currencyCode || 'IDR',
  }

  if (options.payload.gclid) {
    conversionEntry.gclid = options.payload.gclid
  } else if (options.payload.wbraid) {
    conversionEntry.wbraid = options.payload.wbraid
  } else if (options.payload.gbraid) {
    conversionEntry.gbraid = options.payload.gbraid
  }

  // Enhanced Conversions for Leads (nomor HP hashed SHA-256)
  if (options.payload.userIdentifiers && options.payload.userIdentifiers.length > 0) {
    conversionEntry.user_identifiers = options.payload.userIdentifiers.map((u) => {
      const idObj: Record<string, string> = {}
      if (u.hashedPhoneNumber) idObj.hashed_phone_number = u.hashedPhoneNumber
      if (u.hashedEmail) idObj.hashed_email = u.hashedEmail
      return idObj
    })
  }

  const endpoint = `https://googleads.googleapis.com/v17/customers/${customerId}:uploadClickConversions`
  const requestBody = {
    conversions: [conversionEntry],
    partial_failure: true,
  }

  let httpStatus = 0
  let responseData: Record<string, unknown> | null = null
  let isSuccess = false
  let errorMessage: string | null = null

  // Jika developer token belum ada di env (misal mode development/staging), catat sebagai mode simulasi
  if (!developerToken) {
    httpStatus = 200
    isSuccess = true
    responseData = {
      message: 'Simulated upload (Developer Token not configured in current environment)',
      entry: conversionEntry,
    }
  } else {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'developer-token': developerToken,
        },
        body: JSON.stringify(requestBody),
      })

      httpStatus = response.status
      responseData = (await response.json().catch(() => ({}))) as Record<string, unknown>
      isSuccess = response.ok

      if (!response.ok) {
        const errObj = responseData?.error as { message?: string } | undefined
        errorMessage = errObj?.message || `Google Ads API error ${httpStatus}`
      }
    } catch (err: unknown) {
      httpStatus = 500
      errorMessage = err instanceof Error ? err.message : 'Gagal menghubungi Google Ads endpoint'
    }
  }

  // Rekam log pengiriman
  try {
    await db.insert(conversionApiLogs).values({
      conversionId: options.conversionId || null,
      platform: 'GOOGLE',
      endpoint,
      requestPayload: requestBody,
      responseStatus: httpStatus,
      responsePayload: responseData || {},
      isSuccess,
      errorMessage,
    })
  } catch (logErr) {
    console.error('[google-ads] Gagal menyimpan log API:', logErr)
  }

  return {
    success: isSuccess,
    resultsCount: isSuccess ? 1 : 0,
    error: errorMessage || undefined,
    httpStatus,
  }
}
