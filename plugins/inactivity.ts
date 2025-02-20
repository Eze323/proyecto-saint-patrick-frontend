// plugins/inactividad.ts

export default defineNuxtPlugin((nuxtApp) => {
  // Verificar si estamos en el cliente
  if (import.meta.client) {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      // Limpiar el timeout anterior
      clearTimeout(timeout);

      // Configurar un nuevo timeout para 15 segundos
      timeout = setTimeout(() => {
        const authStore = useAuthStore();

        // Verificar si el usuario está autenticado antes de cerrar la sesión
        if (authStore.isAuthenticated) {
          authStore.logout(); // Cerrar sesión
          navigateTo('/auth/login'); // Redirigir al login
        }
      }, 15 * 1000); // 15 segundos de inactividad
    };

    // Agregar event listeners para detectar actividad
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer); // Agregar más eventos si es necesario

    // Iniciar el temporizador al cargar la página
    resetTimer();

    // Limpiar event listeners al desmontar el plugin
    nuxtApp.hook('app:beforeMount', () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearTimeout(timeout); // Limpiar el timeout al desmontar
    });
  }
});