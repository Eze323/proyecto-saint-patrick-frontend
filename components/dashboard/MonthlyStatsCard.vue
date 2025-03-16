<!-- components/Estadisticas.vue -->
<template>
  <div class="estadisticas-container bg-teal-100 col-span-2 p-6 shadow-md rounded border-2 border-secondary">
    <h2 class="text-white">Estadísticas</h2>
    <button @click="filtrarUltimosMeses">Últimos meses</button>

      <div v-if="chartData" class="chart-container">
        <Chart :data="chartData" :options="chartOptions" type="bar" />
      </div>
      <div v-else class="chart-placeholder">Cargando gráfico...</div>

  </div>
</template>

<script setup lang="ts">
import { Chart } from 'vue-chartjs';
import { ref, computed, onMounted } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js';

import type { UserProfile } from '~/utils/types';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController);

// Definimos las props con tipado
const props = defineProps<{
  user?: UserProfile | null; // Hacemos que user sea opcional
}>();

// Datos dinámicos desde props.user.monthlyStats
const monthlyStats = computed(() => {
  return props.user?.monthlyStats || { labels: [], incomes: [], expenses: [] };
});

// Estado reactivo para los datos del gráfico
const chartData = ref<any>(null);

// Calcular el máximo del eje Y dinámicamente
const maxY = computed(() => {
  const maxIncomes = Math.max(...(monthlyStats.value.incomes || [0]));
  const maxExpenses = Math.max(...(monthlyStats.value.expenses || [0]));
  const maxValue = Math.max(maxIncomes, maxExpenses);
  // Redondeamos hacia arriba al próximo múltiplo de 100,000 para mejor visualización
  return Math.ceil(maxValue / 100000) * 100000;
});

// Opciones del gráfico
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: maxY.value || 300000, // Usa el máximo dinámico o un valor por defecto
      ticks: { callback: (value: number) => `${value / 1000}k` },
    },
  },
  plugins: { legend: { position: 'top' as const } },
}));

// Función para inicializar los datos del gráfico
const initializeChartData = (labels: string[], incomes: number[], expenses: number[]) => {
  chartData.value = {
    labels,
    datasets: [
      {
        label: 'Ingresos',
        data: incomes,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'Gastos',
        data: expenses,
        backgroundColor: 'rgba(255, 215, 0, 0.8)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };
};

// Inicializar datos en el cliente
onMounted(() => {
  if (monthlyStats.value.labels.length) {
    initializeChartData(
      monthlyStats.value.labels,
      monthlyStats.value.incomes,
      monthlyStats.value.expenses
    );
  } else {
    chartData.value = null; // Mostrará "Cargando gráfico..." si no hay datos
  }
});

// Función para filtrar los últimos meses
const filtrarUltimosMeses = () => {
  if (monthlyStats.value.labels.length) {
    initializeChartData(
      monthlyStats.value.labels.slice(-3),
      monthlyStats.value.incomes.slice(-3),
      monthlyStats.value.expenses.slice(-3)
    );
  }
};
</script>

<style scoped>
.estadisticas-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
</style>