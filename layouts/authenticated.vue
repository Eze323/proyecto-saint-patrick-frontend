<template>
  <div v-if="authStore.isAuthenticated" class="flex min-h-screen">
    <div class="flex w-full h-screen overflow-hidden">
      <!-- Menú lateral -->
      <aside
        class="bg-primary-450 text-black w-64 p-4 flex flex-col transition-transform duration-300 lg:translate-x-0 fixed lg:static z-50"
        :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <!-- Contenedor del logo y texto -->
        <div class="text-3xl mb-6 flex flex-col items-center justify-center max-w-[13rem]">
          <NuxtLink to="/" class="text-center text-white hover:text-secondary transition-colors" @click="toggleMenu">
            <img src="~/assets/images/logo.webp" alt="Logo Saint Patrick" class="h-10 mx-auto mb-2" />
            <span class="text-secondary font-bold">B</span>anco
            <span class="block">
              <span class="text-secondary font-bold">S</span>aint
              <span class="text-secondary font-bold">P</span>atrick
            </span>
          </NuxtLink>
        </div>

        <!-- Menú de navegación -->
        <nav class="flex-1 overflow-y-auto">
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="flex items-center py-2 px-4 hover:bg-secondary hover:text-white rounded transition-colors"
                @click="toggleMenu"
              >
                <component :is="link.icon" class="w-5 h-5 mr-2" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Menú inferior (seguridad y cerrar sesión) -->
        <div class="mt-auto pb-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/security"
                class="flex items-center py-2 px-4 hover:bg-secondary hover:text-white rounded transition-colors"
                @click="toggleMenu"
              >
                <ShieldCheckIcon class="w-5 h-5 mr-2" />
                Seguridad
              </NuxtLink>
            </li>
            <li>
              <button
                @click="logout"
                class="flex items-center w-full text-left py-2 px-4 hover:bg-secondary hover:text-white rounded transition-colors"
              >
                <ArrowLeftEndOnRectangleIcon class="w-5 h-5 mr-2" />
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Contenido principal -->
      <div class="flex-1 flex flex-col h-full">
        <header class="flex justify-end items-center gap-4 p-6">
          <!-- UserProfile -->
          <UserProfile />

          <!-- Botón de Hamburguesa (solo en móviles) -->
          <button
            @click="toggleMenu"
            class="lg:hidden border-2 border-primary-450 text-primary-450 p-2 rounded-xl"
          >
            <component :is="isMenuOpen ? XMarkIcon : ChevronDoubleDownIcon" class="w-6 h-6" />
          </button>
     
        </header>
        
        
        <main class="flex-1 p-6 overflow-y-auto">
          <slot />
        </main>
      </div>
    </div>

    <!-- Componente de notificaciones -->
    <Toast />

  </div>

  <!-- Redirigir si no está autenticado -->
  <div v-else class="flex items-center justify-center min-h-screen">
    <p class="text-lg text-gray-600">Redirigiendo al login...</p>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  BanknotesIcon,
  ArrowPathIcon,
  CreditCardIcon,
  IdentificationIcon,
  ChartBarIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  ArrowLeftEndOnRectangleIcon,
  ChevronDoubleDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import Toast from "../components/Toast.vue";

import { useNotifications } from "../composables/useNotifications"; 
 // Ajusta la ruta según tu estructura
const { addNotification } = useNotifications();

import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  const authStore = useAuthStore();
  authStore.clearToken();
  navigateTo("/auth/login");
};

// Links del menú
const links = [
  { to: "/dashboard", label: "Inicio", icon: HomeIcon },
  { to: "/accounts", label: "Cuentas", icon: BanknotesIcon },
  { to: "/transfers", label: "Transferencias", icon: ArrowPathIcon },
  { to: "/payments", label: "Pagos", icon: CreditCardIcon },
  { to: "/cards", label: "Tarjetas", icon: IdentificationIcon },
  { to: "/investments", label: "Inversiones", icon: ChartBarIcon },
  { to: "/support", label: "Soporte", icon: LifebuoyIcon },
];



// Escuchar errores del authStore
watch(
  () => authStore.error,
  (newError) => {
    console.log('Error detectado:', newError); // Debug
    if (newError) {
      addNotification(newError, 'error');
    }
  },
  { immediate: true } // Ejecuta el watcher al montar el componente
);

</script>

<style scoped>
/* Estilos para el menú lateral en móviles */
@media (max-width: 1023px) {
  aside {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh; /* Usamos min-height en lugar de height */
    height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom)); /* Restamos el espacio de las barras */
    width: 80%;
    overflow-y: auto; /* Aseguramos que el scroll funcione */
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding-bottom: calc(20px + env(safe-area-inset-bottom)); /* Espacio adicional para la barra inferior */
  }
}

/* Aseguramos que el contenedor del aside sea completamente desplazable */
aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribuye el espacio entre el contenido superior e inferior */
}

/* Aseguramos que el nav tenga scroll interno */
nav {
  flex-grow: 1; /* Permite que el nav crezca para ocupar el espacio disponible */
  overflow-y: auto; /* Scroll interno para el nav */
}

/* Estilos para el contenido principal */
main {
  flex: 1 1 auto; /* Aseguramos que el main ocupe todo el espacio disponible */
  width: 100%; /* Forzamos que ocupe todo el ancho */
  transition: margin-left 0.3s ease;
}

/* En móviles, eliminamos el margen izquierdo */
@media (max-width: 1023px) {
  main {
    margin-left: 0;
  }
}

/* En pantallas grandes, ajustamos el margen para que no haya espacio en blanco */
@media (min-width: 1024px) {
  main {
    margin-left: 0; /* Eliminamos el margen izquierdo adicional */
  }
}

/* Estilos para el enlace activo */
.router-link-active {
  border-left: 3px solid #FFD700; /* Usamos el color secondary */
  color: #F7C548;
  font-weight: 600;
  border-radius: 6px;
}

/* Estilos para el logo y texto del banco */
.text-secondary {
  color: #F7C548; /* Color secondary */
}

/* Estilos para el hover en enlaces */
.hover\:bg-secondary:hover {
  background-color: #F7C548; /* Color secondary */
}

.hover\:text-white:hover {
  color: white;
}

/* Añadimos padding inferior al contenedor del menú inferior */
.mt-auto {
  padding-bottom: 20px; /* Espacio adicional para que "Cerrar Sesión" no quede pegado al borde */
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2); /* Separador visual */
}

/* Aseguramos que el aside tenga espacio suficiente en móviles */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  aside {
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
  }
}
</style>