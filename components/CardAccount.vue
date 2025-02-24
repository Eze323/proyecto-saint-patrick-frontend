<template>
    <div class="card bg-primary shadow-lg">
      <!-- Header -->
      <div class="card-header">
        <p class="card-enterprice">{{ enterprice }}</p>
        <span class="card-type">{{ type }}</span>
      </div>
  
      <!-- Body -->
      <div class="card-body">
        <!-- Saldo -->
        <div class="flex items-center justify-between mb-4">
          <span class="card-saldo">Saldo</span>
          <div class="balance-container">
            <p class="card-balance">${{ showBalance ? balance.toLocaleString() : '••••••' }}</p>
            <button class="eye-toggle" @click="toggleBalance">
              <EyeIcon v-if="showBalance" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>
  
        <!-- Línea divisoria -->
        <hr class="border-t border-gray-300 my-4" />
  
        <!-- CBU -->
        <div class="text-left">
          <p class="text-sm font-medium text-gray-700">CBU</p>
          <p class="card-cbu">{{ cbu }}</p>
        </div>
      </div>
  
      <!-- Footer -->
      <div class="card-footer">
        <div class="button-group">
          <button @click="handleAction" class="card-action-button">
            <ArrowRightStartOnRectangleIcon class="w-5 h-5 mr-2" /> Transferir<br />Dinero
          </button>
          <button @click="handleAction" class="card-action-button">
            <ArrowRightEndOnRectangleIcon class="w-5 h-5 mr-2" /> Ingresar<br />Dinero
          </button>
          <button @click="handleAction" class="card-action-button">
            <ClockIcon class="w-5 h-5 mr-2" />Historial<br />de Cuenta
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    ArrowRightStartOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
    ClockIcon,
    EyeIcon,
    EyeSlashIcon,
  } from '@heroicons/vue/24/outline';
  import { ref } from 'vue';
  
  const props = defineProps({
    enterprice: {
      type: String,
      required: true,
    },
    cbu: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: 'Crédito',
    },
    actionLabel: {
      type: String,
      default: 'Ver Detalles',
    },
  });
  
  const showBalance = ref(true);
  const toggleBalance = () => {
    showBalance.value = !showBalance.value;
  };
  
  const handleAction = () => {
    console.log(`Acción realizada en la tarjeta: ${props.enterprice}`);
  };
  </script>
  
  <style scoped>
  .card {
    background: #f7f9fc;
    border-radius: 12px;
    overflow: hidden;
    max-width: 440px;
    margin: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 2px solid #488586;
    color: black;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .card-type {
    font-size: 0.75rem;
    background: #dcb249c0;
    color: black;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-weight: 500;
  }
  
  .card-enterprice {
    font-size: 1rem;
    font-weight: 500;
    color: black;
    margin: 0;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .balance-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .card-balance {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    color: black;
  }
  
  .eye-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    color: black;
    opacity: 0.8;
  }
  
  .eye-toggle:hover {
    opacity: 1;
  }
  
  .card-cbu {
    font-size: 0.875rem;
    font-weight: 400;
    color: black;
    margin: 0;
  }
  
  .card-footer {
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
  
  .card-action-button {
    color: black;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.675rem;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid #488586;
    flex: 1; /* Distribuye el espacio equitativamente */
  }
  
  .card-action-button:hover {
    background: #488586;
  }
  </style>