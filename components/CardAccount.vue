<template>
  <div class="card bg-white shadow-lg rounded-lg overflow-hidden border-2 border-primary-450">
    <!-- Header -->
    <div class="card-header p-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <p class="card-enterprice text-lg font-semibold text-gray-800">{{ enterprice }}</p>
        <span class="card-type bg-yellow-200 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full">{{ type }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="card-body p-4">
      <!-- Saldo -->
      <div class="flex items-center justify-between mb-4">
        <span class="card-saldo text-gray-600">Saldo</span>
        <div class="balance-container flex items-center gap-2">
          <p class="card-balance text-2xl font-bold text-gray-800">${{ showBalance ? balance.toLocaleString() : '••••••' }}</p>
          <button class="eye-toggle text-gray-500 hover:text-gray-700" @click="toggleBalance">
            <EyeIcon v-if="showBalance" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Línea divisoria -->
      <hr class="border-t border-gray-200 my-4" />

      <!-- CBU -->
      <div class="text-left">
        <p class="text-sm font-medium text-gray-600">CBU</p>
        <p class="card-cbu text-gray-800 font-mono">{{ cbu }}</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="card-footer p-4 border-t border-gray-200">
      <div class="button-group flex flex-col sm:flex-row gap-2">
        <button
          @click="handleAction"
          class="card-action-button flex items-center border-2 border-primary-450 justify-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <ArrowRightStartOnRectangleIcon class="w-5 h-5" />
          <span class="text-sm text-center">Transferir<br />Dinero</span>
        </button>
        <button
          @click="handleAction"
          class="card-action-button flex items-center border-2 border-primary-450 justify-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <ArrowRightEndOnRectangleIcon class="w-5 h-5" />
          <span class="text-sm text-center">Ingresar<br />Dinero</span>
        </button>
        <button
          @click="handleAction"
          class="card-action-button flex items-center border-2 border-primary-450 justify-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <ClockIcon class="w-5 h-5" />
          <span class="text-sm text-center">Historial<br />de Cuenta</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const props = defineProps({
  enterprice: {
    type: String,
    required: true,
  },
  cbu: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: 'Crédito',
  },
});

const showBalance = ref(true);
const toggleBalance = () => {
  showBalance.value = !showBalance.value;
};

const handleAction = () => {
  console.log(`Acción realizada en la tarjeta: ${props.enterprice}`);
};
</script>

<style scoped>
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-action-button {
  flex: 1;
  min-width: 100px;
}
</style>