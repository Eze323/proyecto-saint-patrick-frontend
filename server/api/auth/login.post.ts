const users = [
  {
    cardNumber: '4546-8574-1856-5565',
    pin: '4345',
    profile: {
      name: 'Johan Sebastian Mastropiero',
      email: 'usuario1@example.com',
      address: 'Avenida Siempre Vivas 123',
      phone: '+54 11 1234-5678',
    },
    balance: 40555,
    accounts: [
      {
        accountNumber: '123456789',
        type: 'Cuenta Corriente',
        balance: 20000,
      },
      {
        accountNumber: '987654321',
        type: 'Caja de Ahorro',
        balance: 20555,
      },
    ],
    cards: [
      {
        cardNumber: '4546-8574-1856-5565',
        type: 'Débito',
        limit: 50000,
      },
      {
        cardNumber: '1234-5678-9012-3456',
        type: 'Crédito',
        limit: 100000,
      },
    ],
    transactions: [
      {
        id: 1,
        date: '2023-10-01',
        amount: -1500,
        description: 'Compra en supermercado',
      },
      {
        id: 2,
        date: '2023-10-05',
        amount: 5000,
        description: 'Depósito de sueldo',
      },
      {
        id: 3,
        date: '2023-10-10',
        amount: -200,
        description: 'Pago de servicio de streaming',
      },
    ],
  },
  // Más usuarios...
];

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
  const user = users.find(
    (u) => u.cardNumber === body.cardNumber && u.pin === body.pin
  );

  if (user) {
    // Si las credenciales son válidas, devolver el token y los datos del usuario
    return {
      token: 'fake-jwt-token', // En un entorno real, genera un token JWT
      user: {
        profile: user.profile,
        balance: user.balance,
        accounts: user.accounts,
        cards: user.cards,
        transactions: user.transactions,
      },

    };
  }

  // Si las credenciales son inválidas, devolver un error
  throw createError({
    statusCode: 401,
    message: 'Credenciales inválidas',
  });
});