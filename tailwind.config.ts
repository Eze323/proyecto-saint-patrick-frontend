// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
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
        // Combinación de colores elegante y sofisticada
        primary: {
          DEFAULT: '#488586',   //#005858 //#669B9A
          50: '#E0F2F7', // Un tono más claro (opcional)
          100: '#B2DFDB', // Otro tono más claro (opcional)
          200: '#80CBC4', // Otro tono más claro (opcional)
          300: '#4DB6AC', // Otro tono más claro (opcional)
          400: '#26A69A', // Otro tono más claro (opcional)
          450: '#669B9A',  // Verde claro para menu lateral
          500: '#009688', // Un tono más oscuro
          600: '#00796B', // Otro tono más oscuro
          700: '#00695C', // Otro tono más oscuro
          800: '#004D40', // Otro tono más oscuro
          900: '#00362B', // Otro tono más oscuro
        },
        secondary: {
          DEFAULT: '#DCB349',
          50: '#FFF9C4',
          100: '#FFF59D',
          200: '#FFE978',
          300: '#FFDE33',
          400: '#FFD500',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        accent: {
          DEFAULT: '#F5F5F5',
          500: '#FAF9F6',
        },
        primaryLight: '#3498DB', // Azul para detalles y llamados a la acción (opcional)
      },
      fontFamily: {
        // Fuente formal y profesional para banca
        sans: ['"Roboto"', 'sans-serif'], // Roboto (alternativa: 'Montserrat', 'sans-serif')
        // sans: ['Inter', 'sans-serif'] // Fuente original (si prefieres mantenerla)
      }
    }
  },
  plugins: []
};