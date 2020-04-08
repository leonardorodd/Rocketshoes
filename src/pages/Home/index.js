import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import { ProductList } from './styles';
import * as CartActions from '../../store/modules/cart/actions';

// desestruturação
function Home() {
  
  const [ products, setProducts ] = useState([]);

  // acesso ao estado do Redux
  const amount = useSelector(state => state.cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount     
    return sumAmount;
  }, {}))

  const dispatch = useDispatch();

  useEffect(()=>{
    async function loadProducts(){
      const response = await api.get('/products');
      var data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));
      setProducts(data);
    }
    
    loadProducts();
  }, []);
  
  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id))
  }
  
  // useCallback deve ser utilizado quando a função depende do estado ou propriedades.

    return ( 
    <ProductList>
      { products.map(product => (
        <li key={product.id}>
          <img
            src={product.image} 
            alt={product.title}
          />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff"/> {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span> 
          </button>
        </li>
      )) }
    </ProductList>
  );
}

export default Home; 