<template>
  <div class="h-screen flex flex-col md:flex-row">  <div class="w-full md:w-1/2 bg-primary-400 flex flex-col items-center justify-center p-8 text-white">
      <img
        src="assets/images/Cartel.webp"
        alt="Logo del Banco"
        class="w-32 mb-6 md:w-48 lg:w-96 shadow-lg transition-transform duration-300 border-2 border-primary-700 hover:scale-105 "
      />

    
      <h1 class="text-4xl font-bold drop-shadow-lg text-center">
        Bienvenido al <br>
        <span class="text-yellow-500 text-4xl font-bold uppercase">S</span>aint 
        <span class="text-yellow-500 text-4xl font-bold uppercase">P</span>atrick 
        <span class="text-yellow-500 text-4xl font-bold uppercase">B</span>ank!
      </h1>

      <p class="text-xl text-center opacity-90">
        Somos más que un <span class="text-yellow-500">banco</span>, <br>
        somos tu aliado <span class="text-yellow-500">financiero</span>.
      </p>
    </div>

    <div class="w-full md:w-1/2 flex items-center justify-center bg-slate-300 p-8">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </div>
  </div>
</template>

