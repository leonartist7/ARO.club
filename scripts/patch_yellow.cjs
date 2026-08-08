const fs = require('fs');
let tw = fs.readFileSync('tailwind.config.js', 'utf8');
const colorsBlock = `      colors: {
        // PRIMARY — Warm yellow (brand CTAs). Use 600/700 for fills w/ white text.
        primary: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F5C518',
          500: '#EAB308', // brand yellow
          600: '#CA8A04', // interactive fill + white text
          700: '#A16207', // text-on-white safe
          800: '#854D0E',
          900: '#713F12',
        },
        // SECONDARY — Soft amber (supporting, not a teal gradient partner)
        secondary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // ACCENT — Soft gold (gamification only)
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
      },`;
tw = tw.replace(/colors:\s*\{[\s\S]*?\n      \},/, colorsBlock);
fs.writeFileSync('tailwind.config.js', tw);
console.log('tokens', tw.includes('EAB308'), !tw.includes('FF6B35'));
