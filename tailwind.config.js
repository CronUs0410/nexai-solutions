/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0e14",
        surface: "#13161f",
        card: "#1a1e2e",
        border: "#252a3d",
        primary: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
        },
        text: {
          DEFAULT: "#e2e8f0",
          muted: "#64748b",
        },
        green: {
          DEFAULT: "#22c55e",
        }
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        body: ['var(--font-lato)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
