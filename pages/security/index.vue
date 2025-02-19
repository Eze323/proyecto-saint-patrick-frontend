<template>
    <div class="flex justify-end items-center p-2">
      <div class="flex items-center gap-3">
        <div class="text-xl cursor-pointer text-blue-500">🔔</div>
        <div class="flex items-center gap-2">
          <img src="@/assets/images/profile-form.png" alt="Foto de perfil" class="w-8 h-8 rounded-full" />
          <div class="flex flex-col">
            <span class="text-sm font-semibold">Juan Perez</span>
          </div>
          <select class="text-sm cursor-pointer outline-none">
            <option hidden></option>
          </select>
        </div>
      </div>
    </div>
  
    <h2 class="text-xl font-semibold text-gray-700 mb-2 text-left">Seguridad</h2>
  
    <div class="flex gap-4 p-2 rounded-md">
      <ul class="flex list-none p-0 m-0">
        <li class="flex items-center gap-2 px-3 py-2 cursor-pointer font-semibold underline decoration-[#00595c] decoration-3 text-[#00595c]">
          <span>🔍</span> Configuración de la cuenta
        </li>
        <li class="flex items-center gap-2 px-3 py-2 cursor-pointer font-semibold text-gray-800">
          <span>🔒</span> Clave y biometría
        </li>
        <li class="flex items-center gap-2 px-3 py-2 cursor-pointer font-semibold text-gray-800">
          <span>📱</span> Dispositivos conectados
        </li>
        <li class="flex items-center gap-2 px-3 py-2 cursor-pointer font-semibold text-gray-800">
          <span>⚠️</span> Actividades sospechosas
        </li>
      </ul>
    </div>
  
    <div class="container mx-auto max-w-4xl p-4 bg-white shadow-md rounded-lg">
      <div class="flex items-center gap-4 mb-4">
        <img src="@/assets/images/profile-form.png" alt="Foto de perfil" class="w-12 h-12 object-cover" />
        <button class="text-[#00595c] font-semibold text-sm hover:underline">Cambiar foto</button>
      </div>
  
      <form @submit.prevent="saveChanges">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">Nombre</label>
            <input v-model="formData.nombre" type="text" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: Juan" />
          </div>
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">Apellido</label>
            <input v-model="formData.apellido" type="text" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: Pérez" />
          </div>
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">Email</label>
            <input v-model="formData.email" type="email" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: juan.perez@email.com" />
          </div>
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">Teléfono</label>
            <input v-model="formData.telefono" type="text" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: +54 11 2345-6789" />
          </div>
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">Dirección</label>
            <input v-model="formData.direccion" type="text" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: Av. Siempre Viva 742" />
          </div>
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">Código Postal</label>
            <input v-model="formData.codigoPostal" type="text" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: 1234" />
          </div>
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">Localidad</label>
            <input v-model="formData.localidad" type="text" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: Buenos Aires" />
          </div>
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">Provincia</label>
            <input v-model="formData.provincia" type="text" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: Buenos Aires" />
          </div>
          <div class="col-span-1">
            <label class="font-semibold text-gray-600 text-sm mb-1 block">País</label>
            <input v-model="formData.pais" type="text" class="w-full p-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-[#00595c]" placeholder="Ej: Argentina" />
          </div>
        </div>
  
        <button type="submit" class="w-full bg-[#00595c] text-white p-2 text-sm font-bold rounded-md mt-3 hover:bg-[#004244]">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script setup>
  definePageMeta({ layout: "authenticated" });
  
  const authStore = useAuthStore();
  const user = computed(() => authStore.user);
  
  const formData = ref({
    nombre: user.value.nombre || "",
    apellido: user.value.apellido || "",
    email: user.value.email || "",
    telefono: user.value.telefono || "",
    direccion: user.value.direccion || "",
    codigoPostal: user.value.codigoPostal || "",
    localidad: user.value.localidad || "",
    provincia: user.value.provincia || "",
    pais: user.value.pais || "",
  });
  
  const saveChanges = () => {
    console.log("Guardando cambios:", formData.value);
  };
  </script>
  