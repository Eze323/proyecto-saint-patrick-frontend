<!-- components/GastosExplicadosCard.vue -->
<template>
    <div class="gastos-card bg-primary-450 p-4 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold text-yellow-300 mb-4">Gastos Explicados:</h3>
      <div class="space-y-3">
        <div class="flex items-center">
          <span class="text-sm text-gray-600 w-24">39% Transf.</span>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-yellow-300 h-2.5 rounded-full" style="width: 39%"></div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-secondary w-24">20% Tiendas</span>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-yellow-300 h-2.5 rounded-full" style="width: 20%"></div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-gray-600 w-24">10% Otro</span>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-yellow-300 h-2.5 rounded-full" style="width: 10%"></div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-gray-600 w-24">2% Apps</span>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-yellow-300 h-2.5 rounded-full" style="width: 2%"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No se necesitan importaciones adicionales por ahora
  </script>