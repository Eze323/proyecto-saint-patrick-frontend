<!-- components/auth/LoginForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="">
    <div class="mb-4 space-y-2">
      <label for="cardNumber" class="block text-sm font-medium text-primary">Número de Tarjeta</label>
      <input
        v-model="cardNumber"
        type="text"
        id="cardNumber"
         placeholder="1234-5678-9012-3456"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
        @input="formatCardNumber"
      />
    </div>
    <div class="mb-4">
      <label for="pin" class="block text-sm font-medium text-primary">Clave</label>
      <input
        v-model="pin"
        type="password"
        id="pin"
        placeholder="* * * *"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none border-2 focus:ring-secondary-500 focus:border-secondary-500"
      
      />
    </div>
    <div v-if="error" class="mb-4 text-red-500 text-sm text-center">
      {{ error }}
    </div>
    <button
  type="submit"
  :disabled="loading"
  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-secondary bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
>
  <span v-if="loading">Cargando...</span>
  <span v-else>Ingresar</span>
</button>

</form>

</template>

<script setup lang="ts">
import { NuxtLink } from '#components';


const props = defineProps({
  loading: Boolean,
  error: String,
});

const emit = defineEmits(['submit']);

const cardNumber = ref('');
const pin = ref('');

const handleSubmit = () => {
  emit('submit', { cardNumber: cardNumber.value, pin: pin.value });
};

const formatCardNumber = (event:Event) => {
  const input = event.target as HTMLFormElement;
  let value= input.value.replace(/\D/g, '');
  if (value.lenght>16)value=value.slice(0,16);

  const formattedValue= value.match(/.{1,4}/g).join('-') || value;

  cardNumber.value = formattedValue;
  input.value = formattedValue;
};

</script>
