/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shopee: '#fb5533',
        shopeeText: '#ee4d2d'
      }
    }
  },
  plugins: []
}
