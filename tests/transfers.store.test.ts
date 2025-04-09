import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTransfersStore } from '../stores/transfers.store';
import { useAuthStore } from '../stores/auth.store';

// Mock de useRuntimeConfig
vi.mock('nuxt/app', () => ({
  useRuntimeConfig: () => ({
    public: {
      apiBaseUrl: 'https://api-bank-saint-patrick.laravel.cloud', // URL de tu backend
    },
  }),
}));

// Importar el tipo $Fetch desde 'nitropack' o definirlo si no está disponible
import type { $Fetch, NitroFetchRequest } from 'nitropack';

// Definir $fetch como global antes de cualquier importación
// Mock global de $fetch con las propiedades necesarias
global.$fetch = vi.fn() as unknown as $Fetch<unknown, NitroFetchRequest>;

describe('Transfers Store', () => {
  let transfersStore: ReturnType<typeof useTransfersStore>;
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    transfersStore = useTransfersStore();
    authStore = useAuthStore();

    // Mockear estado inicial del authStore
    Object.defineProperty(authStore, 'isAuthenticated', { value: true });
    authStore.user = {
      id: '1',
      cardNumber: '4546-8574-1856-5565',
      pin: '4345',
      profile: {
        name: 'Juan',
        lastname: 'Pérez',
        email: 'juan@example.com',
        address: 'Calle Falsa 123',
        phone: '123456789',
        zip: '1234',
        locality: 'Buenos Aires',
        province: 'Buenos Aires',
        country: 'Argentina',
      },
      balance: 1000,
      accounts: [
        {
          cbu: '12345',
          enterprise: 'Banco',
          type: 'Ahorro',
          balance: 1000,
          alias: 'miAlias',
          currency: 'ARS',
          status: 'Activa',
          accountNumber: '123456789',
          createdAt: '2025-04-08T00:00:00Z',
          updatedAt: '2025-04-08T00:00:00Z',
        },
      ],
      cards: [
        {
          cardNumber: '1234-5678-9012-3456',
          type: 'Débito',
          issuer: 'Visa',
          holder: 'Juan Pérez',
          expiry: '12/25',
          balance: 1000,
          limit: 0,
          currency: 'ARS',
          status: 'Activa',
          isVirtual: false,
          cvc: '123',
          createdAt: '2025-04-08T00:00:00Z',
          updatedAt: '2025-04-08T00:00:00Z',
        },
      ],
      transactions: [
        {
          id: 1,
          date: '2025-04-08T00:00:00Z',
          amount: 500,
          recipient: 'María Gómez',
          description: 'Pago de factura',
        },
      ],
      investments: [
        {
          name: 'Fondo Común',
          amount: 1000,
          yield: 5.5,
          date: '2025-01-01T00:00:00Z',
          monthlyReturns: [{ month: 'Enero', value: 50 }],
        },
      ],
      monthlyStats: {
        labels: ['Enero', 'Febrero'],
        incomes: [1000, 1200],
        expenses: [500, 600],
      },
      reservations: {
        name: 'Viaje',
        currentAmount: 200,
        targetAmount: 1000,
        progress: 20,
      },
      expensesBreakdown: [
        {
          category: 'Comida',
          percentage: 50,
          amount: 250,
        },
      ],
    };
    authStore.token = 'fake-token';

    transfersStore.resetForm();
  });

  // Pruebas para validateMonto
  it('validateMonto falla si el monto es menor o igual a 0', () => {
    transfersStore.form.monto = 0;
    transfersStore.validateMonto();
    expect(transfersStore.errorMessage).toBe('El monto debe ser mayor a 0.');

    transfersStore.form.monto = -1;
    transfersStore.validateMonto();
    expect(transfersStore.errorMessage).toBe('El monto debe ser mayor a 0.');
  });

  it('validateMonto falla si no hay cuenta seleccionada', () => {
    transfersStore.form.accountId = '99999'; // Cuenta inexistente
    transfersStore.form.monto = 100;
    transfersStore.validateMonto();
    expect(transfersStore.errorMessage).toBe('No se encontró la cuenta seleccionada.');
  });

  it('validateMonto falla si el monto excede el saldo', () => {
    transfersStore.form.accountId = '12345';
    transfersStore.form.monto = 2000;
    transfersStore.validateMonto();
    expect(transfersStore.errorMessage).toBe('No tienes suficiente saldo en la cuenta seleccionada.');
  });

  it('validateMonto pasa con monto válido', () => {
    transfersStore.form.accountId = '12345';
    transfersStore.form.monto = 500;
    transfersStore.validateMonto();
    expect(transfersStore.errorMessage).toBe('');
  });

  // Pruebas para validateFecha
  it('validateFecha falla con fecha inválida', () => {
    transfersStore.form.fecha = 'invalid-date';
    const result = transfersStore.validateFecha();
    expect(result).toBe(false);
    expect(transfersStore.errorMessage).toBe('Por favor, selecciona una fecha válida.');
  });

  it('validateFecha pasa con fecha válida', () => {
    transfersStore.form.fecha = '2025-03-28';
    const result = transfersStore.validateFecha();
    expect(result).toBe(true);
    expect(transfersStore.errorMessage).toBe('');
  });

  // Prueba para submitTransfer (simulando éxito)
  it('submitTransfer envía transferencia con éxito', async () => {
    const mockFetch = vi.mocked($fetch);
    mockFetch.mockResolvedValueOnce({ exists: true, name: 'Juan', lastname: 'Pérez' }); // validateDestination
    mockFetch.mockResolvedValueOnce({ success: true }); // submitTransfer
    mockFetch.mockResolvedValueOnce([{ cbu: '12345', balance: 500 }]); // updateAccounts

    transfersStore.form.accountId = '12345';
    transfersStore.form.destinationType = 'cbuAlias';
    transfersStore.form.cbuAlias = 'alias123';
    transfersStore.form.monto = 500;
    transfersStore.form.fecha = '2025-03-28';
    transfersStore.form.motivo = 'Pago';
    transfersStore.form.referencia = 'Ref123';
    transfersStore.form.email = 'juan@example.com';

    await transfersStore.submitTransfer();

    expect(transfersStore.successMessage).toBe('Transferencia realizada con éxito. Revisa tu email para el comprobante.');
    expect(transfersStore.errorMessage).toBe('Error al enviar la transferencia.');
    expect(transfersStore.isSubmitting).toBe(false);
  });

  // Prueba para submitTransfer (simulando error)
  it('submitTransfer falla con error del backend', async () => {
    const mockFetch = vi.mocked($fetch);
    mockFetch.mockResolvedValueOnce({ exists: true, name: 'Juan', lastname: 'Pérez' }); // validateDestination
    mockFetch.mockRejectedValueOnce({ response: { data: { message: 'Fondos insuficientes' } } }); // submitTransfer

    transfersStore.form.accountId = '12345';
    transfersStore.form.destinationType = 'cbuAlias';
    transfersStore.form.cbuAlias = 'alias123';
    transfersStore.form.monto = 500;
    transfersStore.form.fecha = '2025-03-28';

    await transfersStore.submitTransfer();

    expect(transfersStore.errorMessage).toBe('Fondos insuficientes');
    expect(transfersStore.successMessage).toBe('');
    expect(transfersStore.isSubmitting).toBe(false);
  });
});