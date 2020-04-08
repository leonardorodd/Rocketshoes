import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';

import { Container, Cart } from './style';
import logo from '../../assets/images/logo.svg';

function Header({ cartSize }) {
  return (
    <Container>
        <Link to='/'>
            <img src={logo} alt="Rocketshoes" />
        </Link>
        <Cart to='/cart'>
            <div>
                <strong>Meu Carrinho</strong>
                <span>{cartSize} itens</span>
            </div>
            <MdShoppingBasket size={36} color="#fff" />
        </Cart>
    </Container>
  );
}

// Todos componentes conectados ao Redux via connect() que estão consumindo ao estado do reducer cart,
// serão notificados pelo Redux sempre que o estado desse reducer for alterado. O estado do reducer cart agora atualizado, será obtido novamente e então esses componentes
// serão re-renderizados (a função render() deles será chamada, assim como é feito nas alterações de estado).

// estado (state) do redux
export default connect(state =>({
  // Do estate do redux eu vou acessar o reducer de nome cart
  // cartSize é nome da propriedade passada o componente
  cartSize: state.cart.length, // cart é nome do reducer a ser acessado
}))(Header);