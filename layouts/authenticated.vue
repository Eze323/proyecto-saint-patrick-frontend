<template>
  <div class="flex h-screen">
    <aside
      class="bg-primary-450 text-black w-64 p-4 flex flex-col transition-transform duration-300 lg:translate-x-0"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="text-3xl mb-6">
        <NuxtLink to="/" class="text-center">
          <span class="text-primary">Saint</span>
          <span class="text-white">Patrick</span>
        </NuxtLink>
      </div>

      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/dashboard" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <HomeIcon class="w-5 h-5 mr-2" />
              Inicio
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/accounts" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <BanknotesIcon class="w-5 h-5 mr-2" />
              Cuentas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/transfers" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <ArrowPathIcon class="w-5 h-5 mr-2" />
              Transferencias
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/payments" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <CreditCardIcon class="w-5 h-5 mr-2" />
              Pagos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cards" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <IdentificationIcon class="w-5 h-5 mr-2" />
              Tarjetas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/investments" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <ChartBarIcon class="w-5 h-5 mr-2" />
              Inversiones
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/support" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <LifebuoyIcon class="w-5 h-5 mr-2" />
              Soporte
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="mt-auto">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/security" class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <ShieldCheckIcon class="w-5 h-5 mr-2" />
              Seguridad
            </NuxtLink>
          </li>
          <li>
            <button @click="logout" class="flex items-center w-full text-left py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
              <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-2" />
              Cerrar Sesión
            </button>
          </li>
          <!-- <li>
            <Menu as="div" class="relative">
              <MenuButton class="flex items-center w-full text-left py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors">
                <EllipsisHorizontalIcon class="w-5 h-5 mr-2" />
                Más opciones
              </MenuButton>
              <MenuItems class="absolute bottom-full left-0 w-48 bg-white rounded-lg shadow-lg z-10">
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/settings" :class="[active ? 'bg-secondary text-white' : 'text-black', 'block px-4 py-2 rounded transition-colors']">
                    Configuración
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/help" :class="[active ? 'bg-secondary text-white' : 'text-black', 'block px-4 py-2 rounded transition-colors']">
                    Ayuda
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/feedback" :class="[active ? 'bg-secondary text-white' : 'text-black', 'block px-4 py-2 rounded transition-colors']">
                    Enviar feedback
                  </NuxtLink>
                </MenuItem>
              </MenuItems>
            </Menu>
          </li> -->
        </ul>
      </div>
    </aside>

    <button @click="toggleMenu" class="fixed top-4 right-6 z-50 bg-primary-450 text-white p-2 rounded-md lg:hidden">
      <component :is="isMenuOpen ? XMarkIcon : Bars3Icon" class="w-6 h-6" />
    </button>

    <main class="flex-1 p-6 transition-all duration-300" :class="isMenuOpen ? 'ml-64' : ''">
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
  ArrowLeftOnRectangleIcon,
  EllipsisHorizontalIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ref } from 'vue';

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
@media (max-width: 1023px) { /* Ajusta el breakpoint según necesites */
  aside {
    position: fixed; /* Fija el menú lateral */
    top: 0;
    left: 0;
    height: 100%;
    z-index: 40; /* Asegura que el menú esté por encima del contenido principal */
    width: 80%; /* O el ancho que desees */
    background-color: primary-450; /* Color de fondo para el menú en móviles */
    overflow-y: auto; /* Permite scroll si el contenido del menú es más largo que la pantalla */
  }
}

/* Estilos para el botón de menú en móviles */
.fixed.top-4.left-4 {
  z-index: 50; /* Asegura que el botón esté por encima del menú */
}

/* Estilos para el contenido principal */
main {
  /* Estilos para el contenido principal en general */
  transition: margin-left 0.3s ease; /* Transición para el margen izquierdo */
}

@media (max-width: 1023px) {
  main {
    margin-left: 0; /* Restablece el margen izquierdo en móviles */
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