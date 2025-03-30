import { useAuthStore } from '@/stores/auth.store';
import type { Credentials, LoginResponse } from '~/utils/types';


export const useAuth = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param credentials - Objeto con el número de tarjeta y el PIN.
   */
  const login = async (credentials: Credentials) => {
    try {
      // Realiza la solicitud al endpoint de login
      const response = await $fetch<LoginResponse>(
        // config.public.apiUrl
        config.public.apiBaseUrl+'/api/login', {
        method: 'POST',
        body: credentials,
      });

      // Almacena el token y los datos del usuario en el store
      authStore.setToken(response.token);
      authStore.setUser(response.user);

      // Redirige al dashboard después del login exitoso
      navigateTo('/dashboard');
      return true;
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);

      // Muestra un mensaje de error al usuario (puedes usar un toast o un alert)
      alert('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  const register = async (credentials: Credentials) => {
    const config = useRuntimeConfig();
    // Lógica de registro
    try {
      // Simula una llamada a la API
      const response = await fetch(
        // config.public.apiBaseUrl+
        config.public.apiBaseUrl+'/api/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Error durante el registro');
      }

      return true; // Registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  };
  /**
   * Cierra la sesión del usuario.
   */
  const logout = () => {
    // Limpia el token y los datos del usuario en el store
    authStore.clearToken();
  
    // Limpia el localStorage
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    // Limpia el sessionStorage

    // Redirige al usuario a la página de login
    navigateTo('/auth/login');
  };

  return {
    login,
    register,
    logout,
  };
};