const users = [
    {
      cardNumber: '4546-8574-1856-5565',
      pin: '4345',
      name: 'Usuario 1',
      email: 'usuario1@example.com',
      balance: 40555,
    },
    {
      cardNumber: '5595-3458-9989-7125',
      pin: '1595',
      name: 'Usuario 2',
      email: 'usuario2@example.com',
      balance: 3566,
    },
    {
      cardNumber: '4858-6696-5887-1578',
      pin: '1234',
      name: 'Usuario 3',
      email: 'usuario3@example.com',
      balance: 23,
    },
    {
      cardNumber: '5854-6656-2587-1547',
      pin: '4345',
      name: 'Usuario 4',
      email: 'usuario4@example.com',
      balance: 300,
    },
    {
      cardNumber: '4546-9896-2357-1478',
      pin: '0023',
      name: 'Usuario 5',
      email: 'usuario5@example.com',
      balance: 35621,
    },
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
          name: user.name,
          email: user.email,
          balance: user.balance,
        },
      };
    }
  
    // Si las credenciales son inválidas, devolver un error
    throw createError({
      statusCode: 401,
      message: 'Credenciales inválidas',
    });
  });