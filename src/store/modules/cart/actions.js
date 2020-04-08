//  Será ouvido pelo middleware (ReduxSaga)
export function addToCartRequest(id) {
    return {
        type: '@cart/ADD_REQUEST', // necessário para verificar para qual reducer essa action é direcionada
        id,
    };
}

// Será ouvido pelo reducer
export function addToCartSuccess(product) {
    return {
        type: '@cart/ADD_SUCCESS', // necessário para verificar para qual reducer essa action é direcionada
        product,
    };
}

export function removeFromCart(id) {
    return {
        type: '@cart/REMOVE',
        id, 
    };
}

export function updateAmountRequest(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT_REQUEST',
        id,
        amount,
    }
}

export function updateAmountSuccess(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT_SUCCESS',
        id,
        amount,
    }
}