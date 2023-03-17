/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007def',
        secondary: '#4dd4c2',
      },
    },
  },
  plugins: [],
  colors: {},
};
