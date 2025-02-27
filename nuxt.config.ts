// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head: {
      title: 'Banco Saint Patrick',
      meta: [
        { name: 'description', content: 'App HomeBank' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
            '@nuxtjs/tailwindcss',
            '@pinia/nuxt',
            'pinia-plugin-persistedstate/nuxt',
            // '@nuxt/ui'
          ],
   // Configuración de Tailwind
   tailwindcss: {
    configPath: '~/tailwind.config.ts', // Ruta del archivo de configuración
    cssPath: '~/assets/styles/global.css' // Estilos globales de Tailwind
  },
  
  plugins:[
    // '~/plugins/toast.ts'
    
  ],
  build:{
    transpile:[
      '@headlessui/vue',
      '@heroicons/vue'
    ]
  },
  // Configuración de Pinia persisted
  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      sameSite: 'lax',
    },
    debug: true,
  },
ssr: false,
  
})