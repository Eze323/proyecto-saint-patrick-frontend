<template>
  <div class="p-1">
    <h1 class="text-3xl font-bold mb-2">Cuentas</h1>
  

    <!-- Mostrar un mensaje de carga si los datos no están listos -->
    <div v-if="!user">Cargando datos del usuario...</div>

    <!-- Mostrar los datos del usuario una vez cargados -->
    <div v-else>
      <!-- Sección de información del perfil -->
      <!-- <div class="profile-section">
        <h2>Perfil</h2>
        <p><strong>Nombre:</strong> {{ user.profile.name }}</p>
        <p><strong>Email:</strong> {{ user.profile.email }}</p>
        <p><strong>Saldo total:</strong> {{ user.balance }} USD</p>
      </div> -->

      <!-- Sección de cuentas -->
      <div class="accounts-section py-4">
        <h2 class="text-primary text-2xl">Saldos y movimientos</h2>
        <div class="account-cards">
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

      <!-- Sección de tarjetas -->
      <!-- <div class="cards-section">
        <h2>Tarjetas</h2>
        <div class="card-cards">
          <div v-for="card in user.cards" :key="card.cardNumber" class="card-card">
            <h3>Tarjeta de {{ card.type }}</h3>
            <p><strong>Número de tarjeta:</strong> {{ card.cardNumber }}</p>
            <p><strong>Límite:</strong> {{ card.limit }} USD</p>
          </div>
        </div>
      </div> -->

      <!-- Sección de transacciones -->
      <div class="transactions-section">
        <h2>Últimas transacciones</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Destinatario</th>
              <th>Descripción</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in user.transactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.recipient }}</td>
              <td>{{ transaction.description }}</td>
              <td :class="{ 'negative': transaction.amount < 0, 'positive': transaction.amount >= 0 }">
                {{ transaction.amount }} USD
              </td>
            </tr>
          </tbody>
        </table>
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
.accounts-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-section,
.accounts-section,
.cards-section,
.transactions-section {
  margin-bottom: 40px;
}

h2 {
 
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.account-cards,
.card-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.account-card,
.card-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
}

.negative {
  color: red;
}

.positive {
  color: green;
}
</style>