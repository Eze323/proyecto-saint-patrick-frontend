import { useAuthStore } from '@/stores/auth.store';
import type { Credentials, LoginResponse } from '~/utils/types';

export const useAuth = () => {
  const authStore = useAuthStore();

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param credentials - Objeto con el número de tarjeta y el PIN.
   */
  const login = async (credentials: Credentials) => {
    try {
      // Realiza la solicitud al endpoint de login
      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      });

      // Almacena el token y los datos del usuario en el store
      authStore.setToken(response.token);
      authStore.setUser(response.user);

      // Redirige al dashboard después del login exitoso
      navigateTo('/dashboard');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);

      // Muestra un mensaje de error al usuario (puedes usar un toast o un alert)
      alert('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  /**
   * Cierra la sesión del usuario.
   */
  const logout = () => {
    // Limpia el token y los datos del usuario en el store
    authStore.clearToken();

    // Redirige al usuario a la página de login
    navigateTo('/auth/login');
  };

  return {
    login,
    logout,
  };
};