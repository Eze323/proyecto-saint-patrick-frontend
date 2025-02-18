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
  definePageMeta({ layout: "authenticated" });
</script>