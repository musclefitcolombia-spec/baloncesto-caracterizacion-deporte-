/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#141210',
          900: '#1C1814',
          800: '#26201A',
          700: '#342B22',
          600: '#453A2F',
          400: '#6B5D4E',
        },
        court: {
          50: '#FBF4E7',
          100: '#F4E3C6',
          200: '#E9CB9C',
          300: '#DCAD6D',
          400: '#CE9349',
          500: '#B87A32',
          600: '#976127',
          700: '#794C20',
          800: '#5C3A1A',
        },
        accent: {
          50: '#FDEEE1',
          100: '#FBDCC0',
          300: '#F2A05C',
          500: '#E8720C',
          600: '#C8620A',
          700: '#A24E08',
        },
        paper: '#FAF5EC',
      },
      fontFamily: {
        display: ['"Oswald"', 'system-ui', 'sans-serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        jersey: ['"Bebas Neue"', '"Oswald"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.28em',
      },
      maxWidth: {
        content: '76rem',
      },
      boxShadow: {
        flat: '0 1px 0 0 rgba(20, 18, 16, 0.08)',
        card: '0 1px 2px 0 rgba(20, 18, 16, 0.06), 0 1px 0 0 rgba(20,18,16,0.08)',
      },
      backgroundImage: {
        'wood-grain':
          'repeating-linear-gradient(100deg, rgba(20,18,16,0.05) 0px, rgba(20,18,16,0.05) 1px, transparent 1px, transparent 42px)',
      },
    },
  },
  plugins: [],
}
