// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
            '@nuxtjs/tailwindcss',
            '@pinia/nuxt',
            // '@nuxt/ui'
          ],
   // Configuración de Tailwind
   tailwindcss: {
    configPath: '~/tailwind.config.ts', // Ruta del archivo de configuración
    cssPath: '~/assets/styles/global.css' // Estilos globales de Tailwind
  },
  plugins:[
    // '~/plugins/toast.ts'
  ]

  
})