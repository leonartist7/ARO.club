const fs = require('fs');

const colorsBlock = `      colors: {
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
      },`;

let tw = fs.readFileSync('tailwind.config.js', 'utf8');
const re = /colors:\s*\{[\s\S]*?\n      \},/;
if (!re.test(tw)) {
  console.error('colors block not found');
  process.exit(1);
}
tw = tw.replace(re, colorsBlock);
fs.writeFileSync('tailwind.config.js', tw);
console.log('tailwind ok', tw.includes('FF6B35'), !tw.includes('FDD835'));