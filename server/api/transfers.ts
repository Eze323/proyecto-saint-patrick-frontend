export default defineEventHandler(async (event) => {
    const body = await readBody(event);
  
    // Validación básica
    if (!body.account || !body.amount || body.amount <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Datos de transferencia inválidos'
      });
    }
  
    // Simulación de transferencia exitosa
    return {
      success: true,
      message: `Transferencia de $${body.amount} a la cuenta ${body.account} realizada con éxito`
    };
  });