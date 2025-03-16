<!-- components/BalanceCard.vue -->
<template>
  <div class="balance-card shadow-md">
    <div class="balance-header">
      <h2 class="title">Saldo</h2>
      <span class="hide-balance" @click="toggleBalanceVisibility">
        {{ isBalanceHidden ? 'Mostrar Saldo' : 'Ocultar Saldo' }}
        <i :class="isBalanceHidden ? 'icon-eye' : 'icon-eye-off'"></i>
      </span>
    </div>
    <div class="balance-content">
      <p class="account-type">{{ accountType }} {{ accountNumber }}</p>
      <h1 class="balance-amount">{{ formattedBalance }}</h1>
    </div>
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

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { UserProfile } from '~/utils/types';

// Definimos las props con tipado
const props = defineProps<{
  user?: UserProfile | null; // Hacemos que user sea opcional
}>();

// Usamos el router para la navegación
const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);
};

// Estado para ocultar/mostrar el saldo
const isBalanceHidden = ref(false);

// Función para alternar la visibilidad del saldo
const toggleBalanceVisibility = () => {
  isBalanceHidden.value = !isBalanceHidden.value;
};

// Computeds para los datos dinámicos
const accountType = computed(() => {
  return props.user?.accounts?.[0]?.type || 'Caja de Ahorro';
});

const accountNumber = computed(() => {
  return props.user?.accounts?.[0]?.accountNumber || '00-569/03';
});

const balance = computed(() => {
  return props.user?.balance || 0;
});

const formattedBalance = computed(() => {
  if (isBalanceHidden.value) {
    return '****';
  }
  return `$${balance.value.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
});
</script>

<style scoped>
.balance-card {
  background-color: #FFF3CD; /* Color pastel */
  border: 2px solid #0D4D4D;
  padding: 25px; /* Aumentamos el padding para mejor distribución */
  border-radius: 10px;
  max-width: 450px; /* Aumentamos el ancho máximo para mejor uso del espacio */
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaciado vertical entre secciones */
  height: 100%; /* Ocupa todo el alto disponible */
}

.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #0D4D4D;
}

.title {
  font-size: 24px; /* Reducimos ligeramente el tamaño del título */
  margin: 0;
}

.hide-balance {
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease; /* Transición suave al hacer hover */
}

.hide-balance:hover {
  color: #0A3A3A; /* Cambio de color al pasar el mouse */
}

.balance-content {
  text-align: center; /* Centramos el contenido */
  flex-grow: 1; /* Permite que esta sección ocupe el espacio disponible */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px; /* Espaciado entre tipo de cuenta y saldo */
}

.account-type {
  color: #555;
  font-size: 14px;
  margin: 0;
}

.balance-amount {
  font-size: 36px; /* Aumentamos ligeramente el tamaño del saldo */
  font-weight: bold;
  color: #0D4D4D;
  margin: 0;
}

.balance-actions {
  display: flex;
  justify-content: space-between;
  gap: 15px; /* Espaciado entre botones */
}

button {
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: #0D4D4D;
  flex: 1; /* Hace que los botones ocupen igual espacio */
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #F8E8B0; /* Fondo claro al hacer hover */
}

button.transfer {
  border-right: 2px solid #0D4D4D;
  padding-right: 10px;
}

/* Estilo para los íconos (puedes ajustar según tu librería de íconos) */
.icon-eye,
.icon-eye-off {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: cover;
}

.icon-eye {
  background-image: url('~assets/icons/eye.svg'); /* Ajusta la ruta según tu proyecto */
}

.icon-eye-off {
  background-image: url('~assets/icons/eye-off.svg'); /* Ajusta la ruta según tu proyecto */
}

@media (max-width: 400px) {
  .balance-card {
    max-width: 100%; /* Ajuste para pantallas pequeñas */
    padding: 15px;
  }

  .balance-amount {
    font-size: 28px; /* Reducimos el tamaño en pantallas pequeñas */
  }

  .balance-actions {
    flex-direction: column;
    gap: 10px;
  }

  button {
    width: 100%;
  }
}
</style>