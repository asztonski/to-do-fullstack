/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← make sure this path is right
  ],
  theme: {
    extend: {
      colors: {
        background: "#2a2139",
        pink: "#ff7edb",
        blue: "#6be4ff",
        yellow: "#f7f06d",
        purple: "#c792ea",
        green: "#29f8ac",
        white: "#ffffff",
      },
      fontFamily: {
        synth: ['"Press Start 2P"', "monospace"],
      },
    },
  },
  plugins: [],
};
