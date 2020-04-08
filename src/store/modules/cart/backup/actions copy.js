export function addToCart(id) {
    return {
        type: '@cart/ADD', // necessário para verificar para qual reducer essa action é direcionada
        id,
    };
}

export function removeFromCart(id) {
    return {
        type: '@cart/REMOVE',
        id, 
    };
}

export function updateAmount(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT',
        id,
        amount,
    }
}