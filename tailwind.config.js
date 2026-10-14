/** @type {import('tailwindcss').Config} */
// Palette sampled from the Mawathiq Al-Namaa flyer.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: { DEFAULT: '#5A4641', dark: '#3A2D29', deep: '#2A201D', soft: '#7A6560' },
        sand: { DEFAULT: '#C6AE96', light: '#D9C8B8', dark: '#A98F76' },
        linen: { DEFAULT: '#EADDD5', light: '#F6EFE9' },
        slate: { DEFAULT: '#5E5E62', light: '#8A8A8E' },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        display: ['Marcellus', 'Amiri', 'serif'],
      },
      maxWidth: { site: '1280px' },
    },
  },
  plugins: [],
}
