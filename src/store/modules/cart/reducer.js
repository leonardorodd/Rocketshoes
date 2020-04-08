/* immer permite manipular o estado utilizando mutabilidade, porém respeitando a imutabilidade
de estado do react */
import produce from 'immer';

// reducer carrinho (tipo de dado)
export default function cart(state = [], action) {
    // state correponde ao valor anterior desse reducer 
    // action é o valor atual
    // o state do reducer é imutável assim como no React
    switch(action.type) {
        case '@cart/ADD_SUCCESS':
            
            return produce(state, draft => {
                const { product } = action;

                draft.push(product);
            });
            
        case '@cart/REMOVE':

            return produce(state, draft => {
                // caso não exista retorna -1/
                const productIndex = draft.findIndex(product => product.id === action.id);

                if(productIndex >= 0){
                    draft.splice(productIndex, 1);
                }
            });

        case '@cart/UPDATE_AMOUNT_SUCCESS':
            return produce(state, draft => {
                const productIndex = draft.findIndex(product => product.id === action.id);

                if(productIndex >= 0) {
                    draft[productIndex].amount = Number(action.amount);
                }

            });

        default: 
            // retorna o estato atual sem alterações
            return state;
    }
}