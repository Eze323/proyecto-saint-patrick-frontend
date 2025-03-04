import { defineStore } from 'pinia';
import { useAuthStore } from './auth.store';

export const useTransfersStore = defineStore('transfers', {
  state: () => ({
    form: {
      accountId: '',
      destinationType: 'cbuAlias' as 'cbuAlias' | 'card',
      cbuAlias: '',
      cardNumber: '',
      recipientName: '',   // Nuevo campo para mostrar el nombre del destinatario
      monto: null as number | null,
      fecha: new Date().toLocaleDateString(),
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

      if (destinationType === 'cbuAlias' && !cbuAlias) return;
      if (destinationType === 'card' && !cardNumber) return;

      try {
        const endpoint = destinationType === 'cbuAlias' ? '/api/check-user' : '/api/check-card';
        const value = destinationType === 'cbuAlias' ? cbuAlias : cardNumber;

        const response = await $fetch(endpoint, {
          method: 'POST',
          body: { [destinationType]: value },
        });

        if (response.exists) {
            if ('name' in response && 'lastname' in response) {
              this.form.recipientName = `${response.name} ${response.lastname}`; // Guardar nombre completo
            } else {
              this.form.recipientName = ''; // Limpiar si no existe
            }
          } else {
            this.errorMessage = destinationType === 'cbuAlias'
              ? 'El CBU o Alias no corresponde a un usuario registrado.'
              : 'El número de tarjeta no es válido.';
            this.form.recipientName = ''; // Limpiar si no existe
          }
        } catch (error) {
          this.errorMessage = 'Error al validar el destino. Intenta de nuevo.';
          this.form.recipientName = '';
        }
    },

    // Validar monto disponible
    validateMonto() {
        this.errorMessage = '';
        const authStore = useAuthStore();
        const { monto, accountId } = this.form;
      
 //       console.log('Validando monto:', { monto, accountId });
   //     console.log('Usuario en authStore:', authStore.user);
     //   console.log('Cuentas disponibles:', authStore.user?.accounts);
      
        if (!monto || monto <= 0) {
          this.errorMessage = 'El monto debe ser mayor a 0.';
       //   console.log('Error: Monto inválido');
          return;
        }
      
        const selectedAccount = authStore.user?.accounts.find(acc => acc.cbu === accountId);
     //  console.log('Cuenta seleccionada:', selectedAccount);
      
        if (!selectedAccount) {
          this.errorMessage = 'No se encontró la cuenta seleccionada.';
 //         console.log('Error: Cuenta no encontrada');
          return;
        }
      
        if (monto > selectedAccount.balance) {
          this.errorMessage = 'No tienes suficiente saldo en la cuenta seleccionada.';
   //       console.log('Error: Saldo insuficiente', { monto, balance: selectedAccount.balance });
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
      
        if (this.errorMessage) return;
      
        this.isSubmitting = true;
      
   //     console.log('Datos del formulario:', this.form);
   //     console.log('User ID desde authStore:', authStore.user?.id || 'No disponible');
   //     console.log('Usuario completo en authStore:', authStore.user);
      
        const requestBody = {
          ...this.form,
          userId: authStore.user?.id || 'unknown',
        };
    //    console.log('Cuerpo completo enviado:', requestBody);
      
        try {
          const response: any = await $fetch('/api/transfers', {
            method: 'POST',
            body: requestBody,
          });
      
     //     console.log('Respuesta del servidor:', response);
      
          if (typeof response === 'string' && response.startsWith('<!DOCTYPE html')) {
            throw new Error('Respuesta inesperada del servidor (HTML en lugar de JSON)');
          }
      
          if (response.success) {
            this.successMessage = 'Transferencia realizada con éxito. Revisa tu email para el comprobante.';
            this.resetForm();
            try {
                const updatedAccounts = await $fetch('/api/user/accounts', {
                  method: 'GET',
                  query: { userId: authStore.user?.id }, // Pasar el userId del usuario autenticado
                });
                if (authStore.user) {
                  authStore.user.accounts = updatedAccounts;
                }
                // if (authStore.user) {
                //   console.log('Cuentas actualizadas:', authStore.user.accounts);
                // }
              } catch (updateError) {
                console.error('Error al actualizar cuentas:', updateError);
              }
            } else {
              this.errorMessage = response.message || 'Error al procesar la transferencia.';
            }
          } catch (error) {
            console.error('Error en la llamada al servidor:', error);
            this.errorMessage = 'Hubo un problema al enviar la transferencia. Intenta de nuevo.';
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
        fecha: new Date().toLocaleDateString(),
        motivo: '',
        referencia: '',
        email: '',
      };
    },
  },
});