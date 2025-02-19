<template>
    <div class="cards-page">
      <h1>Tarjetas</h1>
      <p>Aquí puedes gestionar tus tarjetas.</p>
  
      <div class="cards-grid">
        <Card
          title="Tarjeta Principal"
          card-number="1234567890123456"
          holder="Juan Pérez"
          expiry="12/25"
          type="Crédito"
          action-label="Ver Detalles"
        />
        <Card
          title="Tarjeta Secundaria"
          card-number="9876543210987654"
          holder="Juan Pérez"
          expiry="06/24"
          type="Débito"
          action-label="Ver Detalles"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Card from '~/components/Card.vue';
  
  definePageMeta({
    layout: 'authenticated', // Usa el layout para usuarios logueados
  });
  </script>
  
  <style scoped>
  .cards-page {
    padding: 2rem;
  }
  
  .cards-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }
  </style>