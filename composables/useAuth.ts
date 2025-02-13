import { useAuthStore } from '@/stores/auth.store';


// Define la interfaz para las credenciales
interface Credentials {
  cardNumber: string;
  pin: string;
}


export const useAuth = () => {
  const authStore = useAuthStore();


  const login = async (credentials: Credentials) => {  // Recibe un objeto credentials

    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials,
      });
  
      // Almacenar el token y los datos del usuario en el store
      authStore.setToken(response.token);
      authStore.setUser(response.user);
  
      // Redirigir al dashboard
      navigateTo('/dashboard');
    } catch (error) {
      console.log('Error durante el inicio de sesión:  error');
      console.log('Credenciales inválidas');
    }
  };

  const logout = async () => {
    authStore.clearToken();
    navigateTo('/auth/login'); // Usa router.push para la redirección
  };

  return {
    login,
    logout
  };
};