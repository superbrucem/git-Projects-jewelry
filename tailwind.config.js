module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./views/**/*.ejs",
    "./controllers/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffcccc', // Light red color
        'secondary': '#333333',
        'accent': '#f8f8f8',
      },
    },
  },
  plugins: [],
}