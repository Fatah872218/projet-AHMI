/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E4053',
        secondary: '#D35400',
        accent: '#5DADE2',
        support: '#48C9B0',
        action: '#F5B041',
        'base-100': '#FFFFFF',
        text: '#1B3A4B',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        title: ['Lato', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.5rem',
        '2xl': '2rem',
      },
    },
  },
  plugins: [],
}
