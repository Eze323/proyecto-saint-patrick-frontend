<!-- components/GastosExplicadosCard.vue -->
<template>
  <div class="gastos-card bg-primary-450 p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold text-yellow-300 mb-4">Gastos Explicados:</h3>
    <div class="space-y-3">
      <div v-for="(expense, index) in expenses" :key="index" class="flex items-center gap-3">
        <div class="w-full bg-yellow-200/20 h-2.5">
          <div
            class="bg-yellow-300 h-2.5"
            :style="{ width: `${expense.percentage}%` }"
          ></div>
        </div>
        <span class="text-sm text-secondary w-28">
          <span class="font-semibold text-yellow-300">{{ expense.percentage }}%</span> {{ abbreviateCategory(expense.category) }}
        </span>
      </div>
      <div v-if="!expenses.length" class="text-sm text-gray-600 text-center">
        No hay datos de gastos disponibles.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { UserProfile } from '~/utils/types';

// Definimos las props con tipado
const props = defineProps<{
  user?: UserProfile | null; // Hacemos que user sea opcional
}>();

// Extraemos los datos de expensesBreakdown
const expenses = computed(() => {
  return props.user?.expensesBreakdown || [];
});

// Función para abreviar categorías largas
const abbreviateCategory = (category: string): string => {
  const abbreviations: { [key: string]: string } = {
    'Transferencias': 'Transf.',
    'Restaurantes': 'Rest.',
    'Supermercados': 'Super.',
    'Entretenimiento': 'Entret.',
    'Transporte': 'Transp.',
    'Alimentación': 'Alim.',
    'Servicios': 'Serv.',
    'Alquiler': 'Alq.',
    'Comida': 'Com.',
  };
  return abbreviations[category] || category; // Si no hay abreviación, usa el nombre completo
};
</script>

<style scoped>
/* Estilos existentes o adicionales */
.gastos-card {
  min-height: 200px; /* Aseguramos una altura mínima para que las barras se vean bien */
}

/* Ajustamos la barra para que sea más delgada y elegante */
.h-2\.5 {
  height: 0.5rem; /* Reducimos la altura de la barra a 8px */
}

/* Aseguramos que el texto esté bien alineado y no se superponga */
.w-28 {
  min-width: 7rem; /* Aumentamos un poco el ancho para las etiquetas */
  text-align: left; /* Alineamos a la izquierda para mayor prolijidad */
}

/* Transición suave para las barras */
.bg-yellow-300 {
  transition: width 0.3s ease-in-out;
}
</style>