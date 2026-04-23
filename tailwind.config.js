/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'rose-blush': '#fdf2f8',
        'rose-mist': '#fff1f2',
        'ink-soft': '#44403c',
      },
      fontFamily: {
        sans: ['Aptos', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif-display': ['Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
