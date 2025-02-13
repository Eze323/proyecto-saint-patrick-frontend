export default defineEventHandler(async (event) => {
    const body = await readBody(event);
  
    // Validación básica
    if (!body.name || !body.email) {
      throw createError({
        statusCode: 400,
        message: 'Nombre y correo electrónico son requeridos'
      });
    }
  
    // Simulación de actualización exitosa
    return {
      success: true,
      user: {
        name: body.name,
        email: body.email
      }
    };
  });