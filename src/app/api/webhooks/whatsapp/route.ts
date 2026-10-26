import { NextResponse } from 'next/server'
import { extractRefCodeFromMessage } from '@/lib/tracking/whatsapp-parser'
import { matchAndLinkIncomingLead } from '@/lib/tracking/session-updater'

export async function POST(req: Request) {
  try {
    // Verifikasi token rahasia webhook jika dikonfigurasi di environment
    const webhookSecret = process.env.WHATSAPP_WEBHOOK_SECRET
    if (webhookSecret) {
      const headerSecret = req.headers.get('x-webhook-secret')
      const url = new URL(req.url)
      const querySecret = url.searchParams.get('secret')

      if (headerSecret !== webhookSecret && querySecret !== webhookSecret) {
        return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 })
      }
    }

    const body = await req.json().catch(() => ({}))

    // Ekstraksi pesan dan nomor pengirim dari berbagai format payload gateway (WAHA, Baileys, dsb.)
    let messageText = ''
    let senderPhone = ''
    let isFromMe = false

    // Format WAHA (WhatsApp HTTP API)
    if (body.event === 'message' && body.payload) {
      messageText = body.payload.body || ''
      senderPhone = body.payload.from || ''
      isFromMe = Boolean(body.payload.fromMe)
    }
    // Format Baileys / Standard Webhook
    else if (body.messages && Array.isArray(body.messages) && body.messages[0]) {
      const msg = body.messages[0]
      messageText = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ''
      senderPhone = msg.key?.remoteJid || ''
      isFromMe = Boolean(msg.key?.fromMe)
    }
    // Format Generic Payload
    else {
      messageText = body.message || body.body || body.text || ''
      senderPhone = body.phone || body.from || body.sender || ''
      isFromMe = Boolean(body.fromMe)
    }

    // Abaikan jika pesan berasal dari nomor CS sendiri (outbound) untuk mencegah rekursi
    if (isFromMe) {
      return NextResponse.json({ status: 'ignored', reason: 'outbound_message' })
    }

    // Ekstraksi kode referensi (#MC-XXXX) dari teks pesan
    const refCode = extractRefCodeFromMessage(messageText)
    if (!refCode || !senderPhone) {
      return NextResponse.json({
        status: 'received',
        matched: false,
        reason: 'no_ref_code_or_phone',
      })
    }

    // Cocokkan ke database dan perbarui status sesi iklan
    const matchResult = await matchAndLinkIncomingLead(refCode, senderPhone)

    return NextResponse.json({
      status: 'success',
      matched: matchResult.matched,
      refCode: matchResult.refCode,
      phone: matchResult.phoneNumber,
    })
  } catch (error) {
    console.error('[webhooks/whatsapp] Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Internal server error processing webhook' },
      { status: 500 }
    )
  }
}
