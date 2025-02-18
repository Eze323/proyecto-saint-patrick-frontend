<template>
    <div class="p-1">
      <h1 class="text-3xl font-bold mb-2">←Últimos Movimientos (Transacciones)</h1>
      <div class="flex flex-col gap-2">  
        <!--
      <BalanceCard/>
        -->

      <div class="balance-card">
    <div class="balance-header">
      <h2>Caja de ahorro</h2>
      <span class="hide-balance">↑ 2.36% <i class="icon-eye-off"></i></span>

    </div>
    <p class="account-type">Saint Patrick Bank</p>
    <h1 class="balance-amount">$140.000,00</h1>
    <div class="balance-actions">
             <UButton
              label="Transferir"
              icon="i-heroicons-arrow-right"
              block
              @click="navigateTo('/dashboard/transfers')"
            />
            <UButton
              label="Ver Perfil"
              icon="i-heroicons-user"
              block
              @click="navigateTo('/profile')"
            />
    </div>
  </div>

      <!-- Tarjeta de últimas transacciones -->
        <CustomCard title="Últimas Transacciones">
          <ul class="space-y-2">
            <li class="flex items-center justify-between border-b border-green-500 pb-2">
              <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z" />
              </svg>
              <span>Obseqios y detalles</span>
               </div>
              <span class="text-black-500 font-bold">-$5000.00</span>
            </li>
              <li class="flex items-center justify-between border-b border-green-500 pb-2">
              <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clip-rule="evenodd" />
              </svg>
              <span>Home Center</span>
               </div>
              <span class="text-black-500 font-bold">-$7500.00</span>
            </li>
              <li class="flex items-center justify-between border-b border-green-500 pb-2">
              <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M8.128 9.155a3.751 3.751 0 1 1 .713-1.321l1.136.656a.75.75 0 0 1 .222 1.104l-.006.007a.75.75 0 0 1-1.032.157 1.421 1.421 0 0 0-.113-.072l-.92-.531Zm-4.827-3.53a2.25 2.25 0 0 1 3.994 2.063.756.756 0 0 0-.122.23 2.25 2.25 0 0 1-3.872-2.293ZM13.348 8.272a5.073 5.073 0 0 0-3.428 3.57 5.08 5.08 0 0 0-.165 1.202 1.415 1.415 0 0 1-.707 1.201l-.96.554a3.751 3.751 0 1 0 .734 1.309l13.729-7.926a.75.75 0 0 0-.181-1.374l-.803-.215a5.25 5.25 0 0 0-2.894.05l-5.325 1.629Zm-9.223 7.03a2.25 2.25 0 1 0 2.25 3.897 2.25 2.25 0 0 0-2.25-3.897ZM12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
              <path d="M16.372 12.615a.75.75 0 0 1 .75 0l5.43 3.135a.75.75 0 0 1-.182 1.374l-.802.215a5.25 5.25 0 0 1-2.894-.051l-5.147-1.574a.75.75 0 0 1-.156-1.367l3-1.732Z" />
              </svg>
              <span>Barbería y estilo</span>
               </div>
              <span class="text-black-500 font-bold">-$6500.00</span>
            </li>
              <li class="flex items-center justify-between border-b border-green-500 pb-2">
              <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
              <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
              <path fill-rule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>
              <span>Yamaha</span>
               </div>
              <span class="text-black-500 font-bold">-$3600.00</span>
            </li>
              <li class="flex items-center justify-between border-b border-green-500 pb-2">
              <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
              <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
              <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
              </svg>
              <span>Educación</span>
               </div>
              <span class="text-black-500 font-bold">-$7800.00</span>
            </li>
          </ul>
        </CustomCard>
      </div>
    </div>
  </template>

  <style scoped>

.balance-card {
  background-color:#0D4D4D; /* Color pastel */
  border: 2px solid #0D4D4D;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  font-family: Arial, sans-serif;
}

.balance-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #FFFFFF;
}

h2, .hide-balance, .account-type, .balance-amount, .balance-actions, button {
  color: #FFFFFF;
}

.account-type {
  color: #FFFFFF;
  font-size: 14px;
}

.balance-amount {
  font-size: 32px;
  font-weight: bold;
  color: #FFFFFF;
}

.balance-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: #FFFFFF;
}

button {
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: #0D4D4D;
}

button.transfer {
    border-right: 2px solid #FFFFFF;
  padding-right: 10px;
}
</style>

  <script setup lang="ts">
    // Lógica del dashboard (si es necesaria)
    definePageMeta({
    layout: 'authenticated', // Usa el layout para usuarios logueados
    });
    import { ShoppingCartIcon, Bars3Icon } from '@heroicons/vue/24/solid';
    import CustomCard from '~/components/CustomCard.vue'; // Asegúrate de que la ruta sea correcta
    import UButton from '~/components/UButton.vue'; // Asegúrate de que la ruta sea correcta
    import BalanceCard from '~/components/dashboard/BalanceCard.vue';
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);

    const logout = () => {
    authStore.clearToken();
    navigateTo('/auth/login');
    };
  </script>
