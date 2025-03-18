<!-- pages/dashboard.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Columna izquierda: Componentes principales -->
      <div class="flex-1 space-y-6">
        <!-- Fila 1: Saldo e Inversiones -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- <BalanceCard :user="authStore.user"/> -->
           <CardAccount 
            :key="authStore.user.accounts[0].cbu"
            :enterprise="authStore.user.accounts[0].enterprise"
            :cbu="authStore.user.accounts[0].cbu"
            :balance="authStore.user.accounts[0].balance"
            :type="authStore.user.accounts[0].type"
            @transfers="handleTransfer"
           />
          <InvestementsCard :user="authStore.user" />
        </div>

        <!-- Fila 2: Estadísticas -->
        <div class="grid grid-cols-1 gap-6">
          <MonthlyStatsCard :user="authStore.user"/>
        </div>

        <!-- Fila 3: Reservas y Gastos Explicados -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReservationsCard :user="authStore.user"/>
          <ExpensesCard :user="authStore.user"/>
          <!-- Puedes agregar más ítems aquí y se apilarán verticalmente -->
        </div>
      </div>

      <!-- Columna derecha: Últimas Transacciones (fija) -->
      <div class="w-full md:w-1/3">
        <TransactionsCard class="h-full" :user="authStore.user"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth.store';
    import { useRouter } from 'vue-router'; // O 'nuxt/app' si prefieres usar Nuxt
  
  definePageMeta({
    layout: 'authenticated', // Usa el layout para usuarios logueados
  });

  const authStore = useAuthStore();
  const user = computed(() => authStore.user);
  const router = useRouter();
  // import { ShoppingCartIcon, Bars3Icon } from '@heroicons/vue/24/solid';
  import ExpensesCard from '@/components/dashboard/ExpensesCard.vue';
  import InvestementsCard from '@/components/dashboard/InvestementsCard.vue';
import MonthlyStatsCard from '@/components/dashboard/MonthlyStatsCard.vue';
import ReservationsCard from '@/components/dashboard/ReservationsCard.vue';
import TransactionsCard from '@/components/dashboard/TransactionsCard.vue';
import CardAccount from '~/components/CardAccount.vue';


// Función para manejar la transferencia
const handleTransfer = (cbu: string) => {
  navigateTo({ path: '/transfers', query: { selectedAccount: cbu } }); // Usar navigateTo de Nuxt
};

const logout = () => {
  authStore.clearToken();
  navigateTo('/auth/login');
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>