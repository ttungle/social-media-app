/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007def',
        secondary: '#4dd4c2',
      },
      boxShadow: {
        DEFAULT: '0 1px 2px 0px rgba(0, 0, 0, 0.2)',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
  colors: {},
};
