// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#D2691E',
        accent: '#FFD700'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
    plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}