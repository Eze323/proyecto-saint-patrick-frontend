import {mockUsers} from "~/server/utils/mockBank";
import { useAuthStore } from "~/stores/auth.store";

export default defineEventHandler(async (event) => {
    try {
      // Simulamos el usuario autenticado (temporalmente)
      //const userId = 'user1'; // Hardcodeado por ahora, luego lo pasaremos desde el cliente
      const { userId } = getQuery(event); // Obtener userId del query
  
      const user = mockUsers.find(u => u.id === userId);
  
      if (!user) {
        throw createError({
          statusCode: 404,
          message: 'Usuario no encontrado',
        });
      }
  
  //    console.log('Devolviendo cuentas para userId:', userId);
      return user.accounts;
    } catch (error) {
    //  console.error('Error en /api/user/accounts:', error);
      throw createError({
        statusCode: 500,
        message: 'Error interno al obtener las cuentas',
      });
    }
  });
