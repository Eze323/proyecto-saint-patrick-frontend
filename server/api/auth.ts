// import { H3Event } from 'h3'; // Importa H3Event para tipado

// export default defineEventHandler(async (event: H3Event) => { // Tipa el evento
//   const body = await readBody(event);

//   // Validación de entrada (¡MUY IMPORTANTE!)
//   if (!body.cardNumber || typeof body.cardNumber !== 'string' || body.cardNumber.trim() === '') {
//     throw createError({ statusCode: 400, message: 'Falta el número de tarjeta' });
//   }
//   if (!body.pin || typeof body.pin !== 'string' || body.pin.trim() === '') {
//     throw createError({ statusCode: 400, message: 'Falta el PIN' });
//   }

//   // Simulación de autenticación (¡REEMPLAZA ESTO CON AUTENTICACIÓN REAL!)
//   const cardNumber = body.cardNumber.trim(); // Limpia espacios en blanco
//   const pin = body.pin.trim();

//   if (cardNumber === '4546-8574-1856-5565' && pin === '4345') { // ¡NO USAR CREDENCIALES HARDCODEADAS EN PRODUCCIÓN!
//     const token = generateJwtToken({  // Genera un token JWT real
//       userId: '1', // Identificador único del usuario (reemplaza con el ID real)
//       name: 'Juan Pérez',
//       email: 'juan.perez@example.com'
//     });

//     return {
//       token,
//       user: {
//         name: 'Juan Pérez',
//         email: 'juan.perez@example.com'
//       }
//     };
//   }

//   throw createError({
//     statusCode: 401,
//     message: 'Credenciales inválidas'
//   });
// });


// // Función para generar un token JWT (¡IMPLEMENTA ESTO!)
// function generateJwtToken(payload: any): string {
//   // Aquí debes usar una librería JWT (como jsonwebtoken) para generar el token.
//   // Este es solo un ejemplo, NO LO USES EN PRODUCCIÓN tal cual.

//   // Ejemplo (requiere la librería jsonwebtoken):
//   // const jwt = require('jsonwebtoken');
//   // return jwt.sign(payload, 'secret_key', { expiresIn: '1h' }); // Reemplaza 'secret_key' con una clave secreta real

//   throw new Error("generateJwtToken no implementado.  Debes usar una librería JWT.");
// }