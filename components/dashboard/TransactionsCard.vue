<!-- components/UltimasTransaccionesCard.vue -->
<template>
    <div class="transacciones-card bg-teal-100 p-4 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Últimas Transacciones</h3>
        <div class="flex space-x-2">
          <button class="text-gray-600 hover:text-gray-800">Todo</button>
          <button class="text-gray-600 hover:text-gray-800">Pagos</button>
          <button class="text-gray-600 hover:text-gray-800">Transferencias</button>
        </div>
      </div>
      <div class="space-y-4">
        <div v-for="(transaccion, index) in transacciones" :key="index" class="flex items-center justify-between">
          <div class="flex items-center">
            <component :is="transaccion.icon" class="h-8 w-8 text-teal-600 mr-3" />
            <div>
              <p class="text-sm font-medium text-gray-800">{{ transaccion.nombre }}</p>
              <p class="text-xs text-gray-600">{{ transaccion.categoria }}</p>
            </div>
          </div>
          <p :class="transaccion.monto.startsWith('+') ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
            {{ transaccion.monto }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ShoppingCartIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';
  
  const transacciones = [
    { nombre: 'Central Burger', categoria: 'Restaurante', monto: '-$189.36', icon: ShoppingCartIcon },
    { nombre: 'Carrefour', categoria: 'Supermercado', monto: '-$92.50', icon: ShoppingCartIcon },
    { nombre: 'Ana Aguilar', categoria: 'Transferencia', monto: '+$350', icon: ArrowLeftOnRectangleIcon },
    { nombre: 'Carrefour', categoria: 'Supermercado', monto: '-$36.20', icon: ShoppingCartIcon },
    { nombre: 'Central Burger', categoria: 'Restaurante', monto: '-$189.36', icon: ShoppingCartIcon },
    
  ];
  </script>