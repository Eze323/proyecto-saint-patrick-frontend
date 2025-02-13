<template>
  <form @submit.prevent="register" class="space-y-6">
    <!-- Campo: Nombre Completo -->
    <div class="space-y-2">
      <label for="fullName" class="block text-sm font-medium text-gray-700">
        Nombre Completo
      </label>
      <input
        id="fullName"
        type="text"
        v-model="fullName"
        placeholder="Juan Pérez"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- Campo: Correo Electrónico -->
    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-gray-700">
        Correo Electrónico
      </label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="correo@ejemplo.com"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- Botón de Registrarse -->
    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Registrarse
    </button>
  </form>
</template>

<script setup lang="ts">
const fullName = ref('');
const email = ref('');

const emit = defineEmits(['submit']);

const register = async () => {
  emit('submit', { fullName: fullName.value, email: email.value });
};
</script>