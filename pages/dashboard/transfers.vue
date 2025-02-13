<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Transferencias</h1>
      <CustomCard>
        <UForm @submit.prevent="transfer" class="space-y-6">
          <UFormGroup label="Cuenta Destino" name="account">
            <UInput
              v-model="account"
              icon="i-heroicons-banknotes"
              placeholder="Número de cuenta"
            />
          </UFormGroup>
  
          <UFormGroup label="Monto" name="amount">
            <UInput
              v-model="amount"
              type="number"
              icon="i-heroicons-currency-dollar"
              placeholder="0.00"
            />
          </UFormGroup>
  
          <UButton
            type="submit"
            label="Transferir"
            icon="i-heroicons-arrow-right"
            block
            :loading="isLoading"
          />
        </UForm>
      </CustomCard>
    </div>
  </template>
  
  <script setup lang="ts">
  const account = ref('');
  const amount = ref(0);
  const isLoading = ref(false);
  
  const transfer = async () => {
    isLoading.value = true;
    try {
      // Lógica de transferencia
      await $fetch('/api/transfers', {
        method: 'POST',
        body: { account: account.value, amount: amount.value }
      });
      useToast().add({
        title: 'Transferencia exitosa',
        icon: 'i-heroicons-check-circle',
        color: 'green'
      });
    } catch (error) {
      useToast().add({
        title: 'Error en la transferencia',
        icon: 'i-heroicons-exclamation-circle',
        color: 'red'
      });
    } finally {
      isLoading.value = false;
    }
  };
  </script>