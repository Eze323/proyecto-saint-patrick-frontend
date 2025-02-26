<template>
    <div class="flex items-center space-x-2">
      <!-- Icono de Usuario -->
      <div class="w-8 h-8 rounded-full flex items-center justify-center">
        <UserCircleIcon class="w-7 h-7 text-primary" />
      </div>
  
      <!-- Nombre del Usuario -->
      <span class="text-sm font-medium text-gray-700">{{ userName }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { UserCircleIcon } from '@heroicons/vue/24/outline'; // Asegúrate de importar el ícono
  
  // Obtén el nombre del usuario desde el store o composable
  const authStore = useAuthStore();
  const userName = authStore.user?.profile?.name || 'Usuario';

  
  </script>