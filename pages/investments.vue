<template>
    <div class="container mx-auto py-8">
      <!-- Título -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-teal-800">Inversiones</h1>
      </div>
  
      <!-- Tabs -->
      <div class="flex justify-evenly mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'pb-2 font-medium transition-colors duration-300',
            activeTab === tab.value
              ? 'text-teal-800 border-b-2 border-teal-800'
              : 'text-gray-500 hover:text-teal-600',
          ]"
        >
          {{ tab.name }}
        </button>
      </div>
  
      <!-- Contenido de los tabs con transición -->
      <div class="transition-opacity duration-500 ease-in-out" :key="activeTab">
        <!-- Plazos fijos -->
        <div v-if="activeTab === 'plazos-fijos'" class="animate-fade animate-slide-up">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Plazo fijo tradicional -->
            <div
              class="bg-[#b8cdcd] rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#c0d5d5]"
            >
              <img src="/inversion01.webp" alt="Plazo fijo tradicional" class="mb-4 w-32 h-32 object-contain" />
              <h3 class="text-lg font-semibold text-teal-800 mb-2">Plazo fijo tradicional</h3>
              <ul class="text-gray-600 mb-4 space-y-1">
                <li>· Tasa fija de interés</li>
                <li>· Monto mínimo: $1000</li>
                <li>· Plazo mínimo: 30 días</li>
                <li>· Solo clientes de BSP</li>
              </ul>
              <button
                class="bg-teal-800 text-yellow-400 px-4 py-2 rounded flex items-center space-x-2 hover:bg-teal-900 transition-colors duration-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Conocer más</span>
              </button>
            </div>
  
            <!-- Plazo fijo en dólares -->
            <div
              class="bg-[#b8cdcd] rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#c0d5d5]"
            >
              <img src="/inversion02.webp" alt="Plazo fijo en dólares" class="mb-4 w-32 h-32 object-contain" />
              <h3 class="text-lg font-semibold text-teal-800 mb-2">Plazo fijo en dólares</h3>
              <ul class="text-gray-600 mb-4 space-y-1">
                <li>· Tasa fija de interés</li>
                <li>· Monto mínimo: $100 USD</li>
                <li>· Plazo mínimo: 30 días</li>
                <li>· Solo clientes de BSP</li>
              </ul>
              <button
                class="bg-teal-800 text-yellow-400 px-4 py-2 rounded flex items-center space-x-2 hover:bg-teal-900 transition-colors duration-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Conocer más</span>
              </button>
            </div>
  
            <!-- Plazo fijo online -->
            <div
              class="bg-[#b8cdcd] rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#c0d5d5]"
            >
              <img src="/inversion03.webp" alt="Plazo fijo online" class="mb-4 w-32 h-32 object-contain" />
              <h3 class="text-lg font-semibold text-teal-800 mb-2">Plazo fijo online</h3>
              <ul class="text-gray-600 mb-4 space-y-1">
                <li>· Tasa fija de interés</li>
                <li>· Monto mínimo: $1000</li>
                <li>· Plazo mínimo: 30 días</li>
                <li>· No se necesita ser cliente</li>
              </ul>
              <button
                class="bg-teal-800 text-yellow-400 px-4 py-2 rounded flex items-center space-x-2 hover:bg-teal-900 transition-colors duration-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Conocer más</span>
              </button>
            </div>
          </div>
        </div>
  
        <!-- FBA fondos comunes de inversión -->
        <div v-else-if="activeTab === 'fba-fondos'" class="animate-fade animate-slide-up">
          <div class="bg-gray-50 rounded-lg p-8">
            <h2 class="text-2xl font-semibold text-teal-800 mb-4">FBA Fondos Comunes de Inversión</h2>
            <p class="text-gray-600 mb-4">
              Diversificá tu capital con nuestros fondos comunes de inversión, diseñados para maximizar tus retornos mientras minimizás riesgos. Invertí en una cartera diversificada gestionada por expertos, con opciones que se adaptan a tu perfil de inversor, ya seas conservador o más arriesgado.
            </p>
            <ul class="text-gray-600 mb-6 space-y-2">
              <li>· Acceso a mercados nacionales e internacionales.</li>
              <li>· Rentabilidad ajustada a tu nivel de riesgo.</li>
              <li>· Gestión profesional de tu inversión.</li>
              <li>· Retiros flexibles según el fondo elegido.</li>
            </ul>
            <button
              class="bg-teal-800 text-yellow-400 px-6 py-3 rounded flex items-center space-x-2 hover:bg-teal-900 transition-colors duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span>Explorar fondos</span>
            </button>
          </div>
        </div>
  
        <!-- Inversiones de mercado -->
        <div v-else-if="activeTab === 'inversiones-mercado'" class="animate-fade animate-slide-up">
          <div class="bg-gray-50 rounded-lg p-8">
            <h2 class="text-2xl font-semibold text-teal-800 mb-4">Inversiones de Mercado</h2>
            <p class="text-gray-600 mb-4">
              Participá activamente en los mercados financieros con nuestras opciones de inversión en acciones, bonos, y otros instrumentos. Aprovechá las oportunidades del mercado con herramientas avanzadas y el respaldo de Banco Saint Patrick.
            </p>
            <ul class="text-gray-600 mb-6 space-y-2">
              <li>· Inversión en acciones locales e internacionales.</li>
              <li>· Bonos con rendimientos atractivos.</li>
              <li>· Asesoramiento personalizado para tus decisiones.</li>
              <li>· Plataforma online para operar en tiempo real.</li>
            </ul>
            <button
              class="bg-teal-800 text-yellow-400 px-6 py-3 rounded flex items-center space-x-2 hover:bg-teal-900 transition-colors duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span>Descubrir opciones</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({ layout: "authenticated" });
  
  const activeTab = ref('plazos-fijos');
  
  const tabs = [
    { name: 'Plazos fijos', value: 'plazos-fijos' },
    { name: 'FBA fondos comunes de inversión', value: 'fba-fondos' },
    { name: 'Inversiones de mercado', value: 'inversiones-mercado' },
  ];
  </script>
  
  <style>
  /* Animaciones personalizadas */
  .animate-fade {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>