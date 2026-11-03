/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["honer-those", "system-ui", "sans-serif"]
      },
    },
  },
  plugins: [],
}