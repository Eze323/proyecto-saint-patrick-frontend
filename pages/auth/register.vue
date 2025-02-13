<template>
  <AuthLayout>
    <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">
      Registrarse
    </h2>
    <RegisterForm @submit="handleRegister" />
  </AuthLayout>
</template>

<script setup lang="ts">
const handleRegister = (userData: { fullName: string; email: string }) => {
  console.log('Datos de registro:', userData);
  alert(`Registro exitoso para: ${userData.fullName}`);
};
</script>