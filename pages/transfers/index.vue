<template>
<div class="flex justify-end items-center pt-0 pb-2 px-2">
  <div class="flex items-center gap-3">
    <div class="text-xl cursor-pointer text-blue-500">🔔</div>
    <div class="flex items-center gap-2">
      <img src="./profile-form.png" alt="Foto de perfil" class="w-8 h-8 rounded-full" />
      <div class="flex flex-col">
        <span class="text-sm font-semibold">Juan Perez</span>
      </div>
      <select class="text-sm cursor-pointer outline-none">
        <option hidden></option>
      </select>
    </div>
  </div>
</div>


<div class="transfers-page p-4 -mt-4 -ml-4">
  <h1 class="text-2xl font-bold mb-4 text-left">Transferencias</h1>

    <div class="flex justify-center space-x-12">
      <!-- Columna izquierda (datos de cuenta y contactos recientes) -->
      <div class="w-2/5 max-w-lg">
        <div class="mb-4">
          <label for="account-select" class="block text-sm font-medium mb-2">Seleccionar cuenta</label>
          <select id="account-select" class="w-full p-1.5 border border-gray-300 rounded-md text-sm">
            <option value="">Selecciona una cuenta</option>
            <option value="1">Cuenta 1</option>
            <option value="2">Cuenta 2</option>
            <option value="3">Cuenta 3</option>
          </select>
        </div>

        <div class="bg-yellow-300 p-4 rounded-lg shadow-md mb-4">
          <h2 class="text-lg font-semibold text-blue-600 mb-2">Saint Patrick Bank</h2>
          <p class="text-sm"><strong>Saldo:</strong> $35,621.00</p>
          <p class="text-sm"><strong>CBU:</strong> 000005694857483903</p>
          <p class="text-sm"><strong>Titular:</strong> Nicolas Gomez</p>
          <div class="mt-2 flex space-x-4">
            <button class="bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 flex items-center shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm">
              <i class="fas fa-copy mr-2"></i> Compartir CBU
            </button>
            <button class="bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 flex items-center shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-sm">
              <i class="fas fa-wallet mr-2"></i> Solicitar dinero
            </button>
          </div>
        </div>

        <div class="bg-primary-450 p-4 rounded-lg shadow-md mb-4">
          <h3 class="text-sm font-semibold mb-2 text-white">Contactos recientes</h3>
          <div class="flex space-x-4">
            <div class="text-center">
              <button class="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg hover:bg-blue-600 focus:outline-none">
                <i class="fas fa-plus"></i>
              </button>
              <p class="text-white text-xs mt-2">Agregar</p>
            </div>

            <div class="text-center">
              <div class="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <i class="fas fa-user-circle text-gray-500 text-lg"></i>
              </div>
              <p class="text-white text-xs">Maria Gomez</p>
            </div>

            <div class="text-center">
              <div class="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <i class="fas fa-user-circle text-gray-500 text-lg"></i>
              </div>
              <p class="text-white text-xs">Luciano Sosa</p>
            </div>

            <div class="text-center">
              <div class="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <i class="fas fa-user-circle text-gray-500 text-lg"></i>
              </div>
              <p class="text-white text-xs">Oscar Gomez</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna derecha (Formulario de transferencia) -->
      <div class="w-2/5 max-w-lg">
        <div class="bg-white p-4 rounded-lg shadow-md mb-3">
          <h3 class="text-lg font-semibold mb-4">Transferir a</h3>
          <label for="account-select-transfer" class="block text-sm font-medium mb-2">Seleccionar cuenta</label>
          <select id="account-select-transfer" class="w-full p-1.5 border border-gray-300 rounded-md mb-4 text-sm">
            <option value="">Selecciona una cuenta</option>
            <option value="1">Cuenta 1</option>
            <option value="2">Cuenta 2</option>
            <option value="3">Cuenta 3</option>
          </select>

          <div class="transfer-details mb-4">
            <input id="cbu" type="text" placeholder="CBU / Alias / N° de Tarjeta" class="w-full p-1.5 border border-gray-300 rounded-md mb-3 bg-cyan-100 text-sm" />
            <input id="amount" type="text" placeholder="Monto" class="w-full p-1.5 border border-gray-300 rounded-md mb-3 bg-cyan-100 text-sm" />
            <input id="date" type="date" class="w-full p-1.5 border border-gray-300 rounded-md mb-3 bg-cyan-100 text-sm" />
          </div>

          <div class="other-data mb-2">
            <p class="text-sm font-medium">Otros Datos</p>
            <input id="reason" type="text" placeholder="Motivo" class="w-full p-1.5 border border-gray-300 rounded-md mb-3 bg-cyan-100 text-sm" />
            <input id="reference" type="text" placeholder="Referencia" class="w-full p-1.5 border border-gray-300 rounded-md mb-3 bg-cyan-100 text-sm" />
            <input id="email" type="email" placeholder="Email" class="w-full p-1.5 border border-gray-300 rounded-md mb-3 bg-cyan-100 text-sm" />
          </div>

          <button class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full text-sm">Transferir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "authenticated" });
</script>
