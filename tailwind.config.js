/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        iconGrey: "#4D4D4D",
        iconLight: "#B5B5B5",
        dashboard: {
          primary: "#00A3E9",
          secondary: "#625B71",
          card: "#F2F2F2",
        },
        form: {
          border: "#EEEEEE",
          input: "#D3D3D3",
          foreground: "#333333",
          primary: "#4A8394",
          "primary-foreground": "#FFFFFF",
          muted: "#E5E7E9",
          "muted-foreground": "#9E9E9E",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "serif"],
        roboto: ["Roboto", "serif"],
        inter: ["Inter", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
