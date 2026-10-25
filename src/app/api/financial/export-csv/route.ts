import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/db'
import { orders } from '@/db/schema'
import { getSessionUser } from '@/lib/auth'

function escapeCsv(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""'
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return `"${str}"`
}

export async function GET() {
  const user = await getSessionUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const rows = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.orderDate))

    const headers = [
      'No Order',
      'Tanggal',
      'Nama Klien',
      'Nomor WhatsApp',
      'Nama Usaha',
      'Kategori',
      'Paket Layanan',
      'Harga Jual (IDR)',
      'Total HPP (IDR)',
      'Laba Bersih (IDR)',
      'Margin (%)',
      'Status Pembayaran',
      'Nominal Terbayar (IDR)',
      'Status Pengerjaan',
      'Catatan',
    ]

    const csvLines = [headers.join(',')]

    for (const r of rows) {
      const dateStr = r.orderDate
        ? new Date(r.orderDate).toISOString().split('T')[0]
        : ''

      const line = [
        escapeCsv(r.orderNumber),
        escapeCsv(dateStr),
        escapeCsv(r.clientName),
        escapeCsv(r.clientPhone),
        escapeCsv(r.clientCompany || '-'),
        escapeCsv(r.serviceCategory),
        escapeCsv(r.packageName),
        escapeCsv(r.sellingPrice),
        escapeCsv(r.totalHpp),
        escapeCsv(r.netProfit),
        escapeCsv(r.profitMargin),
        escapeCsv(r.paymentStatus),
        escapeCsv(r.paidAmount),
        escapeCsv(r.projectStatus),
        escapeCsv(r.notes || ''),
      ]
      csvLines.push(line.join(','))
    }

    const csvContent = csvLines.join('\r\n')
    const dateStr = new Date().toISOString().split('T')[0]

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="laporan-keuangan-marketingcode-${dateStr}.csv"`,
      },
    })
  } catch (error) {
    console.error('[financial-export-csv] Failed to export financial CSV:', error)
    return NextResponse.json({ error: 'Gagal membuat file ekspor CSV' }, { status: 500 })
  }
}
