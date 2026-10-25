import { formatGoogleAdsDateTime } from './google-ads'

export interface GoogleCsvExportRow {
  gclid: string
  conversionName: string
  conversionTime: Date | string
  conversionValue: number | string
  currency?: string
}

/**
 * Menghasilkan string CSV standar format resmi Google Ads Offline Conversion Upload.
 * Header baris 1: Parameters: Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency
 */
export function generateGoogleAdsConversionCsv(rows: GoogleCsvExportRow[]): string {
  const header =
    'Parameters: Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency'

  const lines = rows
    .filter((r) => Boolean(r.gclid))
    .map((r) => {
      const gclid = r.gclid.trim()
      const name = r.conversionName.trim()
      const time = formatGoogleAdsDateTime(r.conversionTime)
      const val = Number(r.conversionValue) || 0
      const curr = r.currency || 'IDR'
      return `${gclid},${name},${time},${val},${curr}`
    })

  return [header, ...lines].join('\n')
}
