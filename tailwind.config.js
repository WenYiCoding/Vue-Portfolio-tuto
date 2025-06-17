/** @type {import('tailwindcss').Config} */
export default {
  content: ['.index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffe600',
        secondary: '#17bbab',
        ocean: '#1b2b53',
      },
    },
  },
  plugins: [],
}

