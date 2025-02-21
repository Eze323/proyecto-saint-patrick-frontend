
  <template>
  <AuthLayout>
    <h2 class="text-4xl font-bold text-center text-primary mb-6">
      {{ showLogin ? 'Ingresa a tu cuenta' : 'Crea una cuenta' }}
    </h2>

    <!-- Mostrar LoginForm o RegisterForm según el estado -->
     <div class="bg-amber-200 p-6 rounded-lg shadow-md">
       <LoginForm
         v-if="showLogin"
         @submit="handleLogin"
         :loading="isLoading"
         :error="errorMessage"
       />
       <RegisterForm
         v-else
         @submit="handleRegister"
         :loading="isLoading"
         :error="errorMessage"
       />

       
       <!-- Botón para alternar entre Login y Register -->
       <p class=" mt-4 text-stone-500">
         <span v-if="showLogin">¿No tienes una cuenta? </span>
         <span v-else>¿Ya tienes una cuenta? </span>
         <button
         @click="toggleForm"
         class="text-stone-500 hover:underline focus:outline-none"
         >
         {{ showLogin ? 'Regístrate' : 'Inicia sesión' }}
        </button>
      </p>
    </div>
  </AuthLayout>

</template>

<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue';
import RegisterForm from '~/components/auth/RegisterForm.vue';
import AuthLayout from '~/layouts/AuthLayout.vue';
import { useAuth } from '~/composables/useAuth';



interface Credentials {
  cardNumber: string;
  pin: string;
}

const { login,register } = useAuth();

const showLogin = ref(true);
const isLoading = ref(false);
const errorMessage = ref('');

const toggleForm = () => {
  showLogin.value = !showLogin.value;
  errorMessage.value = ''; // Limpia mensajes de error al cambiar entre Login y Register
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