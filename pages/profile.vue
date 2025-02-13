<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Perfil</h1>
      <CustomCard>
        <UForm @submit.prevent="updateProfile" class="space-y-6">
          <UFormGroup label="Nombre" name="name">
            <UInput
              v-model="name"
              icon="i-heroicons-user"
              placeholder="Nombre completo"
            />
          </UFormGroup>
  
          <UFormGroup label="Correo Electrónico" name="email">
            <UInput
              v-model="email"
              type="email"
              icon="i-heroicons-envelope"
              placeholder="correo@ejemplo.com"
            />
          </UFormGroup>
  
          <UButton
            type="submit"
            label="Actualizar Perfil"
            icon="i-heroicons-check"
            block
            :loading="isLoading"
          />
        </UForm>
      </CustomCard>
    </div>
  </template>
  
  <script setup lang="ts">
  const name = ref('Juan Pérez');
  const email = ref('juan.perez@example.com');
  const isLoading = ref(false);
  
  const updateProfile = async () => {
    isLoading.value = true;
    try {
      // Lógica de actualización
      await $fetch('/api/profile', {
        method: 'PUT',
        body: { name: name.value, email: email.value }
      });
      useToast().add({
        title: 'Perfil actualizado',
        icon: 'i-heroicons-check-circle',
        color: 'green'
      });
    } catch (error) {
      useToast().add({
        title: 'Error al actualizar',
        icon: 'i-heroicons-exclamation-circle',
        color: 'red'
      });
    } finally {
      isLoading.value = false;
    }
  };
  </script>