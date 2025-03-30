<template>
  <div class="bg-[#7bbbb0] rounded-lg shadow-xl overflow-hidden">
    <div class="p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Parte frontal de la tarjeta -->
        <div class="bg-[#4f8484] p-4 rounded-lg text-white w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <img :src="`${issuer}.webp`" :alt="issuer" class="w-12 h-auto mb-4" />
            <h2 class="text-sm font-semibold">Saldo Disponible</h2>
            <p class="text-2xl font-bold">$ {{ balance }}</p>
          </div>
          <div class="mt-4">
            <p class="text-base">{{ formatCardNumber(cardNumber) }}</p>
            <p class="text-sm flex justify-between">
              <span class="text-left">{{ holder }}</span>
              <span class="text-right">{{ expiry }}</span>
            </p>
          </div>
        </div>

        <!-- Parte trasera de la tarjeta -->
        <div class="w-full md:w-1/2 p-4">
          <h2 class="text-xl font-bold border-b-2 border-black inline-block">Tarjeta {{ type }}</h2>
          <p class="text-sm mt-2"><strong>Tipo:</strong> {{ type }} <span class="text-xs">⚫</span></p>
          <p class="text-sm">Número de tarjeta</p>
          <p class="text-base">{{ formatCardNumber(cardNumber) }} <span class="text-xs">👁</span></p>
          <p class="text-sm">Fecha de vencimiento</p>
          <p class="text-sm"><strong>{{ expiry }}</strong></p>
          <p class="text-sm">CVC</p>
          <p class="text-xs">{{ cvc || '***' }} <span class="text-sm">🔒</span> Token Requerido</p>
        </div>
      </div>
    </div>

    <!-- Botón "Ver Más" -->
    <div class="bg-[#7bbbb0] p-4 flex justify-center">
      <button
        @click="handleAction"
        class="bg-[#004d40] text-white px-6 py-2 rounded-lg w-full max-w-md hover:bg-[#00382e] transition-colors"
      >
        Ver Detalles
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">


// Props con tipado
const props = defineProps<{
  issuer: string;
  cardNumber: string;
  holder: string;
  expiry: string;
  balance: number;
  currency: string;
  type: string;
  cvc?: string;
  actionLabel: string;
}>();

// Función para formatear el número de tarjeta
const formatCardNumber = (cardNumber: string) => {
  const firstFourDigits = cardNumber.slice(0, 4);
  const lastFourDigits = cardNumber.slice(-4);
  return `${firstFourDigits} **** **** ${lastFourDigits}`;
};

// Lógica para manejar la acción del botón
const handleAction = () => {
  console.log(`Acción realizada en la tarjeta: ${props.cardNumber}`);
};
</script>