/**
 * Menghitung laba bersih dan persentase margin keuntungan
 */
export function calculateProfitAndMargin(
  sellingPrice: number,
  totalHpp: number
): { netProfit: number; profitMargin: number } {
  const netProfit = Math.round(sellingPrice - totalHpp)
  const profitMargin =
    sellingPrice > 0
      ? Number(((netProfit / sellingPrice) * 100).toFixed(2))
      : 0

  return { netProfit, profitMargin }
}

/**
 * Menghasilkan nomor order unik berformat ORD-YYYYMM-XXX
 */
export function generateOrderNumber(date: Date = new Date(), sequence?: number): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const seqPart =
    typeof sequence === 'number'
      ? String(sequence).padStart(3, '0')
      : String(Math.floor(100 + Math.random() * 900))

  return `ORD-${year}${month}-${seqPart}`
}

/**
 * Memformat angka nominal menjadi mata uang Rupiah standar
 * Contoh: 1190000 -> "Rp 1.190.000"
 * Contoh negatif: -50000 -> "-Rp 50.000"
 */
export function formatRupiah(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'Rp 0'
  }

  const isNegative = amount < 0
  const absoluteValue = Math.abs(Math.round(amount))
  const formatted = new Intl.NumberFormat('id-ID').format(absoluteValue)

  return isNegative ? `-Rp ${formatted}` : `Rp ${formatted}`
}

/**
 * Memformat persentase margin
 * Contoh: 67.5 -> "67.5%"
 */
export function formatPercent(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return '0%'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0%'
  return `${num.toFixed(1)}%`
}
