<template  >
    <div>
        <h1> Perfil </h1>
        
    </div>
</template>
<script setup>
  definePageMeta({
  layout: 'authenticated', // Usa el layout para usuarios logueados
});
const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>