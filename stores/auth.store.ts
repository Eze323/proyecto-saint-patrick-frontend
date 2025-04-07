import { defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { UserProfile } from '~/utils/types';

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
      try {
        const response = await $fetch<UserProfile>(
          `${config.public.apiBaseUrl}/api/customer/update`,
          {
            method: 'PUT',
            body: JSON.stringify(profileData),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        const updatedUser = {
          ...this.user,
          profile: {
            ...this.user.profile,
            ...response.profile,
          },
        };

        this.setUser(updatedUser); // Actualiza el usuario y el timestamp
        console.log('Perfil actualizado correctamente:', updatedUser);
        return true;
      } catch (error) {
        this.error = 'Error updating profile'; // Guarda el error
        console.error('Error updating profile:', error);
        throw error;
      } finally {
        this.isLoading = false; // Finaliza carga
      }
    },
  },
  persist: {
    storage: import.meta.client ? localStorage : undefined, // Solo usa localStorage en el cliente
  },
});