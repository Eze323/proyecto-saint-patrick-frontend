import { useAuthStore } from '@/stores/auth.store';
import type { LoginResponse,Credentials  } from '~/utils/types';

export const useAuth = () => {
  const authStore = useAuthStore();

  const login = async (credentials: Credentials) => {
    try {
      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      });

      authStore.setToken(response.token);
      authStore.setUser(response.user);

      navigateTo('/dashboard');
      return true;
    } catch (error: any) {
      console.error('Error durante el inicio de sesión:', error);

      if (error.response && error.response.status === 401) {
        console.log('Credenciales incorrectas (401)');
        throw new Error('Credenciales inválidas');
      } else if (error.response && error.response.status === 400) {
        console.log('Solicitud incorrecta (400)');
        throw new Error('Solicitud incorrecta');
      } else if (error.message === 'Network Error') {
        console.log('Error de red');
        throw new Error('Error de red');
      } else {
        console.log('Error desconocido:', error);
        throw new Error('Error desconocido');
      }
    }
  };

  const logout = async () => {
    authStore.clearToken();
    navigateTo('/auth/login');
  };

  return {
    login,
    logout,
  };
};