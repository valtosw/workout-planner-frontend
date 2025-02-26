import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trainer: {
          lightBorder: "#22C55E", // Green-500
          lightBg: "#BBF7D0", // Green-100
          darkBorder: "#4ADE80", // Green-400
          darkBg: "rgba(74, 222, 128, 0.2)", // Green-400/20
        },
        default: {
          lightBorder: "#D1D5DB", // Gray-300
          lightBg: "#FFFFFF", // White
          lightHover: "#F3F4F6", // Gray-100
          darkBorder: "#4B5563", // Gray-600
          darkBg: "#1F2937", // Gray-800
          darkHover: "#374151", // Gray-700
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
