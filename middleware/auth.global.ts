export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
  
    // Redirigir a login si no está autenticado
    if (!authStore.token && !to.path.startsWith('/auth')) {
      return navigateTo('/auth/login');
    }
  
    // Redirigir al dashboard si ya está autenticado
    if (authStore.token && to.path.startsWith('/auth')) {
      console.log("Redirecting to dashboard");
      return navigateTo('/dashboard');
    }
  });