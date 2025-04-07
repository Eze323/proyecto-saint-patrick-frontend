// utils/types.d.ts

// Interfaz para una cuenta bancaria
export interface Account {
  enterprise: string; // Corrección de 'enterprice' a 'enterprise'
  cbu: string;
  type:string;  //'Cuenta Corriente' | 'Caja de Ahorro' | 'Cuenta Sueldo'; // Tipado más específico
  balance: number;
  alias?: string; // Opcional
  currency?: string; // Opcional
  status?:string; // 'Activa' | 'Bloqueada' | 'Vencida' | 'Suspendida'; // Opcional
  accountNumber?: string; // Opcional
  createdAt?: string; // Opcional (formato ISO)
  updatedAt?: string; // Opcional (formato ISO)
}

// Interfaz para una tarjeta
export interface Card {
  cardNumber: string; // Número de la tarjeta (puede estar enmascarado o completo)
  type: string //'Crédito' | 'Débito'; // Tipado más específico
  issuer: string; // Emisor de la tarjeta (ej: "Visa", "MasterCard")
  holder: string; // Nombre del titular de la tarjeta
  expiry: string; // Fecha de vencimiento (formato: "MM/YY")

  // Información financiera
  balance: number; // Saldo disponible
  limit: number; // Límite de crédito (si es una tarjeta de crédito)
  currency: string; // Moneda (ej: "USD", "ARS")

  // Estado y seguridad
  status: string; //'Activa' | 'Bloqueada' | 'Vencida' | 'Suspendida'; // Estado de la tarjeta
  isVirtual: boolean; // Indica si es una tarjeta virtual
  cvc?: string; // Código de seguridad (opcional, puede estar enmascarado)

  // Información adicional
  createdAt?: string; // Fecha de creación (formato ISO o similar)
  updatedAt?: string; // Fecha de última actualización (formato ISO o similar)
}

// Interfaz para una transacción
export interface Transaction {
  id: number;
  date: string; // Formato ISO o similar
  amount: number;
  recipient: string;
  description: string;
}

// Nueva interfaz para una inversión
export interface Investment {
  name: string; // Nombre de la inversión
  amount: number; // Monto invertido
  yield: number; // Rendimiento en porcentaje
  date: string; // Fecha de inicio (formato ISO o similar)
  monthlyReturns: { month: string; value: number }[]; // Nuevo array de rendimientos mensuales
}

// Nueva interfaz para estadísticas mensuales
export interface MonthlyStats {
  labels: string[]; // Meses o etiquetas
  incomes: number[]; // Ingresos mensuales
  expenses: number[]; // Gastos mensuales
}

// Nueva interfaz para una reserva
export interface Reservation {
  name: string; // Nombre de la reserva
  currentAmount: number; // Monto ahorrado
  targetAmount: number; // Meta de ahorro
  progress: number; // Progreso en porcentaje
}

// Nueva interfaz para el desglose de gastos
export interface ExpenseBreakdown {
  category: string; // Categoría del gasto
  percentage: number; // Porcentaje del total
  amount: number; // Monto en la categoría
}

// Interfaz para el perfil de usuario
export interface UserProfile {
  id: string;
  cardNumber: string;
  pin: string;
  profile: {
    name: string;
    lastname: string; // Añadido para coincidir con mockUsers
    email: string;
    address?: string;
    phone?: string;
    zip?: string;
    locality?: string;
    province?: string;
    country?: string;
  };
  balance: number;
  accounts: Account[];
  cards: Card[];
  transactions: Transaction[];
  investments: Investment[]; // Nueva propiedad
  monthlyStats: MonthlyStats; // Nueva propiedad
  reservations: Reservation; // Nueva propiedad
  expensesBreakdown: ExpenseBreakdown[]; // Nueva propiedad
}

// Interfaz para la respuesta de login
export interface LoginResponse {
  token: string;
  user: UserProfile;
}

// Interfaz para las credenciales de login
export interface Credentials {
  cardNumber: string;
  pin: string;
}

// Interfaz para la respuesta de validación de usuario
interface ValidationResponse {
  exists: boolean;
  name?: string;
  lastname?: string;
}

// Interfaz para la respuesta de transferencia
interface TransferResponse {
  success: boolean;
  message?: string;
}