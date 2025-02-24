// Este archivo es el store de autenticación, aquí guardamos el token y el usuario
import { defineStore } from 'pinia';
import type { UserProfile } from '~/utils/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as UserProfile | null, // Usamos la interfaz UserProfile
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('auth-token', token);
    },

    setUser(user: UserProfile) {
      this.user = user;
      localStorage.setItem('auth-user', JSON.stringify(user));
    },

    clearToken() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-user');
    },

    logout() {
      this.clearToken();
      navigateTo('/auth/login');
    },

    async fetchUser() {
      if (this.token) {
        try {
          const user = await $fetch<UserProfile>('/api/user', {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.setUser(user);
        } catch (error) {
          console.error('Error fetching user:', error);
          this.clearToken();
          navigateTo('/auth/login');
        }
      }
    },
  },
  persist: true,
  
});