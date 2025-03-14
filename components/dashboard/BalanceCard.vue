<template>
    <div class="balance-card shadow-md">
      <div class="balance-header">
        <h2>Saldo</h2>
        <span class="hide-balance">Ocultar Saldo <i class="icon-eye-off"></i></span>
      </div>
      <p class="account-type">Caja de ahorro en pesos 00-569/03</p>
      <h1 class="balance-amount">$140.000,00</h1>
      <div class="balance-actions">
               <UButton
                label="Transferir"
                icon="i-heroicons-arrow-right"
                block
                @click="navigateTo('/dashboard/transfers')"
              />
              <UButton
                label="Ver Perfil"
                icon="i-heroicons-user"
                block
                @click="navigateTo('/profile')"
              />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BalanceCard",
  };
  </script>
  
  <style scoped>
  
  .balance-card {
    background-color: #FFF3CD; /* Color pastel */
    border: 2px solid #0D4D4D;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    font-family: Arial, sans-serif;
  }
  
  .balance-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: #0D4D4D;
  }
  
  .account-type {
    color: #555;
    font-size: 14px;
  }
  
  .balance-amount {
    font-size: 32px;
    font-weight: bold;
    color: #0D4D4D;
  }
  
  .balance-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  button {
    background-color: transparent;
    border: none;
    font-weight: bold;
    cursor: pointer;
    color: #0D4D4D;
  }
  
  button.transfer {
    border-right: 2px solid #0D4D4D;
    padding-right: 10px;
  }
  </style>