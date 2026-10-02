/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			border: 'var(--color-rule)',
  			input: 'var(--color-rule)',
  			ring: 'var(--color-accent)',
  			background: 'var(--color-paper)',
  			foreground: 'var(--color-ink)',
  			primary: {
  				DEFAULT: 'var(--color-accent)',
  				foreground: '#ffffff'
  			},
  			secondary: {
  				DEFAULT: 'var(--color-paper-subtle)',
  				foreground: 'var(--color-ink)'
  			},
  			muted: {
  				DEFAULT: 'var(--color-paper-subtle)',
  				foreground: 'var(--color-ink-muted)'
  			},
  			accent: {
  				DEFAULT: 'var(--color-accent-subtle)',
  				foreground: 'var(--color-accent)'
  			},
  			card: {
  				DEFAULT: 'var(--color-paper-card)',
  				foreground: 'var(--color-ink)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius-card)',
  			md: 'var(--radius-btn)',
  			sm: 'calc(var(--radius-btn) - 2px)'
  		},
  		fontFamily: {
  			display: [
  				'var(--font-display)',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-body)',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-mono)',
  				'monospace'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
}
