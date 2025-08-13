/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "discovery-gold": "#b8860b",
        "discovery-blue": "#1e3a8a",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      borderRadius: {
        custom: "0.5rem",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "gradient-discovery":
          "linear-gradient(135deg, #b8860b 0%, #1e3a8a 100%)",
        "gradient-discovery-reverse":
          "linear-gradient(135deg, #1e3a8a 0%, #b8860b 100%)",
      },
      boxShadow: {
        discovery: "0 4px 14px 0 rgba(184, 134, 11, 0.15)",
        "discovery-lg": "0 10px 25px 0 rgba(184, 134, 11, 0.25)",
      },
    },
  },
  plugins: [],
};
