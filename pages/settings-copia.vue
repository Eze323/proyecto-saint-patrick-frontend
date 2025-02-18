<template>
    <div class="header">
      <div class="user-info">
        <div class="notification">
          🔔
        </div>
        <div class="profile">
          <img src="./profile-form.png" alt="Foto de perfil" class="profile-img" />
          <div class="user-details">
            <span class="username">Juan Perez</span>
          </div>
          <div class="opciones">
            <select class="select-placeholder">
              <option hidden></option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-xl font-semibold text-gray-700 mb-2 text-left">Seguridad</h2>
    <div class="menu">
      <ul>
        <li class="active"><span>🔍</span> Configuración de la cuenta</li>
        <li><span>🔒</span> Clave y biometría</li>
        <li><span>📱</span> Dispositivos conectados</li>
        <li><span>⚠️</span> Actividades sospechosas</li>
      </ul>
    </div>
    <div class="container mx-auto max-w-4xl p-4 bg-white shadow-md rounded-lg">
      <div class="flex items-center gap-4 mb-4">
        <img src="./profile-form.png" alt="Foto de perfil" id="img-tam" class="w-12 h-12 object-cover" />
        <button class="text-[#00595c] font-semibold text-sm hover:underline">Cambiar foto</button>
      </div>
  
      <form @submit.prevent="saveChanges">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1">
            <label class="label">Nombre</label>
            <input v-model="formData.nombre" type="text" class="input" placeholder="Ej: Juan" />
          </div>
          <div class="col-span-1">
            <label class="label">Apellido</label>
            <input v-model="formData.apellido" type="text" class="input" placeholder="Ej: Pérez" />
          </div>
          <div class="col-span-1">
            <label class="label">Email</label>
            <input v-model="formData.email" type="email" class="input" placeholder="Ej: juan.perez@email.com" />
          </div>
          <div class="col-span-1">
            <label class="label">Teléfono</label>
            <input v-model="formData.telefono" type="text" class="input" placeholder="Ej: +54 11 2345-6789" />
          </div>
          <div class="col-span-1">
            <label class="label">Dirección</label>
            <input v-model="formData.direccion" type="text" class="input" placeholder="Ej: Av. Siempre Viva 742" />
          </div>
          <div class="col-span-1">
            <label class="label">Código Postal</label>
            <input v-model="formData.codigoPostal" type="text" class="input" placeholder="Ej: 1234" />
          </div>
          <div class="col-span-1">
            <label class="label">Localidad</label>
            <input v-model="formData.localidad" type="text" class="input" placeholder="Ej: Buenos Aires" />
          </div>
          <div class="col-span-1">
            <label class="label">Provincia</label>
            <input v-model="formData.provincia" type="text" class="input" placeholder="Ej: Buenos Aires" />
          </div>
          <div class="col-span-1">
            <label class="label">País</label>
            <input v-model="formData.pais" type="text" class="input" placeholder="Ej: Argentina" />
          </div>
        </div>
  
        <button type="submit" class="btn-submit text-sm">Guardar Cambios</button>
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
  
  <style scoped>
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .notification {
    font-size: 18px;
    cursor: pointer;
    color: #007bff;
  }
  
  .profile {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .profile-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
  }
  
  .select-placeholder {
    font-size: 14px;
    color: black;
    cursor: pointer;
    width: auto;
    outline: none;
  }
  
  .menu {
    display: flex;
    gap: 16px;
    padding: 8px;
    border-radius: 8px;
  }
  
  .menu ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu li {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: 600;
    color: #333;
  }
  
  .menu li.active {
    text-decoration: underline;
    text-decoration-color: #00595c;
    text-decoration-thickness: 3px;
    color: #00595c;
  }
  
  .container {
    max-width: 700px;
    background: #ffffff;
    padding: 0px;/*10*/
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .label {
    font-weight: 600;
    color: #4a5568;
    font-size: 13px;
    margin-bottom: 4px;
  }
  
  .input {
    width: 100%;
    padding: 4px;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    font-size: 13px;
    background-color: #f7fafc;
  }
  
  .input:focus {
    outline: none;
    border-color: #00595c;
  }
  
  .btn-submit {
    width: 100%;
    background-color: #00595c;
    color: white;
    padding: 6px;
    font-size: 13px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    margin-top: 12px;
    cursor: pointer;
  }
  
  .btn-submit:hover {
    background-color: #004244;
  }
  
  #img-tam {
    width: 50px;
    height: 50px;
  }
  </style>
  