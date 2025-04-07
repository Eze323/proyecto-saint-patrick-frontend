<template>
    <div class="container mx-auto">
      <!-- Título -->
      <h1 class="text-3xl font-bold text-teal-800 mb-6">Soporte</h1>
  
      <!-- Banner -->
      <div
        class="relative bg-cover bg-center rounded-lg p-8 text-center"
        style="background-image: url('/support-banner.webp');"
      >
        <!-- Capa de fondo oscuro -->
        <div class="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
  
        <!-- Contenido del banner -->
        <div class="relative z-10">
          <h2 class="text-2xl font-semibold text-white mb-4">¿Cómo podemos ayudarte?</h2>
          <div class="flex justify-center">
            <div class="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar aquí..."
                class="w-full px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                @click="clearSearch"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  definePageMeta({ layout: "authenticated" });
  
  // Función para limpiar el campo de búsqueda (puede expandirse si querés agregar funcionalidad)
  const clearSearch = () => {
    // Aquí podrías agregar lógica para limpiar el input
    console.log('Limpiar búsqueda');
    const { addNotification } = useNotifications();
    addNotification('Prueba manual', 'success');
  };
  </script>