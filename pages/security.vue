<template>
  <div class="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
    <!-- Título -->
    <div class="flex justify-between items-center mb-4 sm:mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-teal-800">Seguridad</h1>
    </div>

    <!-- Tabs con Headless UI -->
    <TabGroup>
      <TabList class="flex flex-wrap justify-start gap-2 sm:gap-0 sm:justify-evenly mb-4 sm:mb-6">
        <Tab
          v-for="tab in tabs"
          :key="tab.value"
          as="button"
          v-slot="{ selected }"
          class="flex items-center gap-2 px-2 py-2 sm:px-3 sm:py-2 cursor-pointer font-semibold transition-all duration-300 focus:outline-none relative"
        >
          <component :is="tab.icon" class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          <span
            :class="{
              'text-teal-800': selected,
              'text-gray-500 hover:text-teal-600': !selected,
            }"
            class="text-sm sm:text-base"
          >
            {{ tab.name }}
          </span>
          <span
            v-if="selected"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-800"
          ></span>
        </Tab>
      </TabList>

      <TabPanels>
        <!-- Tab: Datos personales -->
        <TabPanel class="fade-in max-w-2xl mx-auto">
          <div class="flex items-center gap-4 mb-4">
            <img src="@/assets/images/profile-form.png" alt="Foto de perfil" class="w-10 h-10 sm:w-12 sm:h-12 object-cover" />
            <button class="text-[#00595c] font-semibold text-sm sm:text-base hover:underline">Cambiar foto</button>
          </div>

          <form @submit.prevent="saveChanges">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">Nombre</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Juan"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">Apellido</label>
                <input
                  v-model="formData.lastname"
                  type="text"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Pérez"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: juan.perez@email.com"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">Teléfono</label>
                <input
                  v-model="formData.phone"
                  type="text"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: +54 11 2345-6789"
                />
              </div>
              <div class="col-span-1 sm:col-span-2">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">Dirección</label>
                <input
                  v-model="formData.address"
                  type="text"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Av. Siempre Viva 742"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">Código Postal</label>
                <input
                  v-model="formData.zip"
                  type="text"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: 1234"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">Localidad</label>
                <input
                  v-model="formData.locality"
                  type="text"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Buenos Aires"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">Provincia</label>
                <input
                  v-model="formData.province"
                  type="text"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Buenos Aires"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm sm:text-base mb-1 block">País</label>
                <input
                  v-model="formData.country"
                  type="text"
                  class="w-full p-2 sm:p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Argentina"
                />
              </div>
            </div>

            <button
              type="submit"
              class="w-full sm:max-w-[50%] mx-auto bg-[#00595c] text-white p-2 sm:p-3 text-sm sm:text-base font-bold rounded-md mt-3 hover:bg-[#004244] block"
              :disabled="isSaving"
            >
              <span v-if="isSaving">Guardando...</span>
              <span v-else>Guardar Cambios</span>
            </button>
          </form>
        </TabPanel>

        <!-- Tab: Clave y Biometría -->
        <TabPanel class="fade-in max-w-2xl mx-auto">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Clave y Biometría</h3>
          <p class="text-gray-600 text-sm sm:text-base">Aquí podrás gestionar tu contraseña y opciones de biometría (como huella dactilar o reconocimiento facial).</p>
        </TabPanel>

        <!-- Tab: Dispositivos conectados -->
        <TabPanel class="fade-in max-w-2xl mx-auto">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Dispositivos conectados</h3>
          <p class="text-gray-600 text-sm sm:text-base">Aquí podrás ver y gestionar los dispositivos que tienen acceso a tu cuenta.</p>
        </TabPanel>

        <!-- Tab: Actividades sospechosas -->
        <TabPanel class="fade-in max-w-2xl mx-auto">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Actividades sospechosas</h3>
          <p class="text-gray-600 text-sm sm:text-base">Aquí podrás revisar actividades sospechosas detectadas en tu cuenta.</p>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth.store';
import { ref, computed, onMounted, nextTick } from 'vue';
import {
  LockClosedIcon,
  DevicePhoneMobileIcon,
  ExclamationCircleIcon,
  Cog8ToothIcon,
} from '@heroicons/vue/24/outline';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

definePageMeta({ layout: 'authenticated' });

const authStore = useAuthStore();
const isSaving = ref(false);

// Inicializar formData con todos los campos necesarios
const formData = ref({
  name: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  locality: '',
  province: '',
  country: '',
});

// Computed para obtener el perfil actualizado reactivamente
const currentProfile = computed(() => ({
  name: authStore.user?.profile?.name || '',
  lastname: authStore.user?.profile?.lastname || '',
  email: authStore.user?.profile?.email || '',
  phone: authStore.user?.profile?.phone || '',
  address: authStore.user?.profile?.address || '',
  zip: authStore.user?.profile?.zip || '',
  locality: authStore.user?.profile?.locality || '',
  province: authStore.user?.profile?.province || '',
  country: authStore.user?.profile?.country || '',
}));

// Cargar datos iniciales
const loadInitialData = async () => {
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser();
  }
  updateFormData();
};

// Actualizar formData cuando cambie el perfil
const updateFormData = () => {
  formData.value = { ...currentProfile.value };
};

// Observar cambios en el perfil del usuario
watch(() => authStore.user?.profile, (newProfile) => {
  if (newProfile) {
    updateFormData();
  }
}, { deep: true, immediate: true });

// Cargar datos al montar el componente
onMounted(async () => {
  await loadInitialData();
});

// Definición de los tabs
const tabs = [
  { value: 'datos-personales', name: 'Datos personales', icon: Cog8ToothIcon },
  { value: 'clave-biometria', name: 'Clave y Biometría', icon: LockClosedIcon },
  { value: 'dispositivos-conectados', name: 'Dispositivos conectados', icon: DevicePhoneMobileIcon },
  { value: 'actividades-sospechosas', name: 'Actividades sospechosas', icon: ExclamationCircleIcon },
];

// Guardar cambios
const saveChanges = async () => {
  try {
    isSaving.value = true;
    
    // Filtrar solo los campos modificados
    const modifiedData = Object.keys(formData.value).reduce((acc, key) => {
      if (formData.value[key] !== currentProfile.value[key]) {
        acc[key] = formData.value[key];
      }
      return acc;
    }, {});

    if (Object.keys(modifiedData).length > 0) {
      await authStore.updateProfile(modifiedData);
      
      // Esperar a que se complete la actualización del store
      await nextTick();
      
      // Mostrar feedback al usuario
      alert('Datos guardados exitosamente!');
    } else {
      alert('No hay cambios para guardar');
    }
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    alert(`Error al guardar los datos: ${error.message}`);
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>