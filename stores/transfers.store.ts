import { defineStore } from 'pinia';
import { useAuthStore } from './auth.store';
import type { Account, TransferResponse, ValidationResponse } from '~/utils/types';

const config = useRuntimeConfig();

export const useTransfersStore = defineStore('transfers', {
  state: () => ({
    form: {
      accountId: '',
      destinationType: 'cbuAlias' as 'cbuAlias' | 'card',
      cbuAlias: '',
      cardNumber: '',
      recipientName: '',
      monto: null as number | null,
      fecha: new Date().toISOString().split('T')[0], // YYYY-MM-DD para <input type="date">
      motivo: '',
      referencia: '',
      email: '',
    },
    errorMessage: '',
    successMessage: '',
    isSubmitting: false,
  }),

  actions: {
    // Validar destino (CBU/Alias o Tarjeta)
    async validateDestination() {
      this.errorMessage = '';
      const { destinationType, cbuAlias, cardNumber } = this.form;
      const authStore = useAuthStore();

      if (destinationType === 'cbuAlias' && !cbuAlias) return;
      if (destinationType === 'card' && !cardNumber) return;

      try {
        const endpoint = destinationType === 'cbuAlias' ? '/api/check-user' : '/api/check-card';
        const value = destinationType === 'cbuAlias' ? cbuAlias : cardNumber;

        const response = await $fetch<ValidationResponse>(`${config.public.apiBaseUrl}${endpoint}`, {
          method: 'POST',
          body: { [destinationType]: value },
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        if (response.exists && response.name && response.lastname) {
          this.form.recipientName = `${response.name} ${response.lastname}`;
        } else {
          this.errorMessage = destinationType === 'cbuAlias'
            ? 'El CBU o Alias no corresponde a un usuario registrado.'
            : 'El número de tarjeta no es válido.';
          this.form.recipientName = '';
        }
      } catch (error) {
        console.error('Error al validar destino:', error);
        this.errorMessage = 'Error al validar el destino. Intenta de nuevo.';
        this.form.recipientName = '';
      }
    },

    // Validar monto disponible
    validateMonto() {
      this.errorMessage = '';
      const authStore = useAuthStore();
      const { monto, accountId } = this.form;

      if (!monto || monto <= 0) {
        this.errorMessage = 'El monto debe ser mayor a 0.';
        return;
      }

      const selectedAccount = authStore.user?.accounts.find(acc => acc.cbu === accountId);
      if (!selectedAccount) {
        this.errorMessage = 'No se encontró la cuenta seleccionada.';
        return;
      }

      if (monto > selectedAccount.balance) {
        this.errorMessage = 'No tienes suficiente saldo en la cuenta seleccionada.';
        return;
      }
    },

    // Validar fecha
    validateFecha() {
      this.errorMessage = '';
      const { fecha } = this.form;
      if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        this.errorMessage = 'Por favor, selecciona una fecha válida.';
        return false;
      }
      return true;
    },

    // Actualizar cuentas
    async updateAccounts() {
      const authStore = useAuthStore();
      try {
        const updatedAccounts = await $fetch<Account[]>(`${config.public.apiBaseUrl}/api/user/accounts`, {
          method: 'GET',
          query: { userId: authStore.user?.id },
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        if (authStore.user) {
          authStore.user.accounts = updatedAccounts;
        }
      } catch (error) {
        console.error('Error al actualizar cuentas:', error);
      }
    },

    // Enviar transferencia
    async submitTransfer() {
      this.errorMessage = '';
      this.successMessage = '';
      const authStore = useAuthStore();

      if (!authStore.isAuthenticated) {
        this.errorMessage = 'Debes iniciar sesión para realizar una transferencia.';
        navigateTo('/auth/login');
        return;
      }

      if (!this.form.accountId) {
        this.errorMessage = 'Selecciona una cuenta de origen.';
        return;
      }

      await this.validateDestination();
      this.validateMonto();
      if (!this.validateFecha()) return;

      if (this.errorMessage) return;

      this.isSubmitting = true;

      // Convertir fecha a d/m/Y para el backend
      const fechaFormatted = new Date(this.form.fecha).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const requestBody = {
        ...this.form,
        fecha: fechaFormatted, // Enviar en formato d/m/Y
        userId: authStore.user?.id || 'unknown',
      };

      try {
        console.log('Enviando transferencia con:', requestBody); // Debug
        const response = await $fetch<TransferResponse>(`${config.public.apiBaseUrl}/api/transfers`, {
          method: 'POST',
          body: requestBody,
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        if (response.success) {
          this.successMessage = 'Transferencia realizada con éxito. Revisa tu email para el comprobante.';
          this.resetForm();
          await this.updateAccounts();
          navigateTo('/dashboard');
        } else {
          this.errorMessage = response.message || 'Error al procesar la transferencia.';
        }
      } catch (error: any) {
        console.error('Error en la transferencia:', error);
        const errorDetail = error.response?.data?.errors?.fecha?.[0] || error.response?.data?.message || 'Error al enviar la transferencia.';
        this.errorMessage = errorDetail;
      } finally {
        this.isSubmitting = false;
      }
    },

    // Reiniciar formulario
    resetForm() {
      this.form = {
        accountId: '',
        destinationType: 'cbuAlias',
        cbuAlias: '',
        cardNumber: '',
        recipientName: '',
        monto: null,
        fecha: new Date().toISOString().split('T')[0], // Reinicia como YYYY-MM-DD
        motivo: '',
        referencia: '',
        email: '',
      };
    },
  },
});