/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ahmi: {
          bg: 'var(--color-bg)',
          accent: 'var(--color-accent)',

          primary: 'var(--color-primary)',
          'primary-title': 'var(--color-primary-title)',

          secondary: 'var(--color-secondary)',
          'secondary-muted': 'var(--color-secondary-muted)',

          text: {
            default: '#1B3A4B',
            primary: 'var(--text-primary)',
            secondary: 'var(--text-secondary)',
            brand: 'var(--text-brand)',
            invert: 'var(--text-invert)',
          },

          surface: {
            primary: 'var(--surface-primary)',
            secondary: 'var(--surface-secondary)',
            invert: 'var(--surface-invert)',
            brand: 'var(--surface-brand)',
          },

          border: {
            primary: 'var(--border-primary)',
          },

          support: '#48C9B0',
          action: '#F5B041',
          'base-100': '#FFFFFF',

          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
          montserratAlt: ['Montserrat Alternates', 'sans-serif'],
          openSans: ['Open Sans', 'sans-serif'],
          arial: ['Arial', 'sans-serif'],
        },
        fontSize: {
          h1: ['40px', { lineHeight: '48px' }],
          h2: ['28px', { lineHeight: '33.6px' }],
          h3: ['19px', { lineHeight: '22.8px' }],
          body: ['16px', { lineHeight: '19.2px' }],
          caption: ['13px', { lineHeight: '15.6px' }],
        },
        fontWeight: {
          thin: '300',
          normal: '400',
          bold: '700',
        },
        spacing: {
          xs: 'var(--spacing-xs)',
          sm: 'var(--spacing-sm)',
          md: 'var(--spacing-md)',
          lg: 'var(--spacing-lg)',
          xl: 'var(--spacing-xl)',
          '2xl': 'var(--spacing-2xl)',
        },
        borderRadius: {
          minimal: 'var(--radius-minimal)',
          rounded: 'var(--radius-rounded)',
          full: 'var(--radius-full)',
          xl: '1.5rem',
          '2xl': '2rem',
        },
      },
    },
    plugins: [],
  },
}
