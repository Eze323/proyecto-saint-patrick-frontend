<template>
  <div class="cards-page">
    <h1 class="text-2xl font-bold mb-1">Tarjetas</h1>
    <div style="display: flex; align-items: center; gap: 10px;">
      <p style="font-size: 23px; margin: 0; ">Mis Tarjetas</p>
      <select class="select-card" style="background-color: #4f8484; color: white; padding: 10px; border-radius: 8px; border: none; font-size: 16px;">
        <option>Seleccionar Tarjeta</option>
      </select>
    </div>

    <div class="cards-grid">
      <!-- Tarjeta Débito -->
      <div class="card-container">
        <div class="card debit">
          <div class="card-body">
            <img src="/MasterCard.png" alt="Icono Resumenes" class="card-logo">
            <h1 class="card-title">Saldo Disponible</h1>
            <p class="amount">$ 35.621,00</p>
            <p class="card-number">4546********1478</p>
            <p class="card-holder">Nicolas E. Gómez <span class="expiry">12/27</span></p>
          </div>

          <div class="card-body-2">
            <h2 class="card-title-2">Tarjeta Débito</h2>
            <p class="info"><strong>Tipo:</strong> <b>Física</b> <span class="dot">⚫</span></p>
            <p class="status">Número de tarjeta</p>
            <p class="card-number-2">4546-9896-2357-1478 <span class="icon-eye">👁</span></p>
            <p class="expiration">Fecha de vencimiento</p>
            <p class="expiration"><strong>12/27</strong></p>
            <p class="expiration">CVC</p>
            <p class="cvc">*** <span class="lock">🔒</span> Token Requerido</p>
          </div>
        </div>

        <!-- Botón debajo de la tarjeta -->
        <div class="btn-container">
          <button class="btn-ver-mas">Ver Más</button>
        </div>
      </div>

      <!-- Tarjeta Crédito -->
      <div class="card-container">
        <div class="card credit">
          <div class="card-body-3">
            <img src="/MasterCard.png" alt="Icono Resumenes" class="card-logo">
            <h1 class="card-title">Último resumen</h1>
            <p class="amount">$ 0,0</p>
            <p class="card-number">5611********4343</p>
            <p class="card-holder">Nicolas E. Gómez <span class="expiry">12/27</span></p>
          </div>

          <div class="card-body-2">
            <h2 class="card-title-2">Tarjeta Crédito</h2>
            <p class="info"><strong>Tipo:</strong> <b>Physical</b> <span class="dot">⚫</span></p>
            <p class="status">Card number tarjeta</p>
            <p class="card-number-2">5611-9878-2003-4343 <span class="icon-eye">👁</span></p>
            <p class="expiration">Fecha de vencimiento</p>
            <p class="expiration"><strong>12/27</strong></p>
            <p class="expiration">CVC</p>
            <p class="cvc">*** <span class="lock">🔒</span> Token Requerido</p>
          </div>
        </div>

        <!-- Botón debajo de la tarjeta -->
        <div class="btn-container-2">
          <button class="btn-ver-mas">Ver Más</button>
        </div>
      </div>
    </div>

    <div class="actions-grid">
      <div class="action-card">
        <div class="icon">
          <img src="/moneda_1.png" alt="Icono Resumenes" />
        </div>
        <div class="text">
          <p style="font-size: 12px;">Chequea y descarga tus</p>
          <button class="btn-option">Resúmenes</button>
        </div>
      </div>

      <div class="action-card">
        <div class="icon">
          <img src="/moneda_2.png" alt="Icono Resumenes" />
        </div>
        <div class="text">
          <p style="font-size: 12px;">Bloqueo y desbloqueo de</p>
          <button class="btn-option">PIN Tarjeta</button>
        </div>
      </div>

      <div class="action-card">
        <div class="icon">
          <img src="/moneda_3.png" alt="Icono Resumenes" />
        </div>
        <div class="text">
          <p style="font-size: 12px;">Aumenta tus</p>
          <button class="btn-option">Límites</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '~/components/Card.vue';

definePageMeta({
  layout: 'authenticated', // Usa el layout para usuarios logueados
});
</script>

<style scoped>
.cards-page {
  padding: 2rem;
}

.select-card {
  background-color: #4f8484;
  color: white;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.cards-grid {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start; /* Cambiado a flex-start para alinear a la izquierda */
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  width: 480px;
  padding: 1rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
}

.debit {
  background-color: rgb(123, 187, 176);
  color: black;
}

.credit {
  background-color: #b5b1e3;
  color: black;
}

.card-body {
  background-color: #4f8484;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  text-align: left;
  color: black;
  font-family: Arial, sans-serif;
}

.card-body-2 {
  padding: 15px;
  width: 250px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.card-body-3 {
  background-color: rgb(214, 200, 247);
  padding: 15px;
  width: 250px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.card-logo {
  width: 50px;
  height: auto;
  margin-bottom: 10px;
}

.btn-container {
  background-color: rgb(123, 187, 176);
  width: 480px;
  height: 70px;
  display: flex;
  justify-content: center;
}

.btn-container-2 {
  background-color: #b5b1e3;
  width: 480px;
  height: 70px;
  display: flex;
  justify-content: center;
}

.btn-ver-mas {
  display: block;
  width: 100%;
  height: 50px;
  max-width: 450px;
  padding: 10px 20px;
  background-color: #004d40;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.btn-option {
  color: black;
  padding: 0.008rem;
  border: none;
  border-radius: 5px;
  width: 200px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}

.card-title {
  font-size: 14px;
  margin-bottom: 5px;
}

.card-title-2 {
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid black;
  padding-bottom: 3px;
  display: inline-block;
}

.amount {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.card-holder {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

.expiry {
  text-align: right;
}

.btn-ver-mas.credit {
  background-color: #5a54a2;
}

.icon-eye {
  font-size: 12px;
  margin-left: 5px;
}

.card-number {
  font-size: 16px;
  margin-bottom: 15px;
}

.card-number-2 {
  letter-spacing: 1px;
}

.actions-grid {
  display: flex;
  align-items: center;
  gap: 4.4rem;
  margin-top: 4rem;
}

.action-card {
  display: flex;
  align-items: center;
  background-color: #5f8d8d;
  padding: 1rem;
  border-radius: 10px;
  width: 280px;
  height: 80px;
}

.icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon img {
  width: 30px;
  height: 60px;
}

.text {
  margin-left: 10px;
  color: black;
}

.text strong {
  font-size: 1.2rem;
}

.info, .status, .card-number, .expiration, .cvc {
  font-size: 14px;
  margin: 5px 0;
}

.cvc {
  font-size: 12px;
}

.dot {
  font-size: 12px;
  vertical-align: middle;
}

.lock {
  font-size: 14px;
  margin-left: 3px;
}
</style>