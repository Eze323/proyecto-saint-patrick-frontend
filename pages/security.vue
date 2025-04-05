<template>
  <div class="container mx-auto py-8">
    <!-- Título -->
     <!-- Título -->
     <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-teal-800">Seguridad</h1>
      </div>

    <!-- Tabs con Headless UI -->
    <TabGroup>
      <TabList class="flex justify-evenly  mb-6">
        <Tab
  v-for="tab in tabs"
  :key="tab.value"
  as="button"
  class="flex items-center gap-2 px-3 py-2 cursor-pointer font-semibold transition-all duration-300 focus:outline-none relative"
  v-slot="{ selected }"
>
  <component :is="tab.icon" class="w-5 h-5 mr-2" />
  <span :class="{
    'text-teal-800': selected,
    'text-gray-500 hover:text-teal-600': !selected
  }">
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
        <TabPanel class="fade-in max-w-2xl mx-auto" >
          <div class="flex items-center gap-4 mb-4">
            <img src="@/assets/images/profile-form.png" alt="Foto de perfil" class="w-12 h-12 object-cover" />
            <button class="text-[#00595c] font-semibold text-sm hover:underline">Cambiar foto</button>
          </div>

          <form @submit.prevent="saveChanges">
            <div class="grid grid-cols-2 gap-4 p-4">
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">Nombre</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Juan"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">Apellido</label>
                <input
                  v-model="formData.lastname"
                  type="text"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Pérez"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: juan.perez@email.com"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">Teléfono</label>
                <input
                  v-model="formData.phone"
                  type="text"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: +54 11 2345-6789"
                />
              </div>
              <div class="col-span-2">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">Dirección</label>
                <input
                  v-model="formData.address"
                  type="text"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Av. Siempre Viva 742"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">Código Postal</label>
                <input
                  v-model="formData.zip"
                  type="text"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: 1234"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">Localidad</label>
                <input
                  v-model="formData.locality"
                  type="text"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Buenos Aires"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">Provincia</label>
                <input
                  v-model="formData.province"
                  type="text"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Buenos Aires"
                />
              </div>
              <div class="col-span-1">
                <label class="font-semibold text-gray-600 text-sm mb-1 block">País</label>
                <input
                  v-model="formData.country"
                  type="text"
                  class="w-full p-1 border border-gray-300 rounded-md bg-white-100 focus:outline-none focus:border-[#00595c]"
                  placeholder="Ej: Argentina"
                />
              </div>
            </div>

            <button
              type="submit"
              class="max-w-[50%] mx-auto bg-[#00595c] text-white p-2 text-sm font-bold rounded-md mt-3 hover:bg-[#004244] block"
            >
              Guardar Cambios
            </button>
          </form>
        </TabPanel>

        <!-- Tab: Clave y Biometría -->
        <TabPanel class="fade-in">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Clave y Biometría</h3>
          <p class="text-gray-600">Aquí podrás gestionar tu contraseña y opciones de biometría (como huella dactilar o reconocimiento facial).</p>
          <!-- Agregar formulario o contenido para Clave y Biometría -->
        </TabPanel>

        <!-- Tab: Dispositivos conectados -->
        <TabPanel class="fade-in">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Dispositivos conectados</h3>
          <p class="text-gray-600">Aquí podrás ver y gestionar los dispositivos que tienen acceso a tu cuenta.</p>
          <!-- Agregar lista de dispositivos o contenido para Dispositivos conectados -->
        </TabPanel>

        <!-- Tab: Actividades sospechosas -->
        <TabPanel class="fade-in">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Actividades sospechosas</h3>
          <p class="text-gray-600">Aquí podrás revisar actividades sospechosas detectadas en tu cuenta.</p>
          <!-- Agregar lista de actividades o contenido para Actividades sospechosas -->
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth.store';

import {
  LockClosedIcon,
  DevicePhoneMobileIcon,
  ExclamationCircleIcon,
  Cog8ToothIcon,
} from '@heroicons/vue/24/outline';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

definePageMeta({ layout: "authenticated" });

const authStore = useAuthStore();
const user = computed(() => authStore.user.profile);

// Definición de los tabs
const tabs = [
  { value: 'datos-personales', name: 'Datos personales', icon: Cog8ToothIcon },
  { value: 'clave-biometria', name: 'Clave y Biometría', icon: LockClosedIcon },
  { value: 'dispositivos-conectados', name: 'Dispositivos conectados', icon: DevicePhoneMobileIcon },
  { value: 'actividades-sospechosas', name: 'Actividades sospechosas', icon: ExclamationCircleIcon },
];

// Datos del formulario para Datos personales
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

// Sincronizar formData con user cuando cambie
watch(user, (newUser) => {
  if (newUser) {
    formData.value = {
      name: newUser.name || '',
      lastname: newUser.lastname || '',
      email: newUser.email || '',
      phone: newUser.phone || '',
      address: newUser.address || '',
      zip: newUser.zip || '',
      locality: newUser.locality || '',
      province: newUser.province || '',
      country: newUser.country || '',
    };
  } else {
    formData.value = {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      codigoPostal: '',
      localidad: '',
      provincia: '',
      pais: '',
    };
  }
}, { immediate: true }); // Ejecutar inmediatamente al montar el componente

const saveChanges = async () => {
  try {
    // Llamar a updateProfile desde el authStore con los datos del formulario
    await authStore.updateProfile(formData.value);

    // Mostrar mensaje de éxito
    alert('Datos guardados exitosamente!');
  } catch (error) {
    // Manejar errores
    console.error('Error al guardar los datos:', error);
    alert('Error al guardar los datos. Por favor, intenta de nuevo.');
  }
};
</script>

<style scoped>
/* Transición para los tabs */
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