/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        ink: '#0f0e0d',
        paper: '#f5f0e8',
        accent: '#e8521a',
        accent2: '#2563b4',
        gold: '#c9973a',
        muted: '#7a7468',
        card: '#faf6ee',
        border: '#d8d0c0',
      }
    },
  },
  plugins: [],
}
