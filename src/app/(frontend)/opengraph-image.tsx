import { ImageResponse } from 'next/og'

export const alt = 'MarketingCode.ID — Software House & Digital Agency Kalimantan Selatan'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0F0F12',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #26262B 2%, transparent 0%), radial-gradient(circle at 75px 75px, #18181C 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '70px 80px',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,92,40,0.25) 0%, rgba(255,92,40,0) 70%)',
          }}
        />

        {/* Top Header / Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#FF5C28',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 900,
                color: 'white',
              }}
            >
              M
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em' }}>
              MarketingCode<span style={{ color: '#FF5C28' }}>.ID</span>
            </div>
          </div>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: '#1E1E24',
              border: '1px solid #2E2E38',
              fontSize: '15px',
              fontWeight: 600,
              color: '#FF885C',
            }}
          >
            Kandangan, Kalimantan Selatan
          </div>
        </div>

        {/* Center Title & Value Proposition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '980px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            Solusi Website, Mobile App &amp; Digital Marketing Performa Tinggi
          </div>
          <div
            style={{
              fontSize: '22px',
              lineHeight: 1.5,
              color: '#A1A1AA',
            }}
          >
            Digital agency &amp; software house partner transformasi bisnis dan instansi di Kalimantan Selatan.
          </div>
        </div>

        {/* Bottom Highlights */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            borderTop: '1px solid #27272A',
            paddingTop: '28px',
            fontSize: '16px',
            color: '#D4D4D8',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#FF5C28' }}>●</span> Jasa Pembuatan Website &amp; Sistem Informasi
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#FF5C28' }}>●</span> Aplikasi Mobile Android &amp; iOS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#FF5C28' }}>●</span> Meta Ads &amp; Performance Marketing
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
