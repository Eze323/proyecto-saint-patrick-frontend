import {mockUsers} from "~/server/utils/mockBank";

export default defineEventHandler(async (event) => {
    const { cbuAlias } = await readBody(event);
    const exists = mockUsers.some(user=> 
        user.accounts.some(acc=>acc.cbu===cbuAlias)
    );
    return {exists};
})