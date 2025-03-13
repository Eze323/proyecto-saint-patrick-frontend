<!-- components/ReservationProgressCard.vue -->
<template>
    <div class="reservation-card bg-yellow-300 p-4 rounded-lg shadow-md relative">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
        <button class="text-gray-600 hover:text-gray-800 focus:outline-none">
          <ChevronDownIcon class="h-5 w-5" />
        </button>
      </div>
      <p class="text-sm text-gray-600 mb-2">{{ subtitle }}</p>
      <div class="flex items-center mb-2">
        <component :is="icon" class="h-6 w-6 text-teal-600 mr-2" />
        <span class="text-xl font-bold text-gray-800">{{ percentage }}% Alcanzado</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          class="bg-white h-2.5 rounded-full"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      <p class="text-sm text-gray-600">{{ currentAmount }} de {{ targetAmount }}</p>
    </div>
  </template>
  
  <script setup>
  import { ChevronDownIcon } from '@heroicons/vue/24/outline';
  
  // Definir props
  defineProps({
    title: {
      type: String,
      default: 'Reservas',
    },
    subtitle: {
      type: String,
      default: 'Vacaciones 2026',
    },
    percentage: {
      type: Number,
      default: 39,
    },
    progress: {
      type: Number,
      default: 39,
    },
    currentAmount: {
      type: String,
      default: '$90,000',
    },
    targetAmount: {
      type: String,
      default: '$300,000',
    },
    icon: {
      type: Object, // Componente de ícono (e.g., de @heroicons/vue)
      default: null,
    },
  });
  </script>
  
  <style scoped>
  .reservation-card {
    background-color: #fde047; /* Color amarillo similar al de la imagen */
  }
  </style>