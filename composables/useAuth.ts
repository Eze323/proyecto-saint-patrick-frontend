import { useAuthStore } from '@/stores/auth.store';
import { useNotifications } from '../composables/useNotifications';
import type { Credentials, LoginResponse } from '~/utils/types';

export const useAuth = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const { addNotification } = useNotifications();

  const login = async (credentials: Credentials, redirectTo: string = '/dashboard') => {
    authStore.isLoading = true;
    authStore.error = null;

    try {
      const response = await $fetch<LoginResponse>(
        `${config.public.apiBaseUrl}/api/login`,
        {
          method: 'POST',
          body: credentials,
        }
      );
      authStore.setToken(response.token);
      authStore.setUser(response.user);
      if (import.meta.client) {
        navigateTo(redirectTo);
      }
      addNotification('Inicio de sesión exitoso', 'success');
      return true;
    } catch (error: any) {
      const errorMsg = error.data?.message || error.message || 'Credenciales inválidas';
      authStore.error = errorMsg;
      addNotification(errorMsg, 'error');
      throw error;
    } finally {
      authStore.isLoading = false;
    }
  };

  const register = async (credentials: Credentials, redirectTo: string = '/auth/login') => {
    authStore.isLoading = true;
    authStore.error = null;

    try {
      const response = await $fetch<LoginResponse>(
        `${config.public.apiBaseUrl}/api/register`,
        {
          method: 'POST',
          body: credentials,
        }
      );
      if (response.token && response.user) {
        authStore.setToken(response.token);
        authStore.setUser(response.user);
      }
      if (import.meta.client) {
        navigateTo(redirectTo);
      }
      addNotification('Registro exitoso', 'success'); // Añadido
      return true;
    } catch (error: any) {
      const errorMsg = error.message || 'Error durante el registro';
      authStore.error = errorMsg;
      console.error('Error en el registro:', error);
      throw error;
    } finally {
      authStore.isLoading = false;
    }
  };

  const logout = (redirectTo: string = '/auth/login') => {
    authStore.logout();
    if (import.meta.client) {
      navigateTo(redirectTo);
    }
    addNotification('Sesión cerrada', 'info');
  };

  return {
    login,
    register,
    logout,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: computed(() => authStore.isLoading),
    error: computed(() => authStore.error),
  };
};