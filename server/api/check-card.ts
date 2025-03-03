import {mockUsers} from "~/server/utils/mockBank";

export default defineEventHandler(async (event) => {
    const { cardNumber } = await readBody(event);
    
    // Buscar en todas las tarjetas de todos los usuarios
  let recipient = null;
  for (const user of mockUsers) {
    const card = user.cards.find(card => card.cardNumber === cardNumber);
    if (card) {
      recipient = {
        exists: true,
        name: user.profile.name,
        lastname: user.profile.lastname,
      };
      break;
    }
  }

  return recipient || { exists: false };
})