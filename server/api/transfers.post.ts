import { mockUsers } from '~/server/utils/mockBank';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    //console.log('Datos recibidos en /api/transfers:', body);

    const { accountId, cbuAlias, cardNumber, monto, userId } = body;

    if (!userId) {
      //console.log('Error: No se proporcionó userId');
      return { success: false, message: 'Usuario no identificado' };
    }

    const fromUser = mockUsers.find(u => u.id === userId);
    //console.log('Usuario origen:', fromUser);

    if (!fromUser) {
      //console.log('Error: Usuario no encontrado');
      return { success: false, message: 'Usuario no encontrado' };
    }

    const fromAccount = fromUser.accounts.find(acc => acc.cbu === accountId);
    //console.log('Cuenta origen encontrada:', fromAccount);

    if (!fromAccount || fromAccount.balance < monto) {
      //console.log('Fallo en cuenta origen:', { fromAccount, monto });
      return { success: false, message: 'Saldo insuficiente o cuenta no encontrada.' };
    }

    let toAccount = null;
    if (cbuAlias) {
      for (const user of mockUsers) {
        toAccount = user.accounts.find(acc => acc.cbu === cbuAlias);
        if (toAccount) break;
      }
    } else if (cardNumber) {
      for (const user of mockUsers) {
        toAccount = user.cards.find(card => card.cardNumber === cardNumber);
        if (toAccount) break;
      }
    }

    //console.log('Cuenta/tarjeta destino encontrada:', toAccount);

    if (!toAccount) {
      //console.log('Error: Destino no encontrado');
      return { success: false, message: 'Destino no encontrado.' };
    }

    fromAccount.balance -= monto;
    toAccount.balance += monto;

   // console.log('Transferencia procesada. Nuevos saldos:', { fromAccount, toAccount });

    return { success: true };
  } catch (error) {
    console.error('Error en /api/transfers:', error);
    return {
      success: false,
      message: `Error interno del servidor: ${(error as Error).message}`,
    };
  }
});