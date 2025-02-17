<template>
  <AuthLayout>
    <h2 class="text-4xl font-bold text-center text-primary mb-6">
      Ingresa a tu cuenta
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
  // Validación en el componente (opcional, pero recomendable)
  if (!credentials.cardNumber || !credentials.pin) {
    errorMessage.value = 'Por favor, completa todos los campos.'; // Muestra el error al usuario
    return;
  }

  isLoading.value = true;
  errorMessage.value = ''; // Limpia mensajes de error anteriores

  try {
    const success = await login(credentials);

    if (success) {
      console.log('¡Inicio de sesión exitoso!');
      navigateTo('/dashboard'); // Usa router.push para la redirección en Nuxt 3
    } else {
      errorMessage.value = 'Credenciales incorrectas'; // Muestra el error al usuario
      console.log('Credenciales incorrectas');
    }
  } catch (error: any) {
    console.error('Error durante el inicio de sesión:', error);

    if (error.message === 'Credenciales inválidas') { // Compara con el mensaje del error lanzado en useAuth
      errorMessage.value = 'Credenciales incorrectas'; // Muestra el error al usuario
      console.log('Credenciales incorrectas');
    } else if (error.message === 'Respuesta del servidor inválida') {
      errorMessage.value = 'Error en el servidor. Intenta nuevamente.'; // Muestra el error al usuario
      console.log('Error en el servidor. Intenta nuevamente.');
    } else {
      errorMessage.value = 'Error desconocido. Intenta nuevamente.'; // Muestra el error al usuario
      console.log('Error desconocido:', error);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>