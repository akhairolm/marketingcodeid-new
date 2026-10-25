import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { adPlatformConfigs, conversionApiLogs } from '@/db/schema'
import type { MetaCapiEventPayload, MetaConfigCredentials } from '@/types/offline-conversion'

export interface SendMetaCapiOptions {
  conversionId?: string
  pixelId?: string
  accessToken?: string
  testEventCode?: string
  payload: MetaCapiEventPayload
}

export interface MetaCapiResponse {
  success: boolean
  eventsReceived?: number
  fbtraceId?: string
  error?: string
  httpStatus: number
}

/**
 * Mengambil kredensial Meta CAPI dari database adPlatformConfigs
 */
export async function getMetaConfig(): Promise<MetaConfigCredentials | null> {
  try {
    const rows = await db
      .select({ credentials: adPlatformConfigs.credentialsEncrypted })
      .from(adPlatformConfigs)
      .where(eq(adPlatformConfigs.platform, 'META'))
      .limit(1)

    if (rows[0]?.credentials) {
      return rows[0].credentials as MetaConfigCredentials
    }
  } catch (error) {
    console.error('[meta-capi] Failed to load config from database:', error)
  }
  return null
}

/**
 * Mengirim event ke Meta Conversions API (Graph API v19.0)
 */
export async function sendMetaCapiEvent(
  options: SendMetaCapiOptions
): Promise<MetaCapiResponse> {
  const dbConfig = await getMetaConfig()

  const pixelId = options.pixelId || dbConfig?.pixelId || process.env.META_PIXEL_ID
  const accessToken = options.accessToken || dbConfig?.accessToken || process.env.META_ACCESS_TOKEN
  const testEventCode = options.testEventCode || dbConfig?.testEventCode || process.env.META_TEST_EVENT_CODE

  if (!pixelId || !accessToken) {
    const errorMsg = 'Meta Pixel ID atau Access Token belum dikonfigurasi.'
    return {
      success: false,
      error: errorMsg,
      httpStatus: 400,
    }
  }

  const endpoint = `https://graph.facebook.com/v19.0/${pixelId}/events`

  const bodyData: Record<string, unknown> = {
    data: [options.payload],
  }

  if (testEventCode) {
    bodyData.test_event_code = testEventCode
  }

  let httpStatus = 0
  let responseData: any = null
  let isSuccess = false
  let errorMessage: string | null = null

  try {
    const response = await fetch(`${endpoint}?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    })

    httpStatus = response.status
    responseData = await response.json().catch(() => ({}))
    isSuccess = response.ok

    if (!response.ok) {
      errorMessage =
        responseData?.error?.message || `Meta CAPI error dengan status HTTP ${httpStatus}`
    }
  } catch (err: any) {
    httpStatus = 500
    errorMessage = err?.message || 'Gagal menghubungi Meta Graph API endpoint'
  }

  // Rekam pengiriman ke tabel log audit
  try {
    await db.insert(conversionApiLogs).values({
      conversionId: options.conversionId || null,
      platform: 'META',
      endpoint,
      requestPayload: bodyData,
      responseStatus: httpStatus,
      responsePayload: responseData || {},
      isSuccess,
      errorMessage,
    })
  } catch (logErr) {
    console.error('[meta-capi] Gagal menyimpan log API:', logErr)
  }

  return {
    success: isSuccess,
    eventsReceived: responseData?.events_received,
    fbtraceId: responseData?.fbtrace_id,
    error: errorMessage || undefined,
    httpStatus,
  }
}
