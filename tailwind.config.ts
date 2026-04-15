/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDFAF4",
        ink: "#0D0D0D",
        border: "#111111",
        "accent-red": "#B91C1C",
        "accent-gold": "#B8860B",
        muted: "#444444",
      },
      fontFamily: {
        gothic: ["var(--font-gothic)", "serif"],
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "repeating-linear-gradient(0deg, transparent, transparent 39px, #11111110 39px, #11111110 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #11111110 39px, #11111110 40px)",
      },
    },
  },
  plugins: [],
};
