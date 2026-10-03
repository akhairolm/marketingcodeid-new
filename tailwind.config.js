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
  			ring: '#FF5C28',
  			background: '#FBFBFB',
  			foreground: '#18181B',
  			brand: {
  				50: '#FFF5F0',
  				100: '#FFE9DE',
  				200: '#FFD3BE',
  				300: '#FFAD8E',
  				400: '#FF8452',
  				500: '#FF5C28', // Warna aksen orange persis referensi
  				600: '#EA4510',
  				700: '#C23205',
  				dark: '#121214',
  			},
  			primary: {
  				DEFAULT: '#FF5C28',
  				foreground: '#ffffff'
  			},
  			secondary: {
  				DEFAULT: '#F4F4F5',
  				foreground: '#18181B'
  			},
  			muted: {
  				DEFAULT: '#F4F4F5',
  				foreground: '#71717A'
  			},
  			accent: {
  				DEFAULT: '#FFF5F0',
  				foreground: '#FF5C28'
  			},
  			card: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#18181B'
  			}
  		},
  		boxShadow: {
  			'soft': '0 10px 40px -10px rgba(0,0,0,0.06)',
  			'glow': '0 12px 30px -5px rgba(255, 92, 40, 0.25)',
  			'card': '0 4px 24px -2px rgba(16, 24, 40, 0.05)',
  		},
  		borderRadius: {
  			'3xl': '1.5rem',
  			'2xl': '1rem',
  			'xl': '0.75rem',
  			lg: '0.625rem',
  			md: '0.5rem',
  			sm: '0.375rem'
  		},
  		fontFamily: {
  			sans: ['var(--font-sans)', '"Plus Jakarta Sans"', 'sans-serif'],
  			mono: ['var(--font-mono)', 'monospace'],
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
