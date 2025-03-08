<template>
  <AuthLayout>
    <h2 class="text-4xl font-bold text-center text-primary mb-6">
      {{ selectedTab === 0 ? 'Ingresa a tu cuenta' : 'Crea una cuenta' }}
    </h2>

    <TabGroup :selected-index="selectedTab" @change="handleTabChange">
      

      <TabPanels>
        <!-- Panel de Iniciar Sesión -->
        <TabPanel class="bg-amber-200 p-6 rounded-lg shadow-md">
          <LoginForm
            @submit="handleLogin"
            :loading="isLoading"
            :error="errorMessage"
          />
        </TabPanel>

        <!-- Panel de Registrarse -->
        <TabPanel class="bg-amber-200 p-6 rounded-lg shadow-md">
          <RegisterForm
            @submit="handleRegister"
            :loading="isLoading"
            :error="errorMessage"
          />
        </TabPanel>
      </TabPanels>

      <TabList class="flex justify-center space-x-2 mb-6 bg-amber-100 p-1 rounded-lg">
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-40 py-2.5 text-sm font-medium rounded-md transition-colors',
              selected ? 'bg-amber-300 text-stone-800 shadow' : 'text-stone-500 hover:bg-amber-200',
            ]"
          >
            Iniciar Sesión
          </button>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-40 py-2.5 text-sm font-medium rounded-md transition-colors',
              selected ? 'bg-amber-300 text-stone-800 shadow' : 'text-stone-500 hover:bg-amber-200',
            ]"
          >
            Registrarse
          </button>
        </Tab>
      </TabList>
    </TabGroup>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '~/components/auth/LoginForm.vue';
import RegisterForm from '~/components/auth/RegisterForm.vue';
import AuthLayout from '~/layouts/AuthLayout.vue';
import { useAuth } from '~/composables/useAuth';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

interface Credentials {
  cardNumber: string;
  pin: string;
}

const { login, register } = useAuth();

const selectedTab = ref(0); // 0 = Login, 1 = Register
const isLoading = ref(false);
const errorMessage = ref('');

const handleTabChange = (index: number) => {
  selectedTab.value = index;
  errorMessage.value = ''; // Limpia mensajes de error al cambiar pestaña
};

const handleLogin = async (credentials: Credentials) => {
  if (!credentials.cardNumber || !credentials.pin) {
    errorMessage.value = 'Por favor, completa todos los campos.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const success = await login(credentials);
    if (success) {
      navigateTo('/dashboard');
    } else {
      errorMessage.value = 'Credenciales incorrectas';
    }
  } catch (error: any) {
    console.error('Error durante el inicio de sesión:', error);
    errorMessage.value = 'Error durante el inicio de sesión. Intenta nuevamente.';
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async (credentials: Credentials) => {
  if (!credentials.cardNumber || !credentials.pin) {
    errorMessage.value = 'Por favor, completa todos los campos.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const success = await register(credentials);
    if (success) {
      navigateTo('/dashboard');
    } else {
      errorMessage.value = 'Error durante el registro';
    }
  } catch (error: any) {
    console.error('Error durante el registro:', error);
    errorMessage.value = 'Error durante el registro. Intenta nuevamente.';
  } finally {
    isLoading.value = false;
  }
};
</script>