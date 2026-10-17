import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  // Apple Touch Icon: 180x180 px full-bleed background without border radius.
  // iOS automatically applies its own squircle corner mask.
  // Transparent outer corners would be converted to solid black by iOS.
  const svgSize = 104

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FF5C28 0%, #EA4510 100%)',
          borderRadius: 0,
        }}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M 16 82 L 16 18 L 36 18 L 50 56 L 64 18 L 84 18 L 84 82 L 68 82 L 68 38 L 56 68 L 44 68 L 32 38 L 32 82 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    },
  )
}
