<template>
    <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6">Formulario de Transferencia</h2>

      <div v-if="transfersStore.errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
      {{ transfersStore.errorMessage }}
    </div>
  
    <SusscesModal
      :message="transfersStore.successMessage"
      :is-open="transfersStore.successMessage !== ''"
      @close="transfersStore.successMessage = ''"
    />
  
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
            <input type="radio" v-model="transfersStore.form.destinationType" value="cbuAlias" class="mr-2" />
            CBU o Alias
          </label>
          <label class="flex items-center">
            <input type="radio" v-model="transfersStore.form.destinationType" value="card" class="mr-2" />
            Número de Tarjeta
          </label>
        </div>
      </div>

     
  
        <div v-if="transfersStore.form.destinationType === 'cbuAlias'" class="mb-4">
          <label for="cbuAlias" class="block text-sm font-medium text-gray-700">CBU o Alias</label>
          <input v-model="transfersStore.form.cbuAlias" type="text" id="cbuAlias" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required @blur="transfersStore.validateDestination" />
        </div>
  
        <div v-if="transfersStore.form.destinationType === 'card'" class="mb-4">
          <label for="cardNumber" class="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
          <input
          v-model="cardNumber"
          type="text"
          id="cardNumber"
          placeholder="1234-5678-9012-3456"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
          required
          @input="formatCard"
          @blur="validateCardAndSync"
        />
        </div>
        
        <p v-if="transfersStore.form.recipientName" class="mt-1 text-sm text-green-600 text-center">
          Destinatario: {{ transfersStore.form.recipientName }}
        </p>
          
        <div class="mb-4">
          <label for="monto" class="block text-sm font-medium text-gray-700">Monto</label>
          <input v-model.number="transfersStore.form.monto" type="number" id="monto" min="1" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required @blur="transfersStore.validateMonto" />
        </div>
  
        <div class="mb-4">
          <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
          <input v-model="transfersStore.form.fecha" type="text" id="fecha" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" readonly />
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
            class="w-full px-4 py-2 bg-primary text-white font-medium rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {{ transfersStore.isSubmitting ? 'Enviando...' : 'Enviar' }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '~/stores/auth.store';
  import { useTransfersStore } from '~/stores/transfers.store';
import SusscesModal from './SusscesModal.vue';
import { useCardFormat } from '~/composables/useCardFormat';
const route = useRoute();

const authStore = useAuthStore();
const transfersStore = useTransfersStore();

// Creamos un ref local para el input de tarjeta
const cardNumber = ref(transfersStore.form.cardNumber);
const { formatCard } = useCardFormat(cardNumber);
// Obtener el parámetro selectedAccount de la URL
const selectedAccount = ref<string>(route.query.selectedAccount as string || '');

// Sincronizar el valor de selectedAccount con el store
onMounted(() => {
  if (selectedAccount.value) {
    transfersStore.form.accountId = selectedAccount.value;
  }
});

// Sincronizamos el ref local con el store
watch(cardNumber, (newValue) => {
  transfersStore.form.cardNumber = newValue;
});
watch(() => transfersStore.form.cardNumber, (newValue) => {
  if (newValue !== cardNumber.value) {
    cardNumber.value = newValue;
  }
});
  
  onMounted(() => {
  transfersStore.successMessage = '';
  transfersStore.errorMessage = '';
  if (!authStore.isAuthenticated || !authStore.user) {
    navigateTo('/auth/login');
  }
  cardNumber.value = transfersStore.form.cardNumber; // Aseguramos el valor inicial
});

const validateCbuLengthAndCheck = () => {
  const cbu = transfersStore.form.cbuAlias.replace(/\D/g, ''); // Quitar no dígitos si los hay
  if (cbu.length === 22) {
    transfersStore.validateDestination(); // Solo validar si tiene 22 dígitos
  } else {
    transfersStore.errorMessage = 'El CBU debe tener exactamente 22 dígitos.';
    transfersStore.form.recipientName = ''; // Limpiar el nombre si no es válido
  }
};

const validateCardAndSync = () => {
  const card = cardNumber.value.replace(/\D/g, '');
  if (card.length === 16) {
    transfersStore.validateDestination();
  } else {
    transfersStore.errorMessage = 'El número de tarjeta debe tener exactamente 16 dígitos.';
    transfersStore.form.recipientName = '';
  }
};

  
 
  </script>