import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { bindActionCreators } from 'redux';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import { ProductList } from './styles';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  
  state = {
    products: [],
  }

  async componentDidMount(){
    const response = await api.get('/products');
    var data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }));
    this.setState({ products: data });
  }

  handleAddProduct = id => {
    // dispatch propriedade recebida por todo componente conectado ao redux via connect()
    // utilizada para disparar as action do Redux
    // utilizada para dizer ao redux quando se quer fazer alterações em estados globais
    const { addToCartRequest } = this.props;
    // verificar propTypes
    // Definição de action a ser disparada
    // dispatch dispara uma action a todos os reducers da aplicação.
    addToCartRequest(id);
  }


  render() {
    //Evite ao máximo chamar funções dentro do render
    const { products } = this.state;
    const { amount } = this.props;

    console.log(amount);
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
            <button type="button" onClick={() => this.handleAddProduct(product.id)}>
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
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount
        
    return amount;
  }, {})
});

// transforma as actions do cart em propriedades do componente
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home); 