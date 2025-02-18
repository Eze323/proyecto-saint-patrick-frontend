<template>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ title }}</h3>
        <span class="card-type">{{ type }}</span>
      </div>
      <div class="card-body">
        <p class="card-number">{{ formattedCardNumber }}</p>
        <div class="card-details">
          <p class="card-holder">{{ holder }}</p>
          <p class="card-expiry">{{ expiry }}</p>
        </div>
      </div>
      <div class="card-footer">
        <button @click="handleAction" class="card-action-button">
          {{ actionLabel }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    holder: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'Crédito', // Puede ser 'Crédito' o 'Débito'
    },
    actionLabel: {
      type: String,
      default: 'Ver Detalles',
    },
  });
  
  const formattedCardNumber = computed(() => {
    // Formatea el número de tarjeta para mostrarlo como **** **** **** 1234
    const lastFourDigits = props.cardNumber.slice(-4);
    return `**** **** **** ${lastFourDigits}`;
  });
  
  const handleAction = () => {
    // Lógica para manejar la acción del botón
    console.log(`Acción realizada en la tarjeta: ${props.title}`);
  };
  </script>
  
  <style scoped>
  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 300px;
    margin: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .card-header {
    background: #4a5568;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-title {
    margin: 0;
    font-size: 1.25rem;
  }
  
  .card-type {
    font-size: 0.875rem;
    background: #2d3748;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .card-number {
    font-size: 1.125rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }
  
  .card-details {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #718096;
  }
  
  .card-footer {
    padding: 1rem;
    background: #f7fafc;
    text-align: center;
  }
  
  .card-action-button {
    background: #4299e1;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .card-action-button:hover {
    background: #3182ce;
  }
  </style>