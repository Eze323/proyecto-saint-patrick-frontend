<template>
    <button
      class="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
      @click="$emit('click')"
    >
      {{ label }}
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps({
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
  });
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>