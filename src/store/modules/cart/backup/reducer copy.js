/* immer permite manipular o estado utilizando mutabilidade, porém respeitando a imutabilidade
de estado do react */
import produce from 'immer';

// reducer carrinho (tipo de dado)
export default function cart(state = [], action) {
    // state correponde ao valor anterior desse reducer 
    // action é o valor atual
    // o state do reducer é imutável assim como no React
    switch(action.type) {
        case '@cart/ADD':
            // // copia todos os produtos que já estão no state anterior e adiciona o novo
            // return [ ...state , {
            //     ...action.product,
            //     amount: 1,
            // }];
            // state é o estado base, draft é uma cópia na qual aplicaremos mutabilidade, respeitando
            // a imutabilidade do estado original
            // o return do produce é um array (o novo estado), contendo o conteúdo do estado anterior 
            //  e o novo conteúdo a ser inserido (o do rascunho)
            
            return produce(state, draft => {
                // retorna o indice do primeiro elemento que satisfazer a função de teste.
                // caso não haja nenhum retorna -1/
                const productIndex = draft.findIndex(product => product.id === action.product.id);
               
                // se o produto já existe, ele aumentará a quantidade do produto.
                if(productIndex >= 0){
                    draft[productIndex].amount++;
                }else{
                    //se não, ele adicionará o produto completo.
                    draft.push({...action.product, amount: 1});
                }
            });
            
        case '@cart/REMOVE':

            return produce(state, draft => {
                // caso não exista retorna -1/
                const productIndex = draft.findIndex(product => product.id === action.id);

                if(productIndex >= 0){
                    draft.splice(productIndex, 1);
                }
            });

        case '@cart/UPDATE_AMOUNT':
            return produce(state, draft => {
                const productIndex = draft.findIndex(product => product.id === action.id);

                if(action.amount <= 0){
                    return state;
                }

                if(productIndex >= 0) {
                    draft[productIndex].amount = Number(action.amount);
                }

            });

        default: 
            // retorna o estato atual sem alterações
            return state;
    }
}