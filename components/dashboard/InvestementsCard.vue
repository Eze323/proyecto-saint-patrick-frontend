<!-- components/InvestmentsCard.vue -->
<template>
  <CustomCard title="Inversiones" class="bg-primary-450 border-secondary border-2">
    <!-- Total invertido en el centro -->
    <div class="flex justify-center items-center h-24">
      <span v-if="totalInvested > 0" class="text-3xl font-bold text-secondary">
        ${{ totalInvested.toLocaleString() }}
      </span>
      <span v-else class="text-lg text-gray-600">Sin inversiones</span>
    </div>

    <!-- Barras de los últimos 8 meses -->
    <div class="mt-4">
      <h3 class="text-sm font-semibold text-gray-600 mb-2">Últimos 8 meses</h3>
      <div v-if="monthlyPerformance.length" class="flex justify-between gap-1">
        <div v-for="(month, index) in monthlyPerformance" :key="index" class="flex-1 flex flex-col items-center">
          <!-- Barra de ganancia/pérdida -->
          <div
            class="w-full border-secondary border-2"
            :class="month.value >= 0 ? 'bg-stone-300' : 'bg-amber-600'"
            :style="{ height: `${Math.abs(month.value) * 17}px`, marginTop: 'auto' }"
          ></div>
          <!-- Etiqueta del mes -->
          <span class="text-xs text-white mt-1">{{ month.label }}</span>
        </div>
      </div>
      <div v-else class="text-sm text-gray-600 text-center">
        No hay datos de rendimiento disponibles.
      </div>
    </div>
  </CustomCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CustomCard from '~/components/CustomCard.vue';
import type { UserProfile } from '~/utils/types';

// Definimos las props con tipado
const props = defineProps<{
  user?: UserProfile | null; // Hacemos que user sea opcional
}>();

// Calculamos el total invertido
const totalInvested = computed(() => {
  if (!props.user || !props.user.investments?.length) return 0;
  return props.user.investments.reduce((sum, inv) => sum + inv.amount, 0);
});

// Generamos los datos de rendimiento mensual desde monthlyReturns
const monthlyPerformance = computed(() => {
  if (!props.user || !props.user.investments?.length) return [];

  // Definimos los últimos 8 meses hasta febrero 2025
  const months = ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'];

  // Combinamos los rendimientos mensuales de todas las inversiones
  const performance = months.map((label) => {
    let totalValue = 0;
    let activeReturns = 0;

    props.user.investments.forEach((inv) => {
      const monthData = inv.monthlyReturns.find((mr) => mr.month === label);
      if (monthData) {
        totalValue += monthData.value;
        activeReturns++;
      }
    });

    // Promedio de rendimiento para el mes (o 0 si no hay datos)
    const averageValue = activeReturns > 0 ? totalValue / activeReturns : 0;

    return {
      label,
      value: averageValue,
    };
  });

  return performance;
});
</script>

<style scoped>
/* Ajustes adicionales si necesitas personalizar más */
</style>