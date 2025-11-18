/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFBEA',   // Very light yellow
          100: '#FFF3C4',  // Light yellow
          200: '#FFE680',  // Lighter yellow
          300: '#FFD93D',  // Medium yellow
          400: '#FFC107',  // Bright yellow
          500: '#FFB300',  // Main vibrant yellow (brand color)
          600: '#F59E00',  // Golden yellow
          700: '#CC8400',  // Deep gold
          800: '#A36A00',  // Bronze
          900: '#7A5000',  // Dark bronze
        },
        secondary: {
          50: '#FFF4ED',   // Very light orange
          100: '#FFE4D1',  // Light peach
          200: '#FFC499',  // Light orange
          300: '#FFA366',  // Medium orange
          400: '#FF8333',  // Bright orange
          500: '#FF6600',  // Main vibrant orange (for gradients)
          600: '#E65C00',  // Deep orange
          700: '#CC5200',  // Dark orange
          800: '#993D00',  // Very dark orange
          900: '#662900',  // Almost brown
        },
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
      },
    },
  },
  plugins: [],
}
