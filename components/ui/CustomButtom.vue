<template>
    <button
      :class="[
        'btn-primary',
        'px-4 py-2 rounded-md transition-colors',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
      :disabled="disabled"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps({
    disabled: {
      type: Boolean,
      default: false
    }
  });
  </script>