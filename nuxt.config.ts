// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head: {
      title: 'Banco Saint Patrick',
      meta: [
        { name: 'description', content: 'App HomeBank' }
      ],
      link: [
        //<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
//<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
//<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
//<link rel="manifest" href="/site.webmanifest">
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Roboto&family=Montserrat:wght@400;700&display=swap',
          as: 'style',
        },
  
      ]
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
            '@nuxtjs/tailwindcss',
            '@pinia/nuxt',
            'pinia-plugin-persistedstate/nuxt',
            '@nuxtjs/google-fonts',
            // '@nuxt/ui'
          ],
          // Configuración de Google Fonts
  googleFonts: {
    families: {
      'Open Sans': [300, 400, 600],
      Roboto: true, // Usar Roboto
      Montserrat: [400, 700], // Usar Montserrat con pesos 400 (regular) y 700 (bold)
    },
    display: 'swap', // Mejora la carga de fuentes
  },
          
   // Configuración de Tailwind
   tailwindcss: {
    configPath: '~/tailwind.config.ts', // Ruta del archivo de configuración
    cssPath: '~/assets/styles/global.css' // Estilos globales de Tailwind
  },
  
  plugins:[
    '~/plugins/inactivity.client.ts',
    
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