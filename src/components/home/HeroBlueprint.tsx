'use client'

import React, { useState } from 'react'

type TabKey = 'web' | 'mobile' | 'ads'

export function HeroBlueprint() {
  const [activeTab, setActiveTab] = useState<TabKey>('web')

  return (
    <div className="blueprint-card" role="region" aria-label="Spesifikasi Arsitektur Sistem">
      {/* Window Title Bar */}
      <div className="blueprint-header">
        <div className="blueprint-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        <div className="blueprint-tabs">
          <button
            type="button"
            className={`blueprint-tab ${activeTab === 'web' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('web')}
          >
            <span className="tab-icon">⚡</span>
            <span>next16_payload3.ts</span>
          </button>
          <button
            type="button"
            className={`blueprint-tab ${activeTab === 'mobile' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('mobile')}
          >
            <span className="tab-icon">📱</span>
            <span>mobile_core.tsx</span>
          </button>
          <button
            type="button"
            className={`blueprint-tab ${activeTab === 'ads' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('ads')}
          >
            <span className="tab-icon">📈</span>
            <span>growth_ads.json</span>
          </button>
        </div>

        <div className="blueprint-status">
          <span className="status-live-dot" />
          <span>PRODUCTION-READY</span>
        </div>
      </div>

      {/* Code Body Content */}
      <div className="blueprint-body">
        {activeTab === 'web' && (
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
        )}

        {activeTab === 'mobile' && (
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
        )}

        {activeTab === 'ads' && (
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
        )}
      </div>

      {/* Execution Footer Bar */}
      <div className="blueprint-footer">
        <div className="footer-metric">
          <span className="metric-badge">200 OK</span>
          <span className="metric-desc">Next.js 16 SSR · Clean Drizzle Schemas · Zero WordPress Bloat</span>
        </div>
        <div className="footer-action">
          <span className="pulse-dot" />
          <span>Active Pipeline</span>
        </div>
      </div>
    </div>
  )
}
