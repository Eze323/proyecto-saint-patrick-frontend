// plugins/inactividad.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Verificar si estamos en el cliente
  if (process.client) {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated) {
          authStore.logout();
          window.location.href = '/auth/login';
        }
      }, 15 * 60 * 1000); // 15 minutos de inactividad
    };

    // Agregar event listeners solo en el cliente
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    // Iniciar el temporizador al cargar la página
    resetTimer();

    // Limpiar event listeners al desmontar el plugin
    nuxtApp.hook('app:beforeMount', () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    });
  }
});