/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{html,tsx}",],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#006f98',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'background-img': "url('./components/Assets/background.jpg')",
      },
      width: {
        '9/10': '90%',
      },
      ringColor: {
        DEFAULT: '#ffffff',
      },
    },
    variants: {
      extend: {
        ringColor: ['focus', 'hover'],
      },
    },
  },
  plugins: [],
}