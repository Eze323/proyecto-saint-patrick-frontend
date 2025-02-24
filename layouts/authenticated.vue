<template>
  <div class="flex h-screen">
    <!-- Menú Lateral -->
    <aside
      class="bg-primary-450 text-black w-64 p-4 flex flex-col fixed lg:relative transition-transform duration-300"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Logo -->
      <div class="text-3xl mb-6">
        <NuxtLink to="/" class="text-center">
          <span class="text-primary">Saint</span>
          <span class="text-white">Patrick</span>
        </NuxtLink>
      </div>

      <!-- Navegación -->
      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/dashboard"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
              @click="toggleMenu"
            >
              <HomeIcon class="w-5 h-5 mr-2" />
              Inicio
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/accounts" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors" @click="toggleMenu">
              <BanknotesIcon class="w-5 h-5 mr-2" />
              Cuentas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/transfers" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors" @click="toggleMenu">
              <ArrowPathIcon class="w-5 h-5 mr-2" />
              Transferencias
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/payments" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors" @click="toggleMenu">
              <CreditCardIcon class="w-5 h-5 mr-2" />
              Pagos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cards" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors" @click="toggleMenu">
              <IdentificationIcon class="w-5 h-5 mr-2" />
              Tarjetas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/investments" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors" @click="toggleMenu">
              <ChartBarIcon class="w-5 h-5 mr-2" />
              Inversiones
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/support" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors" @click="toggleMenu">
              <LifebuoyIcon class="w-5 h-5 mr-2" />
              Soporte
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Enlaces Inferiores -->
      <div class="mt-auto">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/security"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
              @click="toggleMenu"
            >
              <ShieldCheckIcon class="w-5 h-5 mr-2" />
              Seguridad
            </NuxtLink>
          </li>
          <li>
            <button
              @click="logout"
              class="flex items-center w-full text-left py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
            >
              <ArrowLeftEndOnRectangleIcon class="w-5 h-5 mr-2" />
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </aside>

  

<!-- Contenido Principal -->
<main class="flex-1 p-6 overflow-y-auto transition-all duration-300"">
      <!-- Header -->
      <header class="flex justify-end items-center gap-4 mb-6">
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

      <!-- Contenido Dinámico -->
      <slot />
    </main>
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
  // EllipsisHorizontalIcon,
  ChevronDoubleDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
//import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import UserProfile from "~/components/UserProfile.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  const authStore = useAuthStore();
  authStore.clearToken();
  navigateTo("/auth/login");
};
</script>


<style scoped>
/* Contenedor principal */
.flex.h-screen {
  overflow: hidden; /* Evita scroll en el contenedor raíz */
}

/* Menú lateral */
/* Estilos para el menú lateral */
aside {
  height: 100vh; /* Altura completa */
  z-index: 40; /* Por encima del contenido */
  overflow-y: auto; /* Scroll interno si el contenido excede */
}

/* Estilos para el contenido principal */
main {
  flex: 1; /* Ocupa el espacio restante */
  height: 100vh; /* Altura completa */
  overflow-y: auto; /* Permite scroll vertical */
  transition: margin-left 0.3s ease; /* Transición suave */
}

/* Estilos para móviles */
@media (max-width: 1023px) {
  aside {
    transform: translateX(-100%); /* Oculto por defecto */
  }
  aside.translate-x-0 {
    transform: translateX(0); /* Visible cuando isMenuOpen es true */
  }
}

/* Estilos para enlaces activos */
.router-link-active {
  border-left: 3px solid #d9b249;
  color: #d9b249;
  font-weight: 600;
  border-radius: 6px;
}

/* Ajustes para el header dentro de main */
header {
  position: sticky; /* Fija el header en la parte superior del main */
  
  background: inherit; /* Hereda el fondo del main */
  z-index: 10;
}
</style>