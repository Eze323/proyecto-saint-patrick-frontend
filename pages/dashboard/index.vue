<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tarjeta de saldo -->
        <CustomCard title="Saldo Actual">
          <p class="text-2xl font-bold text-primary-500">$12,345.67</p>
        </CustomCard>
  
        <!-- Tarjeta de últimas transacciones -->
        <CustomCard title="Últimas Transacciones">
          <ul class="space-y-2">
            <li class="flex justify-between">
              <span>Transferencia a Juan Pérez</span>
              <span class="text-red-500">-$500.00</span>
            </li>
            <li class="flex justify-between">
              <span>Depósito</span>
              <span class="text-green-500">+$1,200.00</span>
            </li>
          </ul>
        </CustomCard>
  
        <!-- Tarjeta de acciones rápidas -->
        <CustomCard title="Acciones Rápidas">
          <div class="space-y-4">
            <UButton
              label="Transferir"
              icon="i-heroicons-arrow-right"
              block
              @click="navigateTo('/dashboard/transfers')"
            />
            <UButton
              label="Ver Perfil"
              icon="i-heroicons-user"
              block
              @click="navigateTo('/profile')"
            />
          </div>
          <UButton
      label="Cerrar Sesión"
      icon="i-heroicons-logout"
      block
      @click="logout"
    />
        </CustomCard>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Lógica del dashboard (si es necesaria)

  definePageMeta({
  layout: 'authenticated', // Usa el layout para usuarios logueados
});



import CustomCard from '~/components/CustomCard.vue'; // Asegúrate de que la ruta sea correcta
import UButton from '~/components/UButton.vue'; // Asegúrate de que la ruta sea correcta

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const logout = () => {
  authStore.clearToken();
  navigateTo('/auth/login');
};

  </script>