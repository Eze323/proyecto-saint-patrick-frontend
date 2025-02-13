<template>
  <AuthLayout>
    <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">
      Iniciar Sesión
    </h2>
    <LoginForm @submit="handleLogin" :loading="isLoading" :error="errorMessage" />
  </AuthLayout>
</template>

<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue';
import AuthLayout from '~/layouts/AuthLayout.vue';
import { useAuth } from '~/composables/useAuth';


interface Credentials {
  cardNumber: string;
  pin: string;
}

const { login } = useAuth();


const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async (credentials: Credentials) => {
  if (!credentials.cardNumber || !credentials.pin) {
    console.log('Por favor, completa todos los campos.');
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const success = await login(credentials);

    if (success) {
      console.log('¡Inicio de sesión exitoso!');
      navigateTo('/dashboard');
    } else {
      console.log('Credenciales incorrectas');
    }
  } catch (error: any) {
    console.error('Error durante el inicio de sesión:', error);

    if (error.response && error.response.status === 401) {
      console.log('Credenciales incorrectas');
    } else {
      console.log('Error en el servidor. Intenta nuevamente.');
    }
  } finally {
    isLoading.value = false;
  }
};
</script>