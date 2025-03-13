<!-- components/Estadisticas.vue -->
<template>
    <div class="estadisticas-container bg-primary-450 col-span-2 p-6 shadow-md">
      <h2>Estadísticas</h2>
      <button @click="filtrarUltimosMeses">Últimos meses</button>
      <ClientOnly>
        <div v-if="chartData" class="chart-container">
          <Chart :data="chartData" :options="chartOptions" type="bar" />
        </div>
        <div v-else class="chart-placeholder">Cargando gráfico...</div>
      </ClientOnly>
    </div>
  </template>
  
  <script setup>
  import { Chart } from 'vue-chartjs';
  import { ref, onMounted } from 'vue';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,BarController } from 'chart.js';
  import { ClientOnly } from '#components';
  
  // Registrar los componentes necesarios de Chart.js
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,BarController);
  
  
  // Datos iniciales
  const datosCompletos = {
    labels: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero'],
    ingresos: [250000, 300000, 200000, 250000, 250000, 250000, 250000],
    gastos: [150000, 50000, 200000, 150000, 125000, 150000, 125000],
  };
  
  // Estado reactivo para los datos del gráfico
  const chartData = ref(null);
  
  // Opciones del gráfico
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 300000,
        ticks: { callback: (value) => `${value / 1000}k` },
      },
    },
    plugins: { legend: { position: 'top' } },
  });
  
  // Inicializar datos en el cliente
  onMounted(() => {
    chartData.value = {
      labels: datosCompletos.labels,
      datasets: [
        {
          label: 'Ingresos',
          data: datosCompletos.ingresos,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
        },
        {
          label: 'Gastos',
          data: datosCompletos.gastos,
          backgroundColor: 'rgba(255, 215, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
        },
      ],
    };
  });
  
  // Función para filtrar los últimos meses
  const filtrarUltimosMeses = () => {
    chartData.value = {
      labels: datosCompletos.labels.slice(-3),
      datasets: [
        {
          label: 'Ingresos',
          data: datosCompletos.ingresos.slice(-3),
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
        },
        {
          label: 'Gastos',
          data: datosCompletos.gastos.slice(-3),
          backgroundColor: 'rgba(255, 215, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
        },
      ],
    };
  };
  </script>
  
  <style scoped>
  .estadisticas-container {
    width: 80%;
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