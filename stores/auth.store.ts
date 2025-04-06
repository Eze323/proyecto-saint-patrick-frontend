import { defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
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

        const config = useRuntimeConfig();
        try {
          const user = await $fetch<UserProfile>(
            config.public.apiBaseUrl +'/api/user', {
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

    async updateProfile(profileData: Partial<UserProfile>) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<UserProfile>(`${config.public.apiBaseUrl}/api/customer/update`, {
          method: 'PUT',
          body: JSON.stringify(profileData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`, // Asegúrate de incluir el token si el backend lo requiere
          },
        });

        // Conservar todos los datos existentes del usuario y solo actualizar el perfil
    const updatedUser = {
      ...this.user,
      profile: {
        ...this.user.profile,
        ...response.profile, // Sobrescribe solo los campos del perfil que vienen en la respuesta
      },
    };

    this.setUser(updatedUser); // Guarda el usuario actualizado

    console.log('Perfil actualizado correctamente:', updatedUser);
    return true;
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error; // O manejar el error con un alert/notificación
      }
    },
  },
  persist: {
    storage: import.meta.client ? localStorage : undefined, // Solo usa localStorage en el cliente
  },
});