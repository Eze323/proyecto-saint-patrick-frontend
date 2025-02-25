//utils/types.d.ts

export interface Account {
    enterprice: string;
    cbu: string;
    type: string;
    balance: number;
  }
  
  export interface Card {
    cardNumber: string;
    type: string;
    limit: number;
  }
  
  export interface Transaction {
    id: number;
    date: string;
    amount: number;
    description: string;
    recipient: string;
  }
  
  export interface UserProfile {
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