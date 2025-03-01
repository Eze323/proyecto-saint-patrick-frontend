// plugins/inactivity.client.ts
export default defineNuxtPlugin((nuxtApp) => {

  console.log('Plugin de inactividad cargado');

  let timeout: NodeJS.Timeout;
  let warningTimeout: NodeJS.Timeout;

  // Estado para controlar la visibilidad del modal
  const isWarningOpen = ref(false);
  const authStore = useAuthStore();

  // Mostrar el modal de advertencia
  const showWarning = () => {
    if(authStore.isAuthenticated){
    isWarningOpen.value = true;
    }
    
  };

  // Cerrar el modal y reiniciar el temporizador
  const closeWarning = () => {
    isWarningOpen.value = false;
    resetTimer(); // Reiniciar el temporizador
  };

  // Cerrar sesión
  const logout = () => {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      authStore.logout();
      navigateTo('/auth/login');
    }
  };

  const resetTimer = () => {
    console.log('Reiniciando temporizador'); // Verifica que esto aparezca en la consola al mover
    clearTimeout(timeout);
    clearTimeout(warningTimeout);

    // Mostrar advertencia después de 10 segundos
    warningTimeout = setTimeout(showWarning, 10 * 1000);

    // Cerrar sesión después de 15 segundos
    timeout = setTimeout(logout, 15 * 1000);
  };

  // Agregar event listeners para detectar actividad
  const events = ['mousemove', 'keydown', 'click'];
  events.forEach((event) => window.addEventListener(event, resetTimer));

  // Iniciar el temporizador al cargar la página si esta autenticado
  if(authStore.isAuthenticated){
  resetTimer(); 
}

  // Limpiar event listeners al desmontar el plugin
  // @ts-ignore
  nuxtApp.hook('app:unmounted', () => {
    events.forEach((event) => window.removeEventListener(event, resetTimer));
    clearTimeout(timeout);
    clearTimeout(warningTimeout);
  });

  watch(()=>authStore.isAuthenticated,(newValue)=>{
    if(newValue){
      resetTimer();
  }else{
    clearTimeout(timeout);
    clearTimeout(warningTimeout);
    isWarningOpen.value = false;
  }
});

  // Proveer el estado del modal a la aplicación
  return {
    provide: {
      inactivity: {
        isWarningOpen,
        closeWarning,
        logout
      },
    },
  };
});