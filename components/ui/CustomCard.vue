<template>
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 v-if="title" class="text-xl font-bold mb-4">{{ title }}</h3>
      <slot />
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: ''
    }
  });
  </script>