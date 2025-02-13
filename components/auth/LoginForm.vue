<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-2">
      <label for="cardNumber" class="block text-sm font-medium text-gray-700">
        Número de Tarjeta
      </label>
      <input
        id="cardNumber"
        type="text"  v-model="cardNumber"
        placeholder="1234 5678 9012 3456"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div class="space-y-2">
      <label for="pin" class="block text-sm font-medium text-gray-700">
        PIN
      </label>
      <input
        id="pin"
        type="password"
        v-model="pin"
        placeholder="••••"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Ingresar
    </button>
  </form>
</template>

<script setup lang="ts">

const cardNumber = ref('');
const pin = ref('');

const emit = defineEmits(['submit']);

const handleSubmit = () => {  // Renamed to handleSubmit for clarity
  emit('submit', { cardNumber: cardNumber.value, pin: pin.value });
};
</script>