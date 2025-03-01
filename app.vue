<template>
  <NuxtLayout>
    <NuxtPage />
    
    <!-- Modal de advertencia -->
        <SessionWarningModal
      :is-open="$inactivity.isWarningOpen.value"
      @close="$inactivity.logout"
      @continue="$inactivity.closeWarning"
    />
  </NuxtLayout>
  
</template>
<script setup lang="ts">
import SessionWarningModal from '@/components/SessionWarningModal.vue';
const { $inactivity } = useNuxtApp();

</script>