// tailwind.config.ts
/** @type {import('tailwindcss').Config} */ // JSDoc comment (opcional)
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#025654',
          500: '#4F46E5',
          600: '#4338CA'
        },
        secondary: {
          DEFAULT: '#DCB349',
          500: '#10B981',
          600: '#059669'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};