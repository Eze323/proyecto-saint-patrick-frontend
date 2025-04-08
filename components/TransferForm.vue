

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Formulario de Transferencia</h2>

    <div v-if="transfersStore.errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
      {{ transfersStore.errorMessage }}
    </div>

    <form @submit.prevent="transfersStore.submitTransfer">
      <div class="mb-4">
        <select v-model="transfersStore.form.accountId" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          <option value="" disabled>Selecciona una cuenta</option>
          <option v-for="account in authStore.user?.accounts" :key="account.cbu" :value="account.cbu">
            {{ account.enterprise }} - {{ account.type }} (Saldo: ${{ account.balance.toLocaleString() }})
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Destino</label>
        <div class="flex gap-4 mt-1">
          <label class="flex items-center">
            <input type="radio" v-model="transfersStore.form.destinationType" value="cbuAlias" class="mr-2" /> CBU o Alias
          </label>
          <label class="flex items-center">
            <input type="radio" v-model="transfersStore.form.destinationType" value="card" class="mr-2" /> Número de Tarjeta
          </label>
        </div>
      </div>

      <div v-if="transfersStore.form.destinationType === 'cbuAlias'" class="mb-4">
        <label for="cbuAlias" class="block text-sm font-medium text-gray-700">CBU o Alias</label>
        <input
          v-model="transfersStore.form.cbuAlias"
          type="text"
          id="cbuAlias"
          :class="{ 'border-red-500': transfersStore.errorMessage && !transfersStore.form.cbuAlias }"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
          @blur="transfersStore.validateDestination"
        />
      </div>

      <div v-if="transfersStore.form.destinationType === 'card'" class="mb-4">
        <label for="cardNumber" class="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
        <input
          v-model="cardNumber"
          type="text"
          id="cardNumber"
          :class="{ 'border-red-500': transfersStore.errorMessage && !cardNumber }"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
          @input="formatCard"
          @blur="transfersStore.validateDestination"
        />
      </div>

      <p v-if="transfersStore.form.recipientName" class="mt-1 text-sm text-green-600 text-center">
        Destinatario: {{ transfersStore.form.recipientName }}
      </p>

      <div class="mb-4">
        <label for="monto" class="block text-sm font-medium text-gray-700">Monto</label>
        <input
          v-model.number="transfersStore.form.monto"
          type="number"
          id="monto"
          min="1"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
          @blur="transfersStore.validateMonto"
        />
      </div>

      <div class="mb-4">
        <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          v-model="transfersStore.form.fecha"
          type="date"
          id="fecha"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>


  
        <div class="mb-4">
          <label for="motivo" class="block text-sm font-medium text-gray-700">Motivo</label>
          <input v-model="transfersStore.form.motivo" type="text" id="motivo" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
  
        <div class="mb-4">
          <label for="referencia" class="block text-sm font-medium text-gray-700">Referencia</label>
          <input v-model="transfersStore.form.referencia" type="text" id="referencia" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email para Comprobante</label>
          <input v-model="transfersStore.form.email" type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
  
        <div>
          <button
              type="submit"
              :disabled="transfersStore.isSubmitting"
              :aria-busy="transfersStore.isSubmitting"
              class="w-full flex justify-center items-center px-4 py-2 bg-primary text-white font-medium rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span v-if="transfersStore.isSubmitting" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </span>
              <span v-else>Enviar</span>
            </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';
import { useTransfersStore } from '~/stores/transfers.store';
import { useCardFormat } from '~/composables/useCardFormat';
import { useNotifications } from '~/composables/useNotifications';

const authStore = useAuthStore();
const transfersStore = useTransfersStore();
const { addNotification } = useNotifications();
const route = useRoute();

const cardNumber = ref(transfersStore.form.cardNumber);
const { formatCard } = useCardFormat(cardNumber);

onMounted(() => {
  if (route.query.selectedAccount) {
    transfersStore.form.accountId = route.query.selectedAccount as string;
  }
  if (!authStore.isAuthenticated || !authStore.user) {
    navigateTo('/auth/login');
  }
});

watch(cardNumber, (newValue) => {
  transfersStore.form.cardNumber = newValue;
});
watch(() => transfersStore.form.cardNumber, (newValue) => {
  if (newValue !== cardNumber.value) cardNumber.value = newValue;
});

watch(() => transfersStore.successMessage, (newValue) => {
  if (newValue) {
    addNotification(newValue, 'success');
    transfersStore.successMessage = '';
  }
});
</script>