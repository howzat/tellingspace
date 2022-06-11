const defaultTheme = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/assets/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
    './src/index.tsx',
  ],
  theme: {
    fontFamily: {
      sans: ['Open\\ Sans', 'Graphik', 'sans-serif'],
      serif: ['Playfair', 'Cambria', 'Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
