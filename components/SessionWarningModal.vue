

<template>
  <Dialog :open="isOpen" @close="$emit('close')" class="relative z-50">
    <!-- Fondo oscuro -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- Contenedor del modal -->
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="max-w-sm w-full bg-white rounded-lg p-6 shadow-lg">
        <!-- Ícono y título -->
        <div class="flex flex-col items-center">
          <ExclamationTriangleIcon class="h-28 w-28 text-yellow-500 mb-2" aria-hidden="true" />
          <DialogTitle class="text-lg font-semibold text-gray-900">
            Cierre de sesión automático
          </DialogTitle>
        </div>

        <!-- Mensaje -->
        <p class="mt-2 text-sm text-gray-600 text-center">
          Por tu seguridad cerraremos la sesión en 5 segundos por inactividad. Para continuar por favor presiona el botón "Continuar".
        </p>

        <!-- Botones centrados -->
        <div class="mt-6 flex justify-center gap-4">
            <button
              @click="$emit('close')"
              class="px-4 py-2 bg-white text-primary border-2 border-primary rounded hover:bg-gray-300 focus:outl+-+ine-none focus:ring-2 focus:ring-primary-450"
            >
              Cerrar sesión
            </button>
          <button
            @click="$emit('continue')"
            class="px-4 py-2 bg-primary text-secondary rounded hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-450"
          >
            Continuar
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
<script setup lang="ts">

import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'; // Ícono de alerta

  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean, // Asegúrate de que es Boolean, no Ref<Boolean>
      required: true,
    },
  });
  
  const emit = defineEmits(['close', 'continue']);
  
  const closeModal = () => {
    emit('close');
  };
  
  const continueSession = () => {
    emit('continue');
  };
  </script>