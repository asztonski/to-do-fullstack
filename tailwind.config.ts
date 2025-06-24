import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./client/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#2a2139",
        pink: "#ff7edb",
        blue: "#6be4ff",
        yellow: "#f7f06d",
        purple: "#c792ea",
        green: "#29f8ac",
      },
      fontFamily: {
        synth: ['"Press Start 2P"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
