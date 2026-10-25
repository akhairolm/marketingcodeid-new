import type {
  AdClickSessionRow,
  NewAdClickSession,
  OfflineConversionRow,
  NewOfflineConversion,
  ConversionApiLogRow,
  NewConversionApiLog,
  AdPlatformConfigRow,
  NewAdPlatformConfig,
} from '@/db/schema'

export type {
  AdClickSessionRow,
  NewAdClickSession,
  OfflineConversionRow,
  NewOfflineConversion,
  ConversionApiLogRow,
  NewConversionApiLog,
  AdPlatformConfigRow,
  NewAdPlatformConfig,
}

export type SessionStatus = 'CLICKED' | 'LEAD_RECEIVED' | 'WON' | 'LOST'
export type ConversionPlatform = 'META' | 'GOOGLE' | 'BOTH'
export type ConversionEventName = 'Lead' | 'Purchase' | 'QualifiedLead'

export interface MetaCapiUserData {
  fbc?: string | null
  fbp?: string | null
  client_ip_address?: string | null
  client_user_agent?: string | null
  ph?: string[] // Hashed with SHA-256
  em?: string[] // Hashed with SHA-256
}

export interface MetaCapiCustomData {
  value?: number
  currency?: string
  content_name?: string
  order_id?: string
}

export interface MetaCapiEventPayload {
  event_name: ConversionEventName | string
  event_time: number
  action_source: 'website' | 'system_generated' | 'other'
  event_source_url?: string
  user_data: MetaCapiUserData
  custom_data?: MetaCapiCustomData
}

export interface GoogleAdsConversionPayload {
  gclid?: string | null
  wbraid?: string | null
  gbraid?: string | null
  conversionAction: string
  conversionDateTime: string // Format: yyyy-mm-dd hh:mm:ss+zz:zz
  conversionValue?: number
  currencyCode?: string
  userIdentifiers?: Array<{
    hashedPhoneNumber?: string // E.164 SHA-256
    hashedEmail?: string
  }>
}

export interface MetaConfigCredentials {
  pixelId?: string
  datasetId?: string
  accessToken?: string
  testEventCode?: string
  autoSendLead?: boolean
}

export interface GoogleConfigCredentials {
  customerId?: string
  conversionActionName?: string
  developerToken?: string
  clientId?: string
  clientSecret?: string
  refreshToken?: string
  enableEnhancedConversions?: boolean
}

export interface AdTrackingParams {
  gclid?: string | null
  wbraid?: string | null
  gbraid?: string | null
  fbclid?: string | null
  fbc?: string | null
  fbp?: string | null
  sourceUrl?: string | null
}
