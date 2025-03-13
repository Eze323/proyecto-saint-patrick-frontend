<template>
  <CustomCard title="Inversiones" class="bg-primary-450 border-secondary border-2"> 
    <!-- Total invertido en el centro -->
    <div class="flex justify-center items-center h-24">
      <span class="text-3xl font-bold text-secondary">${{ totalInvested.toLocaleString() }}</span>
    </div>

    <!-- Barras de los últimos 8 meses -->
    <div class="mt-4">
      <h3 class="text-sm font-semibold text-gray-600 mb-2">Últimos 8 meses</h3>
      <div class="flex justify-between gap-1">
        <div v-for="(month, index) in monthlyPerformance" :key="index" class="flex-1 flex flex-col items-center">
          <!-- Barra de ganancia/pérdida -->
          <div
            class="w-full border-secondary border-2"
            :class="month.value >= 0 ? 'bg-stone-300' : 'bg-amber-600'"
            :style="{ height: `${Math.abs(month.value) * 5}px`, marginTop: 'auto' }"
          ></div>
          <!-- Etiqueta del mes -->
          <span class="text-xs text-white mt-1">{{ month.label }}</span>
        </div>
      </div>
    </div>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '~/components/CustomCard.vue';

// Datos simulados (puedes reemplazarlos con una API después)
const totalInvested = 25000; // Total invertido en USD

const monthlyPerformance = [
  { label: 'Jul', value: 5 },   // Ganancia de 5%
  { label: 'Ago', value: -2 },  // Pérdida de 2%
  { label: 'Sep', value: 3 },   // Ganancia de 3%
  { label: 'Oct', value: 1 },   // Ganancia de 1%
  { label: 'Nov', value: -4 },  // Pérdida de 4%
  { label: 'Dic', value: 6 },   // Ganancia de 6%
  { label: 'Ene', value: 2 },   // Ganancia de 2%
  { label: 'Feb', value: -1 },  // Pérdida de 1%
];
</script>

<style scoped>
/* Ajustes adicionales si necesitas personalizar más */
</style>