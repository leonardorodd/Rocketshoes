import { createGlobalStyle } from 'styled-components';
// importação de estilos do toastify
import 'react-toastify/dist/ReactToastify.css';
import background from '../assets/images/background.svg';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap'); 

  :root {
    --base-purple-color: #7159c1;
  }

  * {
    margin: 0px;
    padding: 0px;
    outline: 0px;
    box-sizing: border-box;
  }

  body {
    background: #191920 url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    max-width: 1020px;
    margin: 0 auto; /*auto para div ficar centralizada dentro do body*/
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
`;