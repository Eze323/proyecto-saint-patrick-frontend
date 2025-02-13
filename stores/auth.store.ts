import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as { name: string; email: string; balance?: number } | null, // Agregamos balance como opcional
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('auth-token', token);
    },

    setUser(user: { name: string; email: string; balance?: number }) { // Método setUser agregado
      this.user = user;
      localStorage.setItem('auth-user', JSON.stringify(user)); // Persistir en localStorage
    },

    clearToken() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-user'); // Limpiar también los datos del usuario
    },

    logout() {
      this.clearToken();
      navigateTo('/auth/login');
    },

    async fetchUser() {
      if (this.token) {
        // Simulación de obtención de datos del usuario
        const user = {
          name: 'Juan Pérez',
          email: 'juan.perez@example.com',
          balance: 1000, // Ejemplo de saldo
        };
        this.setUser(user); // Usamos setUser para actualizar el store
      }
    },
  },
});