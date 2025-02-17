<template>
  <div class="flex h-screen">
    <!-- Menú lateral -->
    <aside class="bg-primary-450 text-black w-64 p-4 flex flex-col">
      <!-- Nombre del banco -->
      <div class="text-3xl mb-6">
        <NuxtLink to="/" class="text-center">
          <span class="text-primary">Saint</span>
          <span class="text-white">Patrick</span>
        </NuxtLink>
      </div>

      <!-- Opciones del menú -->
      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/dashboard"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
            >
              <HomeIcon class="w-5 h-5 mr-2" />
              Inicio
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/accounts"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
            >
              <BanknotesIcon class="w-5 h-5 mr-2" />
              Cuentas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/transfers"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
            >
              <ArrowPathIcon class="w-5 h-5 mr-2" />
              Transferencias
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/payments"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
            >
              <CreditCardIcon class="w-5 h-5 mr-2" />
              Pagos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/cards"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
            >
              <IdentificationIcon class="w-5 h-5 mr-2" />
              Tarjetas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/investments"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
            >
              <ChartBarIcon class="w-5 h-5 mr-2" />
              Inversiones
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/support"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
            >
              <LifebuoyIcon class="w-5 h-5 mr-2" />
              Soporte
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Opciones adicionales al final -->
      <div class="mt-auto">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/security"
              class="flex items-center py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
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
              <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-2" />
              Cerrar Sesión
            </button>
          </li>
          <!-- Menú desplegable con Headless UI -->
          <li>
            <Menu as="div" class="relative">
              <MenuButton
                class="flex items-center w-full text-left py-2 px-4 hover:bg-secondary hover:!text-white rounded transition-colors"
              >
                <EllipsisHorizontalIcon class="w-5 h-5 mr-2" />
                Más opciones
              </MenuButton>
              <MenuItems
                class="absolute bottom-full left-0 w-48 bg-white rounded-lg shadow-lg z-10"
              >
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/settings"
                    :class="[
                      active ? 'bg-secondary text-white' : 'text-black',
                      'block px-4 py-2 rounded transition-colors',
                    ]"
                  >
                    Configuración
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/help"
                    :class="[
                      active ? 'bg-secondary text-white' : 'text-black',
                      'block px-4 py-2 rounded transition-colors',
                    ]"
                  >
                    Ayuda
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/feedback"
                    :class="[
                      active ? 'bg-secondary text-white' : 'text-black',
                      'block px-4 py-2 rounded transition-colors',
                    ]"
                  >
                    Enviar feedback
                  </NuxtLink>
                </MenuItem>
              </MenuItems>
            </Menu>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="flex-1 p-6">
      <slot /> <!-- Aquí se renderiza el contenido de la página -->
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
  EllipsisHorizontalIcon, // Icono para "Más opciones"
} from "@heroicons/vue/24/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"; // Componentes de Headless UI

const logout = () => {
  const authStore = useAuthStore();
  authStore.clearToken();
  navigateTo("/auth/login");
};
</script>

<style scoped>
/* Estilos personalizados */
.router-link-active {
  border-left: 3px solid #d9b249;
  color: #d9b249;
  font-weight: 600;
  border-radius: 6px;
}
</style>