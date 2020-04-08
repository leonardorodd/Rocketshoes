import { call, put, all, takeLatest } from 'redux-saga/effects'
import api from '../../../../services/api';
import { addToCartSuccess } from '../actions';
// generator */async yeld/await (aguarda o resultado para continuar a execução)
// o async/await convertido para generator pelo babel(o generator tem mais recursos)
// o redux-saga vai agir entre a action e o reducer, será um middleware
// receberá o id da action
// call() é responsável por chamar métodos que são assíncronos e retornam promisses dentro do javascript
// sem ele não é possível fazer esse tipo de chamadas usando */yield
// put() dispara uma action através do redux-saga
function* addToCart({ id }) {
    const reponse = yield call(api.get, `/products/${id}`); 
    // dispara uma action ao reducer
    yield put(addToCartSuccess(reponse.data))

}

export default all([
    
    // se o usuário clicar várias vezes de forma sequencial no botão adicionar ao carrinho,
    // o redux-saga vai descartar os primeiros cliques e efetuar o processamento apenas do
    // último clique. Apenas o processamento do último clique será efetuado.

    // impede que o usuário execute múltiplos cliques
    // um forma de respeitar o tempo de execução de um fluxo dentro da aplicação,
    // se um novo fluxo for iniciado sem a conclusão do anterior o anterior será descartado,
    // e apenas o novo será finalizado.
    takeLatest('@cart/ADD_REQUEST', addToCart ),

    // takeEvery() processaria todos os fluxos.
]); 