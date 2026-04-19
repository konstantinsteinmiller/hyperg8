/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dae6ff',
          200: '#bdd0ff',
          300: '#92b1ff',
          400: '#5e83ff',
          500: '#3a59ff',
          600: '#2a3df0',
          700: '#1f2dc7',
          800: '#1d2a9b',
          900: '#1a247a',
        },
        accent: {
          400: '#ff7ad9',
          500: '#ff48c6',
          600: '#e02faa',
        },
        ink: {
          900: '#070815',
          800: '#0d1024',
          700: '#141a35',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(94,131,255,0.55)',
        glowPink: '0 0 60px -10px rgba(255,72,198,0.55)',
        card: '0 30px 80px -20px rgba(0,0,0,0.6)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        gradient: 'gradientShift 14s ease infinite',
        fadeUp: 'fadeUp 0.8s ease-out both',
        shine: 'shine 1.6s ease-in-out',
      },
    },
  },
  plugins: [],
}
