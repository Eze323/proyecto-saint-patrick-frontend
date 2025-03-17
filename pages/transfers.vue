<template>
  <div class="transfers-page">
    <h1>Transferencias</h1>

    <div class="transfers-grid">
      <!-- Pasar el selectedAccount como prop al componente TransferForm -->
      <TransferForm :selected-account="selectedAccount" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'; // O 'nuxt/app' si prefieres usar Nuxt
import TransferForm from '~/components/TransferForm.vue';

// Obtener la ruta actual
const route = useRoute();

// Obtener el valor de selectedAccount desde la query
const selectedAccount = ref<string>(route.query.selectedAccount as string || '');

definePageMeta({
  layout: 'authenticated',
});
</script>