<!-- components/ReservationProgressCard.vue -->
<template>
  <div class="reservation-card bg-yellow-300 p-4 rounded-lg shadow-md relative">
    <div class="flex justify-between items-center mb-2">
      <div>
        <h3 class="text-2xl font-semibold text-white">Reservas</h3>
        <p class="text-sm text-gray-700 mt-1">{{ subtitle }}</p>
      </div>
      <div class="flex space-x-2">
        <button class="text-white hover:text-gray-200 focus:outline-none">
          <ChevronLeftIcon class="h-5 w-5" />
        </button>
        <button class="text-white hover:text-gray-200 focus:outline-none">
          <ChevronRightIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 items-center">
      <!-- Columna izquierda: Ícono de avión -->
      <div class="flex justify-center">
        <PaperAirplaneIcon class="h-12 w-12 text-teal-600 transform rotate-45" />
      </div>
      <!-- Columna derecha: Porcentaje, barra y montos -->
      <div>
        <div class="text-center mb-2">
          <span class="text-xl font-bold text-gray-700">{{ percentage }}% Alcanzado</span>
        </div>
        <div class="w-full bg-blue-100 rounded-full h-1.5 mb-2">
          <div
            class="bg-white h-1.5 rounded-full"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <p class="text-sm text-gray-700">{{ currentAmount }} de {{ targetAmount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline';
import type { UserProfile } from '~/utils/types';

// Definimos las props con tipado
const props = defineProps<{
  user?: UserProfile | null; // Hacemos que user sea opcional
}>();

// Calculamos los valores dinámicos a partir de user.reservations
const title = computed(() => props.user?.reservations?.name || 'Reservas');
const subtitle = computed(() => props.user?.reservations?.name || 'Sin nombre de reserva');
const currentAmount = computed(() => {
  const amount = props.user?.reservations?.currentAmount || 0;
  return `$${amount.toLocaleString('es-AR')}`;
});
const targetAmount = computed(() => {
  const amount = props.user?.reservations?.targetAmount || 0;
  return `$${amount.toLocaleString('es-AR')}`;
});
const progress = computed(() => {
  const current = props.user?.reservations?.currentAmount || 0;
  const target = props.user?.reservations?.targetAmount || 1; // Evitar división por cero
  return Math.min(100, Math.round((current / target) * 100));
});
const percentage = computed(() => {
  // Usamos progress.value para asegurar consistencia con la barra
  return props.user?.reservations?.progress || progress.value;
});

// Verificación de datos para depuración (puedes eliminar esto después)
console.log('Progress:', progress.value, 'Percentage:', percentage.value);
</script>

<style scoped>
.reservation-card {
  background-color: #facc15; /* Amarillo vibrante */
}

.h-1\.5 {
  height: 0.375rem; /* Barra más delgada */
}

.bg-yellow-100 {
  background-color: #fefce8; /* Amarillo claro para la barra */
}

.transform.rotate-45 {
  transform: rotate(45deg); /* Rotación del avión */
}

/* Transición suave para la barra */
.bg-white {
  transition: width 0.3s ease-in-out;
}

/* Ajuste de la cuadrícula para centrar el ícono */
.grid-cols-2 {
  grid-template-columns: auto 1fr; /* Columna izquierda ajustada, derecha flexible */
}
</style>