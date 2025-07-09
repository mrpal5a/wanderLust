/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",   // Scan all your ejs files
    "./public/**/*.html", // Scan any HTML in public (if any)
  ],
  darkMode: 'class', // ✅ enables dark mode via class
  theme: {
    extend: {},
  },
  plugins: [
  require("tailwindcss-animate"),
],
};
