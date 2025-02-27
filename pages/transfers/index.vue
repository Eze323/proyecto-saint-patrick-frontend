<template>
    <div class="transfers-page">
        <h1>Transferencias</h1>
        <p>Aquí puedes realizar transferencias entre tus cuentas.</p>
    
        <div class="transfers-grid">
        <TransferForm />
        </div>
    </div>
</template>
<script setup lang="ts">

import TransferForm from '~/components/TransferForm.vue';





  definePageMeta({ 
    layout: "authenticated",
    //ssr: false, // Opcional: Desactiva SSR para esta página
  });
</script>