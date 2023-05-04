/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins': ['Poppins'],
      },
      colors:{
        "theme": "#f59e0b",
      },
      screens:{
        "xxs": '450px',
        "2md": '850px'
      },
    },
  },
  plugins: [],
}