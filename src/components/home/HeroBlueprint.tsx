'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

type CodeLine = { text: string; kind?: 'comment' | 'keyword' | 'string' | 'number' | 'boolean' | 'plain' }

function Line({ line }: { line: CodeLine }) {
  const cls =
    line.kind === 'comment'
      ? 'c-comment'
      : line.kind === 'keyword'
        ? 'c-keyword'
        : line.kind === 'string'
          ? 'c-string'
          : line.kind === 'number'
            ? 'c-number'
            : line.kind === 'boolean'
              ? 'c-boolean'
              : ''
  return (
    <span className="code-line">
      {line.kind ? <span className={cls}>{line.text}</span> : line.text}
    </span>
  )
}

function CodeBlock({ lines }: { lines: CodeLine[] }) {
  return (
    <pre className="code-content">
      <code>
        {lines.map((line, i) => (
          <Line key={i} line={line} />
        ))}
      </code>
    </pre>
  )
}

const WEB_LINES: CodeLine[] = [
  { text: '// MarketingCode ID — Custom Web Architecture', kind: 'comment' },
  { text: "import { drizzle } from 'drizzle-orm'", kind: 'plain' },
  { text: "import { supabaseStorage } from '@supabase/supabase-js'", kind: 'plain' },
  { text: '' },
  { text: 'export default defineAgencyProject({', kind: 'plain' },
  { text: "  framework: 'Next.js 16 (App Router + Turbopack)',", kind: 'plain' },
  { text: "  dashboard: 'Custom Admin UI (Fullstack Next.js)',", kind: 'plain' },
  { text: "  database: 'Supabase Managed PostgreSQL',", kind: 'plain' },
  { text: '  speedScore: 99,', kind: 'plain' },
  { text: '  /* Google PageSpeed Guaranteed */', kind: 'comment' },
  { text: "  codeOwnership: '100% Full Source Code Handover',", kind: 'plain' },
  { text: '  seoReady: true,', kind: 'plain' },
  { text: "  directSupport: 'WhatsApp Direct to Lead Dev'", kind: 'plain' },
  { text: '})', kind: 'plain' },
]

const MOBILE_LINES: CodeLine[] = [
  { text: '// Cross-Platform iOS & Android Application', kind: 'comment' },
  { text: 'interface MobileAppConfig {', kind: 'plain' },
  { text: "  platform: 'iOS (App Store) & Android (Play Store)',", kind: 'plain' },
  { text: "  performance: '60 FPS Native Smooth Animation',", kind: 'plain' },
  { text: '  offlineFirst: true,', kind: 'plain' },
  { text: "  pushNotifications: 'Firebase Cloud Messaging',", kind: 'plain' },
  { text: "  security: 'Biometric & Encrypted Storage',", kind: 'plain' },
  { text: "  backendIntegration: 'Direct Supabase REST / GraphQL'", kind: 'plain' },
  { text: '}', kind: 'plain' },
]

const ADS_LINES: CodeLine[] = [
  { text: '// High-Converting Digital Marketing Engine', kind: 'comment' },
  { text: '{', kind: 'plain' },
  { text: '  "channels": ["Meta Ads (FB/IG)", "Google Search & Display"],', kind: 'plain' },
  { text: '  "funnel": "High-Intent Click → Fast Landing → WhatsApp Lead",', kind: 'plain' },
  { text: '  "tracking": ["Meta CAPI (Server-Side)", "Google GA4"],', kind: 'plain' },
  { text: '  "targetMetric": "Lowest Cost-Per-Qualified-Lead (CPL)",', kind: 'plain' },
  { text: '  "transparency": "Client Holds 100% Ads Account Access"', kind: 'plain' },
  { text: '}', kind: 'plain' },
]

export function HeroBlueprint() {
  return (
    <div className="blueprint-card" role="region" aria-label="Spesifikasi Arsitektur Sistem">
      <Tabs defaultValue="web" className="w-full">
        {/* Window Title Bar */}
        <div className="blueprint-header">
          <div className="blueprint-dots" aria-hidden="true">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <TabsList className="bg-transparent h-auto p-0 gap-1 border-0">
            <TabsTrigger
              value="web"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#60a5fa] text-xs font-mono text-gray-400 py-1 px-2.5 rounded border border-transparent data-[state=active]:border-gray-700 transition-all"
            >
              <span className="mr-1.5 text-xs">⚡</span>
              <span>next16_dashboard.ts</span>
            </TabsTrigger>
            <TabsTrigger
              value="mobile"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#60a5fa] text-xs font-mono text-gray-400 py-1 px-2.5 rounded border border-transparent data-[state=active]:border-gray-700 transition-all"
            >
              <span className="mr-1.5 text-xs">📱</span>
              <span>mobile_core.tsx</span>
            </TabsTrigger>
            <TabsTrigger
              value="ads"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#60a5fa] text-xs font-mono text-gray-400 py-1 px-2.5 rounded border border-transparent data-[state=active]:border-gray-700 transition-all"
            >
              <span className="mr-1.5 text-xs">📈</span>
              <span>growth_ads.json</span>
            </TabsTrigger>
          </TabsList>

          <div className="blueprint-status">
            <span className="status-live-dot" />
            <span className="hidden sm:inline">PRODUCTION-READY</span>
          </div>
        </div>

        {/* Code Body Content */}
        <div className="blueprint-body">
          <TabsContent value="web" className="m-0 focus-visible:outline-none">
            <CodeBlock lines={WEB_LINES} />
          </TabsContent>

          <TabsContent value="mobile" className="m-0 focus-visible:outline-none">
            <CodeBlock lines={MOBILE_LINES} />
          </TabsContent>

          <TabsContent value="ads" className="m-0 focus-visible:outline-none">
            <CodeBlock lines={ADS_LINES} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
