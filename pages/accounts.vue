<template>
  <div class="p-4">
    <!-- Título -->
    <h1 class="text-2xl lg:text-3xl font-bold mb-6">Cuentas</h1>

    <!-- Mensaje de carga -->
    <div v-if="!user" class="text-center py-4">Cargando datos del usuario...</div>

    <!-- Datos del usuario -->
    <div v-else>
      <!-- Sección de cuentas -->
      <div class="accounts-section mb-8">
        <h2 class="text-primary text-xl lg:text-2xl font-semibold mb-4">Saldos y movimientos</h2>
        <div class="account-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardAccount
            v-for="account in user.accounts"
            :key="account.cbu"
            :enterprise="account.enterprise"
            :cbu="account.cbu"
            :balance="account.balance"
            :type="account.type"
            @transfers="handleTransfer"
          />
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

const router = useRouter();

const handleTransfer = (cbu: string) => {
  navigateTo({ path: '/transfers', query: { selectedAccount: cbu } });
}

</script>

<style scoped>
/* Estilos personalizados */
.account-cards {
  display: grid;
  gap: 1.5rem;
}

.transactions-section table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-section th,
.transactions-section td {
  padding: 0.75rem 1rem;
  text-align: left;
}

.transactions-section th {
  background-color: #f9fafb;
  font-weight: 600;
}

.transactions-section tr:hover {
  background-color: #f3f4f6;
}

/* Ajustes para pantallas grandes */
@media (min-width: 1024px) {
  .transactions-section table {
    min-width: 100%;
  }
}
</style>