<template>
  <div class="accounts-page">
    <h1>Cuentas</h1>
    <p>Aquí puedes gestionar tus cuentas bancarias.</p>

    <div class="accounts-grid">
      <Account
        title="Cuenta Principal"
        account-number="1234567890"
        balance="1000"
        currency="USD"
        action-label="Ver Detalles"
      />
      <Account
        title="Cuenta de Ahorros"
        account-number="0987654321"
        balance="5000"
        currency="USD"
        action-label="Ver Detalles"
      />
    </div>
  </div>

</template>
<script setup lang="ts">
  definePageMeta({ layout: "authenticated" });
  </script>