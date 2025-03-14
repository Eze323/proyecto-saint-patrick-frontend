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
            <component :is="transaccion.icon" class="h-8 w-8 text-teal-600 mr-3" />
            <div>
              <p class="text-sm font-medium text-gray-800">{{ transaccion.nombre }}</p>
              <p class="text-xs text-gray-600">{{ transaccion.categoria }}</p>
            </div>
          </div>
          <p
            :class="transaccion.monto.startsWith('+') ? 'text-green-600' : 'text-red-600'"
            class="text-sm font-medium"
          >
            {{ transaccion.monto }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ShoppingCartIcon,PlusCircleIcon,ShoppingBagIcon,ArrowUpTrayIcon,BuildingStorefrontIcon,GlobeAltIcon,ArrowDownTrayIcon, DevicePhoneMobileIcon, CakeIcon, BanknotesIcon, BookOpenIcon, ShieldCheckIcon, TagIcon, CreditCardIcon} from '@heroicons/vue/24/outline';
  
  const transacciones = [
  { nombre: 'Supermercado Eco', categoria: 'Supermercado', monto: '-$210.60', icon: ShoppingCartIcon },
  { nombre: 'Farmacia Salud', categoria: 'Farmacia', monto: '-$89.30', icon: PlusCircleIcon },
  { nombre: 'Mercado Fresco', categoria: 'Supermercado', monto: '-$112.75', icon: ShoppingBagIcon },
  { nombre: 'Juan Pérez', categoria: 'Transferencia', monto: '+$400.00', icon: ArrowUpTrayIcon },
  { nombre: 'La Trattoria', categoria: 'Restaurante', monto: '-$245.50', icon:  BuildingStorefrontIcon },
  { nombre: 'Tienda Natural', categoria: 'Almacén', monto: '-$67.90', icon: BuildingStorefrontIcon },
  { nombre: 'El Sabor Argentino', categoria: 'Restaurante', monto: '-$310.25', icon: GlobeAltIcon },
  { nombre: 'María Gómez', categoria: 'Transferencia', monto: '+$150.00', icon: ArrowDownTrayIcon },
  { nombre: 'Electrónica Tech', categoria: 'Tienda', monto: '-$599.99', icon: DevicePhoneMobileIcon },
  { nombre: 'Panadería La Delicia', categoria: 'Panadería', monto: '-$45.80', icon: CakeIcon },
  { nombre: 'Pedro Ramírez', categoria: 'Transferencia', monto: '+$275.00', icon: BanknotesIcon },
  { nombre: 'Librería Central', categoria: 'Librería', monto: '-$78.15', icon: BookOpenIcon },
  { nombre: 'Ropa Moda', categoria: 'Ropa', monto: '-$145.00', icon: ShieldCheckIcon },
  { nombre: 'Café Aromas', categoria: 'Cafetería', monto: '-$32.50', icon: TagIcon },
  { nombre: 'Luis Martínez', categoria: 'Transferencia', monto: '+$500.00', icon: CreditCardIcon},
];
  
  // Estado reactivo para el filtro
  const filtro = ref('todo');
  
  // Filtrar transacciones según el filtro seleccionado
  const transaccionesFiltradas = computed(() => {
    if (filtro.value === 'todo') return transacciones;
    if (filtro.value === 'pagos') return transacciones.filter(t => t.monto.startsWith('-'));
    if (filtro.value === 'transferencias') return transacciones.filter(t => t.monto.startsWith('+'));
    return transacciones;
  });
  </script>
  
  <style scoped>
  .transacciones-card {
    min-height: 400px; /* Altura mínima para asegurar visibilidad */
  }
  </style>