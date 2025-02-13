<!-- layouts/authenticated.vue -->
<template>
  <div class="flex h-screen">
    <!-- Menú lateral -->
    <aside class="bg-primary text-white w-64 p-4 flex flex-col">
      <!-- Nombre del banco -->
      <div class="text-xl font-bold mb-6">
        <NuxtLink to="/" class="text-white">Banco Saint Patrick</NuxtLink>
      </div>

      <!-- Opciones del menú -->
      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/dashboard" class="block py-2 px-4 hover:bg-secondary rounded">
              Dashboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/transfers" class="block py-2 px-4 hover:bg-secondary rounded">
              Transferencias
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/transactions" class="block py-2 px-4 hover:bg-secondary rounded">
              Transacciones
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/accounts" class="block py-2 px-4 hover:bg-secondary rounded">
              Cuentas y Tarjetas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/investments" class="block py-2 px-4 hover:bg-secondary rounded">
              Inversiones
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Opciones adicionales al final -->
      <div class="mt-auto">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/settings" class="block py-2 px-4 hover:bg-secondary rounded">
              Settings
            </NuxtLink>
          </li>
          <li>
            <button @click="logout" class="block w-full text-left py-2 px-4 hover:bg-secondary rounded">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="flex-1 p-6">
      <slot /> <!-- Aquí se renderiza el contenido de la página -->
    </main>
  </div>
</template>

<script setup lang="ts">

const logout = () => {
  const authStore = useAuthStore();
  authStore.clearToken();
  navigateTo('/auth/login');
};
</script>

<style scoped>
/* Estilos personalizados */
.router-link-active {
  background-color: #D9B249; /* Cambia el color de fondo para la ruta activa */
}
</style>