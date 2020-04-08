import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import api from '../../../services/api';
import history from '../../../services/history';
import { addToCartSuccess, updateAmountSuccess } from './actions';
import { formatPrice } from '../../../util/format';
import { toast } from 'react-toastify';

// generator */async yeld/await (aguarda o resultado para continuar a execução)
// o async/await convertido para generator pelo babel(o generator tem mais recursos)
// o redux-saga vai agir entre a action e o reducer, será um middleware
// receberá o id da action
// call() é responsável por chamar métodos que são assíncronos e retornam promisses dentro do javascript
// sem ele não é possível fazer esse tipo de chamadas usando */yield
// put() dispara uma action através do redux-saga
// select() necessário para acessar ao estado do redux
function* addToCart({ id }) {
    // verifica se já existe um produto de mesmo id no carrinho
    const productExists = yield select(
        state => state.cart.find(product => product.id === id),
    );
    // obtém a quantidade desse produto em estoque
    
    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;
    
    const currentAmount = productExists ? productExists.amount: 0;
    
    const newAmount = currentAmount + 1;
    
    if(newAmount > stockAmount) {
        toast.error('Produto fora do estoque'); 
        //console.tron.warn('ERRO');
        return;
    }

    if(productExists) {
        yield put(updateAmountSuccess(id, newAmount));
    }else {
        const reponse = yield call(api.get, `/products/${id}`); 
        // dispara uma action ao reducer
        const data = {
            ...reponse.data,
            amount: newAmount,
            priceFormatted: formatPrice(reponse.data.price)
        }
        yield put(addToCartSuccess(data));
        // redirecionamento de rota
        history.push('/cart');
    }
}

function* updateAmount({ id, amount }){
    if(amount <= 0) return;

    const stock = yield call(api.get, `/stock/${id}`);
    const stockAmount = stock.data.amount;

    if(amount > stockAmount){
        toast.error('Produto fora do estoque');  
        return;
    }

    yield put(updateAmountSuccess(id, amount));
}

export default all([  
    takeLatest('@cart/ADD_REQUEST', addToCart ),
    takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount ),
]); 