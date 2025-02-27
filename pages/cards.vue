<template>
  <div class="p-4">
    <!-- Título y selección de tarjeta -->
    <h1 class="text-2xl font-bold mb-4">Tarjetas</h1>
    <div class="flex items-center gap-3 mb-6">
      <p class="text-lg">Mis Tarjetas</p>
      <select class="bg-[#4f8484] text-white p-2 rounded-lg border-none text-base">
        <option>Seleccionar Tarjeta</option>
      </select>
    </div>

    <!-- Grid de tarjetas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <!-- Tarjeta Débito -->
      <div class="bg-[#7bbbb0] rounded-lg shadow-md">
        <div class="p-4">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Parte frontal de la tarjeta -->
            <div class="bg-[#4f8484] p-4 rounded-lg text-white w-full md:w-1/2">
              <img src="/MasterCard.webp" alt="MasterCard" class="w-12 h-auto mb-4" />
              <h2 class="text-sm font-semibold">Saldo Disponible</h2>
              <p class="text-2xl font-bold">$ 35.621,00</p>
              <p class="text-base">4546********1478</p>
              <p class="text-sm flex justify-between">
                Nicolas E. Gómez <span class="text-right">12/27</span>
              </p>
            </div>

            <!-- Parte trasera de la tarjeta -->
            <div class="w-full md:w-1/2 p-4">
              <h2 class="text-xl font-bold border-b-2 border-black inline-block">Tarjeta Débito</h2>
              <p class="text-sm mt-2"><strong>Tipo:</strong> Física <span class="text-xs">⚫</span></p>
              <p class="text-sm">Número de tarjeta</p>
              <p class="text-base">4546-9896-2357-1478 <span class="text-xs">👁</span></p>
              <p class="text-sm">Fecha de vencimiento</p>
              <p class="text-sm"><strong>12/27</strong></p>
              <p class="text-sm">CVC</p>
              <p class="text-xs">*** <span class="text-sm">🔒</span> Token Requerido</p>
            </div>
          </div>
        </div>

        <!-- Botón "Ver Más" -->
        <div class="bg-[#7bbbb0] p-4 flex justify-center">
          <button class="bg-[#004d40] text-white px-6 py-2 rounded-lg w-full max-w-md">
            Ver Más
          </button>
        </div>
      </div>

      <!-- Tarjeta Crédito -->
      <div class="bg-[#b5b1e3] rounded-lg shadow-md">
        <div class="p-4">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Parte frontal de la tarjeta -->
            <div class="bg-[#d6c8f7] p-4 rounded-lg text-black w-full md:w-1/2">
              <img src="/MasterCard.webp" alt="MasterCard" class="w-12 h-auto mb-4" />
              <h2 class="text-sm font-semibold">Último resumen</h2>
              <p class="text-2xl font-bold">$ 0,0</p>
              <p class="text-base">5611********4343</p>
              <p class="text-sm flex justify-between">
                Nicolas E. Gómez <span class="text-right">12/27</span>
              </p>
            </div>

            <!-- Parte trasera de la tarjeta -->
            <div class="w-full md:w-1/2 p-4">
              <h2 class="text-xl font-bold border-b-2 border-black inline-block">Tarjeta Crédito</h2>
              <p class="text-sm mt-2"><strong>Tipo:</strong> Física <span class="text-xs">⚫</span></p>
              <p class="text-sm">Número de tarjeta</p>
              <p class="text-base">5611-9878-2003-4343 <span class="text-xs">👁</span></p>
              <p class="text-sm">Fecha de vencimiento</p>
              <p class="text-sm"><strong>12/27</strong></p>
              <p class="text-sm">CVC</p>
              <p class="text-xs">*** <span class="text-sm">🔒</span> Token Requerido</p>
            </div>
          </div>
        </div>

        <!-- Botón "Ver Más" -->
        <div class="bg-[#b5b1e3] p-4 flex justify-center">
          <button class="bg-[#5a54a2] text-white px-6 py-2 rounded-lg w-full max-w-md">
            Ver Más
          </button>
        </div>
      </div>
    </div>

    <!-- Acciones -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Resúmenes -->
      <div class="bg-[#5f8d8d] p-4 rounded-lg flex items-center gap-4">
        <div class="w-12 h-12 flex items-center justify-center">
          <img src="/moneda_1.webp" alt="Resúmenes" class="w-8 h-8" />
        </div>
        <div>
          <p class="text-xs">Chequea y descarga tus</p>
          <button class="text-black font-bold text-lg">Resúmenes</button>
        </div>
      </div>

      <!-- Bloqueo de PIN -->
      <div class="bg-[#5f8d8d] p-4 rounded-lg flex items-center gap-4">
        <div class="w-12 h-12 flex items-center justify-center">
          <img src="/moneda_2.webp" alt="Bloqueo PIN" class="w-8 h-8" />
        </div>
        <div>
          <p class="text-xs">Bloqueo y desbloqueo de</p>
          <button class="text-black font-bold text-lg">PIN Tarjeta</button>
        </div>
      </div>

      <!-- Aumentar límites -->
      <div class="bg-[#5f8d8d] p-4 rounded-lg flex items-center gap-4">
        <div class="w-12 h-12 flex items-center justify-center">
          <img src="/moneda_3.webp" alt="Aumentar límites" class="w-8 h-8" />
        </div>
        <div>
          <p class="text-xs">Aumenta tus</p>
          <button class="text-black font-bold text-lg">Límites</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'authenticated', // Usa el layout para usuarios logueados
});
</script>