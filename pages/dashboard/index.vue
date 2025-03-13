<!-- pages/dashboard.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Columna izquierda: Componentes principales -->
      <div class="flex-1 space-y-6">
        <!-- Fila 1: Saldo e Inversiones -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceCard />
          <InvestementsCard />
        </div>

        <!-- Fila 2: Estadísticas -->
        <div class="grid grid-cols-1 gap-6">
          <MonthlyStatsCard />
        </div>

        <!-- Fila 3: Reservas y Gastos Explicados -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReservationsCard />
          <ExpensesCard />
          <!-- Puedes agregar más ítems aquí y se apilarán verticalmente -->
        </div>
      </div>

      <!-- Columna derecha: Últimas Transacciones (fija) -->
      <div class="w-full md:w-1/3">
        <TransactionsCard class="h-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'authenticated', // Usa el layout para usuarios logueados
  });

  // import { ShoppingCartIcon, Bars3Icon } from '@heroicons/vue/24/solid';
  import BalanceCard from '@/components/dashboard/BalanceCard.vue';
import ExpensesCard from '@/components/dashboard/ExpensesCard.vue';
  import InvestementsCard from '@/components/dashboard/InvestementsCard.vue';
import MonthlyStatsCard from '@/components/dashboard/MonthlyStatsCard.vue';
import ReservationsCard from '@/components/dashboard/ReservationsCard.vue';
import TransactionsCard from '@/components/dashboard/TransactionsCard.vue';



  const authStore = useAuthStore();
  const user = computed(() => authStore.user);

  const logout = () => {
    authStore.clearToken();
    navigateTo('/auth/login');
  };
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>