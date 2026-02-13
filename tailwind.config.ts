import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#06070b",
      },
      boxShadow: {
        neon: "0 0 40px rgba(85,255,229,.14)",
      },
    },
  },
  plugins: [],
};

export default config;

