<template>
    <div class="min-h-screen flex">
      <!-- Mitad Izquierda: Logo, Título y Frase -->
      <div class="w-1/2 bg-secondary flex flex-col items-center justify-center p-8 text-white">
        <!-- Logo -->
        <img
          src="assets/images/logo-new.png" 
          alt="Logo del Banco"
          class="w-32 h-33 mb-6"
        />
  
        <!-- Título del Banco -->
        <h1 class="text-4xl font-bold text-center mb-4">
          Banco Saint Patrick
        </h1>
  
        <!-- Frase -->
        <p class="text-xl text-center opacity-90">
          Somos más que un banco, somos tu aliado financiero.
        </p>
      </div>
  
      <!-- Mitad Derecha: Contenido Dinámico -->
      <div class="w-1/2 flex items-center justify-center bg-primary p-8">
        <div class="w-full max-w-md">
          <slot /> <!-- Aquí se inyecta el contenido dinámico (LoginForm o RegisterForm) -->
        </div>
      </div>
    </div>
  </template>