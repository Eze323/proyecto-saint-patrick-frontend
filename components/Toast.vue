<template>
    <div class="fixed top-4 right-4 z-100 space-y-2">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="p-4 rounded-lg shadow-lg max-w-sm transition-all duration-500"
        :class="{
          'bg-green-500 text-white': notification.type === 'success',
          'bg-red-500 text-white': notification.type === 'error',
          'bg-blue-500 text-white': notification.type === 'info',
        }"
      >
        <div class="flex items-center justify-between">
          <span>{{ notification.message }}</span>
          <button @click="removeNotification(notification.id)" class="ml-4 text-white hover:text-gray-200">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { XMarkIcon } from '@heroicons/vue/24/solid';
  import { useNotifications } from '../composables/useNotifications';
  

  const { notifications, removeNotification } = useNotifications();

  </script>
  
  <style scoped>
  /* Animación de entrada/salida */
  @keyframes slideIn {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-100%); opacity: 0; }
  }
  
  .fixed {
    animation: slideIn 0.3s ease forwards;
  }
  
  .fixed:leave-active {
    animation: slideOut 0.3s ease forwards;
  }
  </style>