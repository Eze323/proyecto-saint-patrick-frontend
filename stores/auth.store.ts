import { defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { UserProfile } from '~/utils/types';
import { useNotifications } from '../composables/useNotifications';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null, // Token de autenticación
    user: null as UserProfile | null, // Información del usuario
    isLoading: false as boolean, // Indica si hay operaciones en curso (fetchUser, updateProfile, etc.)
    error: null as string | null, // Almacena mensajes de error para mostrar al usuario
    lastUpdated: null as string | null, // Timestamp de la última actualización del perfil
  }),

  getters: {
    isAuthenticated: (state) => !!state.token, // Verifica si el usuario está autenticado
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('auth-token', token);
    },

    setUser(user: UserProfile) {
      this.user = user;
      this.lastUpdated = new Date().toISOString(); // Actualiza el timestamp
      localStorage.setItem('auth-user', JSON.stringify(user));
    },

    clearToken() {
      this.token = null;
      this.user = null;
      this.error = null; // Limpia errores al cerrar sesión
      this.lastUpdated = null;
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-user');
    },

    logout() {
      this.clearToken();
      navigateTo('/auth/login');
    },

    async fetchUser() {
      if (!this.token) return;

      this.isLoading = true; // Inicia carga
      this.error = null; // Limpia errores previos
      const config = useRuntimeConfig();
      try {
        const user = await $fetch<UserProfile>(
          config.public.apiBaseUrl + '/api/user',
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.setUser(user);
      } catch (error) {
        this.error = 'Error fetching user data'; // Guarda el error
        console.error('Error fetching user:', error);
        this.clearToken();
        navigateTo('/auth/login');
      } finally {
        this.isLoading = false; // Finaliza carga
      }
    },

    async updateProfile(profileData: Partial<UserProfile>) {
      this.isLoading = true; // Inicia carga
      this.error = null; // Limpia errores previos
      const config = useRuntimeConfig();
      const { addNotification } = useNotifications();
    
      try {
        const response = await $fetch<{ success: boolean; user: { id: number; email: string; profile: UserProfile }; message: string }>(
          `${config.public.apiBaseUrl}/api/customer/update`, // Ajusta la URL según tu backend
          {
            method: 'PUT', // Coincide con tu método
            body: profileData, // No necesitas JSON.stringify, $fetch lo hace por ti
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
    
        // Verifica la respuesta y actualiza el usuario
        if (response.success) {
          console.log('Usuario recibido del backend:', response.user);
          if (this.user) {
            Object.assign(this.user, {
              ...this.user,
              ...response.user, // Asume que response.user tiene los campos directamente
            });
          } //else {
          //   this.user = { ...response.user }; // Caso inicial
          // }
          console.log('Usuario en store tras actualización:', this.user);
          addNotification(response.message || 'Perfil actualizado correctamente', 'success');
          return true;
        } else {
          throw new Error(response.message || 'Respuesta inesperada del servidor');
        }
      } catch (error: any) {
        const errorMsg = error.response?.data?.message || error.message || 'Error al actualizar el perfil';
        this.error = errorMsg;
        console.error('Error updating profile:', error);
        addNotification(errorMsg, 'error');
        throw error; // Propaga el error para que el componente lo maneje si es necesario
      } finally {
        this.isLoading = false; // Finaliza carga
      }
    }
  },
  persist: {
    storage: import.meta.client ? localStorage : undefined, // Solo usa localStorage en el cliente
  },
});