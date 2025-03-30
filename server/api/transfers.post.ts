import { mockUsers } from '~/server/utils/mockBank';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    

    const { accountId, cbuAlias, cardNumber, monto, userId } = body;

    if (!userId) {
      
      return { success: false, message: 'Usuario no identificado' };
    }

    const fromUser = mockUsers.find(u => u.id === userId);
    

    if (!fromUser) {
    
      return { success: false, message: 'Usuario no encontrado' };
    }

    const fromAccount = fromUser.accounts.find(acc => acc.cbu === accountId);
    

    if (!fromAccount || fromAccount.balance < monto) {
    
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

    

    if (!toAccount) {
    
      return { success: false, message: 'Destino no encontrado.' };
    }

    fromAccount.balance -= monto;
    toAccount.balance += monto;

   

    return { success: true };
  } catch (error) {
    console.error('Error en /api/transfers:', error);
    return {
      success: false,
      message: `Error interno del servidor: ${(error as Error).message}`,
    };
  }
});