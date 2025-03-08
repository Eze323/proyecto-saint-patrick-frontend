<!-- components/auth/LoginForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="mb-4 space-y-2">
      <label for="cardNumber" class="block text-sm font-medium text-primary">Número de Tarjeta</label>
      <input
        v-model="cardNumber"
        type="text"
        id="cardNumber"
         placeholder="1234-5678-9012-3456"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
        @input="formatCard"
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
    <!-- Mensaje de error con Transition -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
    <div v-if="error" class="mb-4 text-red-500 text-sm text-center">
      {{ error }}
    </div>
    </Transition>
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
import { useCardFormat } from '~/composables/useCardFormat';



const props = defineProps({
  loading: Boolean,
  error: String,
});

const emit = defineEmits(['submit']);

const cardNumber = ref('');
const pin = ref('');
const { formatCard } = useCardFormat(cardNumber);

const handleSubmit = () => {
  emit('submit', { cardNumber: cardNumber.value, pin: pin.value });
};



</script>
