import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Router } from 'react-router-dom';
// O Provider vai disponibilizar o store (estado global do Redux) para todos os componentes
import { Provider } from 'react-redux';
// Exibi notificações ao usuário
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyle from './styles/global';
import Header from './components/Header';


// config do reactotron utilizada no store
import './config/reactotronConfig';
import history from './services/history'
import store from './store';

function App(){
  return ( 
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
 