/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta "Wrapped": preto profundo + verde neon
        ink: "#060807",
        coal: "#0D1210",
        card: "#111814",
        neon: "#1DF27D",
        neonDim: "#0FA957",
        rose: "#FF6FA5",
        gold: "#FFD166",
      },
      fontFamily: {
        display: ["Unbounded", "system-ui", "sans-serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 24px rgba(29,242,125,0.35)",
        card: "0 10px 40px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
