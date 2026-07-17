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
        // PRIMARY — Coral (CTAs, brand). Use 600/700 for fills w/ white text (AA).
        primary: {
          50: '#FFF3EE',
          100: '#FFE2D6',
          200: '#FFC4AD',
          300: '#FF9E78',
          400: '#FF8453',
          500: '#FF6B35', // brand reference (logo, large surfaces >=24px)
          600: '#F25A22', // interactive fill + white bold text (AA-large)
          700: '#CC4517', // text-on-white safe / small buttons
          800: '#A2360F',
          900: '#7A2810',
        },
        // SECONDARY — Teal (trust, links, secondary actions)
        secondary: {
          50: '#E9FBF9',
          100: '#C7F4F0',
          200: '#94E9E2',
          300: '#5BD8CF',
          400: '#2FC3B9',
          500: '#20B2AA', // brand reference
          600: '#199089', // interactive fill w/ white text
          700: '#15726D', // text-on-white safe
          800: '#115A56',
          900: '#0D4744',
        },
        // ACCENT — Sunny gold (GAMIFICATION ONLY)
        accent: {
          50: '#FFF8E6',
          100: '#FFEDBF',
          200: '#FFDD85',
          300: '#FFCB47',
          400: '#FFBC24',
          500: '#FFB020', // gamification highlight
          600: '#E0930C',
          700: '#B87100', // text-on-white safe
          800: '#8F5700',
          900: '#6B4100',
        },
        // SEMANTIC
        success: { 50: '#ECFDF3', 500: '#16A34A', 700: '#15803D' },
        warning: { 50: '#FFFBEB', 500: '#F59E0B', 700: '#B45309' },
        danger: { 50: '#FEF2F2', 500: '#EF4444', 700: '#B91C1C' },
        info: { 50: '#EFF6FF', 500: '#3B82F6', 700: '#1D4ED8' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
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
