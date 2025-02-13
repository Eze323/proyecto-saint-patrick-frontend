<template>
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <slot></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>