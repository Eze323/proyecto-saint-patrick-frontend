const users = [
  {
    cardNumber: '4546-8574-1856-5565',
    pin: '4345',
    profile: {
      name: 'Johan Sebastian',
      lastname: 'Mastropiero',
      email: 'johanSebastian@mastropiero.com',
      address: 'Avenida Siempre Vivas 123',
      phone: '+54 11 1234-5678',
      zip: '1603',
      locality: 'Monte Grande',
      province: 'Buenos Aires',
      country: 'Argentina',

    },
    balance: 30678,
    accounts: [
      {
        enterprice: 'Saint Patrick Bank',
        cbu: '000005694857483903',
        type: 'Cuenta Corriente',
        balance: 35621,
      },
      {
        enterprice: 'Mercado Pago',
        cbu: '0000023449594943',
        type: 'Caja de Ahorro',
        balance: 650000,
      },
      {
        enterprice: 'BBVA Banco Francés',
        cbu: '000001234550433334',
        type: 'Cuena Sueldo',
        balance: 115895,
      },
    ],
    cards: [
      {
        cardNumber: '4546-8574-1856-5565',
        type: 'Débito',
        limit: 50000,
        balance: 30678,
        issuer: 'Visa',
        holder: 'Johan Sebastian Mastropiero',
        expiry: '10/25',
        currency: 'ARS',
        status: 'Activa',
        isVirtual: false,
        cvc: '***',
      },
      {
        cardNumber: '1234-5678-9012-3456',
        type: 'Crédito',
        limit: 100000,
        balance: 0,
        issuer: 'MasterCard',
        holder: 'Johan Sebastian Mastropiero',
        expiry: '12/26',
        currency: 'USD',
        status: 'Activa',
        isVirtual: false,
        cvc: '***',
      },
    ],
    transactions: [
      {
        id: 1,
        date: '2023-10-01',
        amount: -1500,
        recipient: 'Supermercado',
        description: 'Compra en supermercado',
      },
      {
        id: 2,
        date: '2023-10-05',
        amount: 5000,
        recipient: 'Tu empleador',
        description: 'Depósito de sueldo',
      },
      {
        id: 3,
        date: '2023-10-10',
        amount: -200,
        recipient: 'Netflix',
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