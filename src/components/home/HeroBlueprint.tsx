'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

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
              <span>next16_payload3.ts</span>
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
            <pre className="code-content">
              <code>
                <span className="code-line"><span className="c-comment">// MarketingCode ID — Custom Web Architecture</span></span>
                <span className="code-line"><span className="c-keyword">import</span> {'{'} buildConfig {'}'} <span className="c-keyword">from</span> <span className="c-string">'payload'</span></span>
                <span className="code-line"><span className="c-keyword">import</span> {'{'} postgresAdapter {'}'} <span className="c-keyword">from</span> <span className="c-string">'@payloadcms/db-postgres'</span></span>
                <span className="code-line"></span>
                <span className="code-line"><span className="c-keyword">export default</span> <span className="c-func">defineAgencyProject</span>({'{'}</span>
                <span className="code-line">  framework: <span className="c-string">'Next.js 16 (App Router + Turbopack)'</span>,</span>
                <span className="code-line">  cms: <span className="c-string">'Payload CMS 3.x (Native Embedded)'</span>,</span>
                <span className="code-line">  database: <span className="c-string">'Supabase Managed PostgreSQL'</span>,</span>
                <span className="code-line">  speedScore: <span className="c-number">99</span>, <span className="c-comment">/* Google PageSpeed Guaranteed */</span></span>
                <span className="code-line">  codeOwnership: <span className="c-string">'100% Full Source Code Handover'</span>,</span>
                <span className="code-line">  seoReady: <span className="c-boolean">true</span>,</span>
                <span className="code-line">  directSupport: <span className="c-string">'WhatsApp Direct to Lead Dev'</span></span>
                <span className="code-line">{'}'})</span>
              </code>
            </pre>
          </TabsContent>

          <TabsContent value="mobile" className="m-0 focus-visible:outline-none">
            <pre className="code-content">
              <code>
                <span className="code-line"><span className="c-comment">// Cross-Platform iOS & Android Application</span></span>
                <span className="code-line"><span className="c-keyword">interface</span> <span className="c-type">MobileAppConfig</span> {'{'}</span>
                <span className="code-line">  platform: <span className="c-string">'iOS (App Store) & Android (Play Store)'</span>,</span>
                <span className="code-line">  performance: <span className="c-string">'60 FPS Native Smooth Animation'</span>,</span>
                <span className="code-line">  offlineFirst: <span className="c-boolean">true</span>,</span>
                <span className="code-line">  pushNotifications: <span className="c-string">'Firebase Cloud Messaging'</span>,</span>
                <span className="code-line">  security: <span className="c-string">'Biometric & Encrypted Storage'</span>,</span>
                <span className="code-line">  backendIntegration: <span className="c-string">'Direct Supabase REST / GraphQL'</span></span>
                <span className="code-line">{'}'}</span>
              </code>
            </pre>
          </TabsContent>

          <TabsContent value="ads" className="m-0 focus-visible:outline-none">
            <pre className="code-content">
              <code>
                <span className="code-line"><span className="c-comment">// High-Converting Digital Marketing Engine</span></span>
                <span className="code-line">{'{'}</span>
                <span className="code-line">  <span className="c-prop">"channels"</span>: [<span className="c-string">"Meta Ads (FB/IG)"</span>, <span className="c-string">"Google Search & Display"</span>],</span>
                <span className="code-line">  <span className="c-prop">"funnel"</span>: <span className="c-string">"High-Intent Click → Fast Landing → WhatsApp Lead"</span>,</span>
                <span className="code-line">  <span className="c-prop">"tracking"</span>: [<span className="c-string">"Meta CAPI (Server-Side)"</span>, <span className="c-string">"Google GA4"</span>],</span>
                <span className="code-line">  <span className="c-prop">"targetMetric"</span>: <span className="c-string">"Lowest Cost-Per-Qualified-Lead (CPL)"</span>,</span>
                <span className="code-line">  <span className="c-prop">"transparency"</span>: <span className="c-string">"Client Holds 100% Ads Account Access"</span></span>
                <span className="code-line">{'}'}</span>
              </code>
            </pre>
          </TabsContent>
        </div>

        {/* Execution Footer Bar */}
        <div className="blueprint-footer">
          <div className="footer-metric">
            <Badge variant="outline" className="bg-emerald-950/40 text-emerald-400 border-emerald-500/40 text-[11px] font-mono font-normal">
              200 OK
            </Badge>
            <span className="metric-desc text-xs">Next.js 16 SSR · Clean Drizzle Schemas · Zero WordPress Bloat</span>
          </div>
          <div className="footer-action">
            <span className="pulse-dot" />
            <span className="text-xs">Active Pipeline</span>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
