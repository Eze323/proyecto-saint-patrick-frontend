import {mockUsers} from "~/server/utils/mockBank";

export default defineEventHandler(async (event) => {
    const { cardNumber } = await readBody(event);
    const exists = mockUsers.some(user=> 
        user.cards.some(card=>card.cardNumber===cardNumber)
    );
    return {exists};
})