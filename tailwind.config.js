/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-open-sans)",
      customBold: "var(--font-open-sans)",
      customRegular: "var(--font-open-sans)",
      customFond: "var(--font-quicksand)",
      customMedium: "var(--font-open-sans)",
      contentFont: "var(--font-custom)",
    },
    extend: {
      keyframes: {
        pulseScale: {
          "0%, 100%": {
            transform: "scale(0.8)",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          },
          "50%": {
            transform: "scale(1)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 1)",
          },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        draw: {
          "0%": { strokeDasharray: "0 400", strokeDashoffset: "0" },
          "50%": { strokeDasharray: "400 0", strokeDashoffset: "0" },
          "100%": { strokeDasharray: "0 400", strokeDashoffset: "400" },
        },
        intro: {
          "0%": { 
            opacity: "0",
            transform: "translateY(10px) translateX(-10px)", 
          },
          "100%": { 
            opacity : "1",
            transform: "translateY(0) translateX(0)", 
          }
        }
      },
      animation: {
        pulseScale: "pulseScale 3s ease-in-out infinite",
        "fade-in-right": "fadeInRight 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        draw: "draw 4s infinite ease-in-out",
        intro: "intro 0.1s linear",
      },
      transitionDuration: {
        1: "5s",
      },
      colors: {
        primary: "#291642",
        accent: {
          DEFAULT: "#EF8A6F",
          hover: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
