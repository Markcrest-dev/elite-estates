/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#c9a84c',
        'gold-light': '#e8c96a',
        estate: {
          dark: '#0d0d0d',
          cream: '#f9f6f1',
          muted: '#999999',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
