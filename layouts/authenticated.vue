<template>
  <div class="flex h-screen">
    <aside
      class="bg-primary-450 text-black w-64 p-4 flex flex-col transition-transform duration-300 lg:translate-x-0"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Contenedor del logo y texto -->
      <div class="text-3xl mb-6 flex flex-col items-center justify-center max-w-[13rem]">
        <NuxtLink to="/" class="text-center text-white">
          <img src="assets/images/logo.webp" alt="Logo Saint Patrick" class="h-10 mx-auto" />
          <!-- Texto "Banco" -->
          <span class="block">Banco</span>
          <!-- Texto "Saint Patrick" -->
          <span class="block">
            <span class="text-secondary">S</span>aint
            <span class="text-secondary">P</span>atrick
          </span>
        </NuxtLink>
      </div>

      <!-- Menú de navegación -->
      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/dashboard" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors" @click="toggleMenu">
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

      <!-- Menú inferior (seguridad y cerrar sesión) -->
      <div class="mt-auto">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/security" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors" @click="toggleMenu">
              <ShieldCheckIcon class="w-5 h-5 mr-2" />
              Seguridad
            </NuxtLink>
          </li>
          <li>
            <button @click="logout" class="flex items-center w-full text-left py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <ArrowLeftEndOnRectangleIcon class="w-5 h-5 mr-2" />
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="flex-1 p-6 transition-all duration-300">
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
  ChevronDoubleDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

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
/* Estilos para el menú lateral en móviles */
@media (max-width: 1023px) {
  aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 40;
    width: 80%;
    background-color: primary-450;
    overflow-y: auto;
  }
}

/* Estilos para el botón de menú en móviles */
.fixed.top-4.left-4 {
  z-index: 50;
}

/* Estilos para el contenido principal */
main {
  transition: margin-left 0.3s ease;
}

@media (max-width: 1023px) {
  main {
    margin-left: 0;
  }
}

/* Estilos personalizados */
.router-link-active {
  border-left: 3px solid #d9b249;
  color: #d9b249;
  font-weight: 600;
  border-radius: 6px;
}
</style>