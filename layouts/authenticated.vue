<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Menú lateral -->
    <aside
      class="bg-primary-450 text-black w-64 p-4 flex flex-col transition-transform duration-300 lg:translate-x-0 fixed lg:static z-50 h-full"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Contenedor del logo y texto -->
      <div class="text-3xl mb-6 flex flex-col items-center justify-center max-w-[13rem]">
        <NuxtLink to="/" class="text-center text-white hover:text-secondary transition-colors">
          <img src="~/assets/images/logo.webp" alt="Logo Saint Patrick" class="h-10 mx-auto mb-2" />
          <span class="text-secondary font-bold">B</span>anco
          <span class="block">
            <span class="text-secondary font-bold">S</span>aint
            <span class="text-secondary font-bold">P</span>atrick
          </span>
        </NuxtLink>
      </div>

      <!-- Menú de navegación -->
      <nav class="flex-1">
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
      <div class="mt-auto">
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
    <main class="flex-1 p-6 transition-all duration-300 lg:ml-4 overflow-y-auto">
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
</script>

<style scoped>
/* Estilos para el menú lateral en móviles */
@media (max-width: 1023px) {
  aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 80%;
    background-color: bg-primary-450;
    overflow-y: auto;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
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

/* Estilos para el enlace activo */
.router-link-active {
  border-left: 3px solid secondary;
  color: secondary;
  font-weight: 600;
  border-radius: 6px;
}

/* Estilos para el logo y texto del banco */
.text-secondary {
  color: secondary;
}

/* Estilos para el hover en enlaces */
.hover\:bg-secondary:hover {
  background-color: secondary;
}

.hover\:text-white:hover {
  color: white;
}
</style>