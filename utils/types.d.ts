//utils/types.d.ts

export interface Account {
  
  enterprice: string;  
  cbu: string;
  type: string;
  balance: number;
 }
 
 export interface Card {
  // Información básica
  
  cardNumber: string; // Número de la tarjeta (puede estar enmascarado o completo)
  type: string; // Tipo de tarjeta  'Crédito' | 'Débito'
  issuer: string; // Emisor de la tarjeta (ej: "Visa", "MasterCard")
  holder: string; // Nombre del titular de la tarjeta
  expiry: string; // Fecha de vencimiento (formato: "MM/YY")

  // Información financiera
  balance: number; // Saldo disponible
  limit: number; // Límite de crédito (si es una tarjeta de crédito)
  currency: string; // Moneda (ej: "USD", "ARS")

  // Estado y seguridad
  status: 'Activa' | 'Bloqueada' | 'Vencida' | 'Suspendida'; // Estado de la tarjeta
  isVirtual: boolean; // Indica si es una tarjeta virtual
  cvc?: string; // Código de seguridad (opcional, puede estar enmascarado)

  // Información adicional
  createdAt?: string; // Fecha de creación (formato ISO o similar)
  updatedAt?: string; // Fecha de última actualización (formato ISO o similar)
}
 
 export interface Transaction {
   id: number;
   date: string;
   amount: number;
   recipient: string; 
   description: string;
 }
 
 export interface UserProfile {
    id: string;
   cardNumber: string;
   pin: string;
   profile: {
     name: string;
     email: string;
     address?: string; // Opcional
     phone?: string; // Opcional
      zip?: string; // Opcional
      locality?: string; // Opcional
      province?: string; // Opcional
      country?: string; // Opcional

   };
   balance: number;
   accounts: Account[];
   cards: Card[];
   transactions: Transaction[];
 }
 
 export interface LoginResponse {
   token: string;
   user: UserProfile;
 }
 
 // Agregamos el tipo Credentials
 export interface Credentials {
   cardNumber: string;
   pin: string;
 }