/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#18181b', // sRGB fallback
        },
        indigo: {
          100: '#e0e7ff',
        },
        // ...other overrides
      },
    },
  },
  plugins: [],
}