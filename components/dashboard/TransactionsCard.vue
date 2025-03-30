<!-- components/UltimasTransaccionesCard.vue -->
<template>
  <div class="transacciones-card bg-white p-4 rounded-lg shadow-md">
    <div class="flex flex-col items-start mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Últimas Transacciones</h3>
      <!-- Filtros debajo del título -->
      <div class="flex space-x-4 mt-2">
        <button
          @click="filtro = 'todo'"
          :class="filtro === 'todo' ? 'text-teal-600 font-medium' : 'text-gray-600 hover:text-gray-800'"
        >
          Todo
        </button>
        <button
          @click="filtro = 'pagos'"
          :class="filtro === 'pagos' ? 'text-teal-600 font-medium' : 'text-gray-600 hover:text-gray-800'"
        >
          Pagos
        </button>
        <button
          @click="filtro = 'transferencias'"
          :class="filtro === 'transferencias' ? 'text-teal-600 font-medium' : 'text-gray-600 hover:text-gray-800'"
        >
          Transferencias
        </button>
      </div>
    </div>
    <div class="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
      <div
        v-for="(transaccion, index) in transaccionesFiltradas"
        :key="index"
        class="flex items-center justify-between py-2 border-b border-yellow-300"
      >
        <div class="flex items-center">
          <component :is="getIcon(transaccion.description)" class="h-8 w-8 text-teal-600 mr-3" />
          <div>
            <p class="text-sm font-medium text-gray-800">{{ transaccion.recipient }}</p>
            <p class="text-xs text-gray-600">{{ transaccion.description }}</p>
          </div>
        </div>
        <p
          :class="transaccion.amount >= 0 ? 'text-green-600' : 'text-red-600'"
          class="text-sm font-medium"
        >
          {{ formatAmount(transaccion.amount) }}
        </p>
      </div>
      <div v-if="!transaccionesFiltradas.length" class="text-sm text-gray-600 text-center">
        No hay transacciones disponibles.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  ShoppingCartIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  ArrowUpTrayIcon,
  BuildingStorefrontIcon,
  GlobeAltIcon,
  ArrowDownTrayIcon,
  DevicePhoneMobileIcon,
  CakeIcon,
  BanknotesIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  TagIcon,
  CreditCardIcon,
} from '@heroicons/vue/24/outline';
import type { UserProfile } from '~/utils/types';

// Definimos las props con tipado
const props = defineProps<{
  user?: UserProfile | null; // Hacemos que user sea opcional
}>();

// Estado reactivo para el filtro
const filtro = ref('todo');

// Mapeo de descripciones a íconos
const iconMap: { [key: string]: any } = {
  'Compra en supermercado': ShoppingCartIcon,
  'Depósito de sueldo': ArrowUpTrayIcon,
  'Pago de servicio de streaming': GlobeAltIcon,
  'Transferencia enviada': ArrowDownTrayIcon,
  'Transferencia recibida': ArrowUpTrayIcon,
  'Compra en farmacia': PlusCircleIcon,
  'Compra en almacén': ShoppingBagIcon,
  'Compra en restaurante': BuildingStorefrontIcon,
  'Compra en tienda': DevicePhoneMobileIcon,
  'Compra en panadería': CakeIcon,
  'Compra en librería': BookOpenIcon,
  'Compra de ropa': ShieldCheckIcon,
  'Compra en cafetería': TagIcon,
};

// Obtenemos las transacciones del usuario
const transacciones = computed(() => {
  return props.user?.transactions || [];
});


// Filtrar transacciones según el filtro seleccionado
const transaccionesFiltradas = computed(() => {
  if (filtro.value === 'todo') return transacciones.value;
  if (filtro.value === 'pagos') return transacciones.value.filter((t) => t.amount < 0);
  if (filtro.value === 'transferencias') return transacciones.value.filter((t) => t.description.toLowerCase().includes('transferencia'));
  return transacciones.value;
});

// Función para formatear el monto
const formatAmount = (amount: number): string => {
  const sign = amount >= 0 ? '+' : '-';
  return `${sign}$${Math.abs(amount).toLocaleString('es-AR')}`;
};

// Función para obtener el ícono según la descripción
const getIcon = (description: string) => {
  const descLower = description.toLowerCase();
  if (descLower.includes('supermercado')) return ShoppingCartIcon;
  if (descLower.includes('deposito') || descLower.includes('sueldo')) return ArrowUpTrayIcon;
  if (descLower.includes('streaming')) return GlobeAltIcon;
  if (descLower.includes('transferencia')) return descLower.includes('enviada') ? ArrowDownTrayIcon : ArrowUpTrayIcon;
  if (descLower.includes('farmacia')) return PlusCircleIcon;
  if (descLower.includes('almacén')) return ShoppingBagIcon;
  if (descLower.includes('restaurante')) return BuildingStorefrontIcon;
  if (descLower.includes('tienda')) return DevicePhoneMobileIcon;
  if (descLower.includes('panadería')) return CakeIcon;
  if (descLower.includes('librería')) return BookOpenIcon;
  if (descLower.includes('ropa')) return ShieldCheckIcon;
  if (descLower.includes('cafetería')) return TagIcon;
  return CreditCardIcon; // Ícono por defecto
};
</script>

<style scoped>
.transacciones-card {
  min-height: 400px; /* Altura mínima para asegurar visibilidad */
}

/* Aseguramos que las transacciones sean legibles */
.text-sm {
  line-height: 1.25; /* Mejora la legibilidad */
}
</style>