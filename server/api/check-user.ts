import {mockUsers} from "~/server/utils/mockBank";

export default defineEventHandler(async (event) => {
    const { cbuAlias } = await readBody(event);
   // Buscar en todas las cuentas de todos los usuarios
  let recipient = null;
  for (const user of mockUsers) {
    const account = user.accounts.find(acc => acc.cbu === cbuAlias);
    if (account) {
      recipient = {
        exists: true,
        name: user.profile.name,
        lastname: user.profile.lastname,
      };
      break;
    }
  }

  // Si no se encuentra, devolver solo exists: false
  return recipient || { exists: false };
})