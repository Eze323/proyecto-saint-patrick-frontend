<<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Campo: Nombre Completo -->
    <div class="space-y-2">
      <label for="fullName" class="block text-sm font-medium text-primary">
        Nombre Completo
      </label>
      <input
        id="fullName"
        type="text"
        v-model="fullName"
        placeholder="Juan Roman Riquelme"
        :disabled="loading"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- Campo: Correo Electrónico -->
    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-primary">
        Correo Electrónico
      </label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="correo@ejemplo.com"
        :disabled="loading"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- Mensaje de Error -->
    <div v-if="error" class="text-sm text-red-600">
      {{ error }}
    </div>

    <!-- Botón de Registrarse -->
    <button
      type="submit"
      :disabled="loading"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-secondary bg-primary-600  hover:bg-primary-700 focus:outline-none focus:ring-secondary-500 focus:ring-offset-2 focus:ring-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span v-if="loading">Registrando...</span>
      <span v-else>Registrarse</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
});

// Emits
const emit = defineEmits(['submit']);

// Estado del formulario
const fullName = ref('');
const email = ref('');

// Validación básica
const validateForm = () => {
  if (!fullName.value || !email.value) {
    return 'Por favor, completa todos los campos.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    return 'Por favor, ingresa un correo electrónico válido.';
  }
  return null;
};

// Manejar el envío del formulario
const handleSubmit = () => {
  const validationError = validateForm();
  if (validationError) {
    emit('submit', { error: validationError });
    return;
  }

  emit('submit', { fullName: fullName.value, email: email.value });
};
</script>