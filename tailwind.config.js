/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: '#F6F0E6',
        ink: '#282420',
        moss: '#68735A',
        clay: '#B86D4B',
        sky: '#7699A8',
        plum: '#302331',
        // PRIMARY — ARO Vermilion / Living Red
        primary: {
          50: '#FFF1EB',
          100: '#FFDED1',
          200: '#FFBBA5',
          300: '#FF8F70',
          400: '#F45F3B',
          500: '#DE4325',
          600: '#BE3219',
          700: '#992716',
          800: '#7D2319',
          900: '#671F19',
        },
        // SECONDARY — Saffron / warm signal
        secondary: {
          50: '#FFF8E6',
          100: '#FCECC2',
          200: '#F7D982',
          300: '#EFC14B',
          400: '#DFA326',
          500: '#C98A17',
          600: '#A66B12',
          700: '#815015',
          800: '#693F18',
          900: '#57351A',
        },
        
        // ACCENT — Gold for gamification only
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        success: { 50: '#ECFDF3', 500: '#16A34A', 700: '#15803D' },
        warning: { 50: '#FFFBEB', 500: '#F59E0B', 700: '#B45309' },
        danger: { 50: '#FEF2F2', 500: '#EF4444', 700: '#B91C1C' },
        info: { 50: '#EFF6FF', 500: '#3B82F6', 700: '#1D4ED8' },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.2s ease-in',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
