<template>
  <div class="p-4">
    <h1 class="text-2xl lg:text-3xl font-bold mb-4">Cuentas</h1>

    <!-- Mostrar un mensaje de carga si los datos no están listos -->
    <div v-if="!user" class="text-center py-4">Cargando datos del usuario...</div>

    <!-- Mostrar los datos del usuario una vez cargados -->
    <div v-else>
      <!-- Sección de cuentas -->
      <div class="accounts-section py-4">
        <h2 class="text-primary text-xl lg:text-2xl font-semibold mb-4">Saldos y movimientos</h2>
        <div class="account-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardAccount
            v-for="account in user.accounts"
            :key="account.cbu"
            :enterprice="account.enterprice"
            :cbu="account.cbu"
            :balance="account.balance"
            :type="account.type"
          />
        </div>
      </div>

      <!-- Sección de transacciones -->
      <div class="transactions-section py-4">
        <h2 class="text-primary text-xl lg:text-2xl font-semibold mb-4">Últimas transacciones</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b">Fecha</th>
                <th class="py-2 px-4 border-b">Destinatario</th>
                <th class="py-2 px-4 border-b">Descripción</th>
                <th class="py-2 px-4 border-b">Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in user.transactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="py-2 px-4 border-b">{{ transaction.date }}</td>
                <td class="py-2 px-4 border-b">{{ transaction.recipient }}</td>
                <td class="py-2 px-4 border-b">{{ transaction.description }}</td>
                <td
                  class="py-2 px-4 border-b"
                  :class="{ 'text-red-500': transaction.amount < 0, 'text-green-500': transaction.amount >= 0 }"
                >
                  {{ transaction.amount }} USD
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

// Obtener el store de autenticación
const authStore = useAuthStore();

// Extraer el usuario del store manteniendo la reactividad
const { user } = storeToRefs(authStore);

definePageMeta({ layout: 'authenticated' });
</script>

<style scoped>
/* Estilos personalizados */
.account-cards {
  display: grid;
  gap: 1rem;
}

.transactions-section table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-section th,
.transactions-section td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.transactions-section th {
  background-color: #f9fafb;
  font-weight: 600;
}

.transactions-section tr:hover {
  background-color: #f3f4f6;
}
</style>