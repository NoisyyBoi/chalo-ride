/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#F43F5E",
        dark: "#1E293B",
        text: "#64748B",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      boxShadow: {
        custom: "0px 10px 30px rgba(99,102,241,0.15)",
      },
    },
  },

  plugins: [],
}