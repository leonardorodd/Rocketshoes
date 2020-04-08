import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';

import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';
import * as CartActions from '../../store/modules/cart/actions';

function Cart() {

  const cart = useSelector(state => 
    state.cart.map(product => 
      ({
      ...product,
      subtotal: formatPrice(product.amount * product.price)
      })
));

  const total = useSelector(state => 
    formatPrice(
      state.cart.reduce((totalcalc, product) => totalcalc + product.amount * product.price, 0)
    )  
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function handleRemoveFromCart(product){
    dispatch(CartActions.removeFromCart(product.id))
  }

  return (
    <Container>
      {cart.length > 0 &&
      <ProductTable>
        <thead>
          <tr>{/*tupla*/}
            <th />{/*campo*/}
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
        { cart.map(product =>(
          <tr key={product.id}>
            <td>
              <img
                src={product.image}
                alt={product.title}
              />
            </td>
            <td>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
            </td>
            <td>
              <div>
                <button type="button" onClick={()=> decrement(product)}>
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={product.amount} />
                <button type="button" onClick={()=> increment(product)}>
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subtotal}</strong>
            </td>
            <td>
              <button type="button" onClick={() => handleRemoveFromCart(product)}>
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
        )) } 
        </tbody>
      </ProductTable>}
      <footer>
        <button type="submit">Finalizar pedido</button> 
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

export default Cart