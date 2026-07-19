import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F14",
        surface: "#111820",
        elevated: "#17212B",
        signal: "#63E6BE",
        data: "#5B8CFF",
        evidence: "#F4B860",
      },
    },
  },
  plugins: [],
};

export default config;
