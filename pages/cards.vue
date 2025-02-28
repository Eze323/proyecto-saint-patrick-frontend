<template>
  <div class="p-4">
    <!-- Título y selección de tarjeta -->
    <h1 class="text-2xl font-bold mb-4">Tarjetas</h1>
    <div class="flex items-center gap-3 mb-6">
      <p class="text-lg">Mis Tarjetas</p>
      <select class="bg-[#4f8484] text-white p-2 rounded-lg border-none text-base">
        <option>Seleccionar Tarjeta</option>
        <option v-for="card in mappedCards" :key="card.cardNumber">{{ card.title }}</option>
      </select>
    </div>

    <!-- Grid de tarjetas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <CardGeneric
        v-for="(card) in mappedCards"
        :type="card.type"
        :title="card.title"
        :card-number="card.cardNumber"
        :holder="card.holder"
        :expiry="card.expiry"
        :action-label="card.actionLabel"
        :cvc="card.cvc"
        :balance="card.balance"
        :issuer="card.issuer"
        :currency="card.currency"
        :key="card.cardNumber"
      />
    </div>

    <!-- Acciones -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 ">
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
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
import CardGeneric from '@/components/CardGeneric.vue';

definePageMeta({
  layout: 'authenticated', // Usa el layout para usuarios logueados
});

// Obtener el store de autenticación
const authStore = useAuthStore();

// Extraer el usuario del store manteniendo la reactividad
const { user } = storeToRefs(authStore);

// Función de mapeo para transformar las tarjetas del backend
const mappedCards = computed(() => {
  if (!user.value?.cards) return [];

  return user.value.cards.map((card) => ({
    
    title: `Tarjeta ${card.type}`,
    cardNumber: card.cardNumber,
    holder: card.holder,
    expiry: card.expiry,
    balance: card.balance,
    limit:card.limit,
    issuer: card.issuer,
    currency: card.currency,
    type: card.type,
    isVirtual: card.isVirtual,
    cvc: card.cvc,
    actionLabel: 'Ver Detalles',
  }));
});
</script>