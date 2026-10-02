'use client'

import React, { useState } from 'react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div 
      className="floating-wa-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`floating-wa-tooltip ${showTooltip ? 'is-visible' : ''}`}>
        <div className="tooltip-title">Konsultasi Langsung</div>
        <div className="tooltip-sub">Chat langsung dengan Lead Developer</div>
      </div>

      <a
        href={getWhatsAppUrl('general')}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        aria-label="Konsultasi WhatsApp via Lead Developer"
      >
        <span className="wa-status-dot" aria-hidden="true" />
        <svg
          className="wa-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.35.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2 22l4.981-1.309A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.636 0-3.155-.472-4.444-1.286l-.318-.2-2.962.777.791-2.888-.207-.33A8.127 8.127 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
        </svg>
        <span className="wa-text">Konsultasi</span>
      </a>
    </div>
  )
}
