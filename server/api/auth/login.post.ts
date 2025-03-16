import { mockUsers } from "~/server/utils/mockBank";
import { useAuthStore } from "~/stores/auth.store";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validar que se proporcionen las credenciales
  if (!body.cardNumber || !body.pin) {
    throw createError({
      statusCode: 400,
      message: 'Faltan las credenciales',
    });
  }

  // Buscar al usuario en la lista
  const user = mockUsers.find(
    (u) => u.cardNumber === body.cardNumber && u.pin === body.pin
  );

  if (user) {
    //simular almacenar el usuario autenticado
    //const authStore = useAuthStore();
    //authStore.setUser(user);
    
    // Si las credenciales son válidas, devolver el token y los datos del usuario
    return {
      token: 'fake-jwt-token', // En un entorno real, genera un token JWT
      user: {
        id: user.id,
        profile: user.profile,
        balance: user.balance,
        accounts: user.accounts,
        cards: user.cards,
        transactions: user.transactions,
        investments: user.investments, // Añadido
        monthlyStats: user.monthlyStats, // Añadido
        reservations: user.reservations, // Añadido
        expensesBreakdown: user.expensesBreakdown, // Añadido
        cardNumber: user.cardNumber, // Añadido
        pin: user.pin, // Añadido
      },

    };
  }

  // Si las credenciales son inválidas, devolver un error
  throw createError({
    statusCode: 401,
    message: 'Credenciales inválidas',
  });
});