import { ImageResponse } from 'next/og'

export function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 48, height: 48 },
      id: '48',
    },
    {
      contentType: 'image/png',
      size: { width: 96, height: 96 },
      id: '96',
    },
    {
      contentType: 'image/png',
      size: { width: 192, height: 192 },
      id: '192',
    },
    {
      contentType: 'image/png',
      size: { width: 512, height: 512 },
      id: '512',
    },
  ]
}

const SIZE_MAP: Record<string, number> = {
  '48': 48,
  '96': 96,
  '192': 192,
  '512': 512,
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const resolvedId = await id
  const dim = SIZE_MAP[resolvedId] ?? 48
  const cornerRadius = Math.round(dim * 0.22)
  const svgSize = Math.round(dim * 0.62)

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
          borderRadius: `${cornerRadius}px`,
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
      width: dim,
      height: dim,
    },
  )
}
