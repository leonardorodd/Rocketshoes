import styled from 'styled-components';
import { darken } from 'polished'; /*lib para lidar com cores*/

export const ProductList = styled.ul`
  display: grid; 
  grid-template-columns: repeat(3, 1fr); /*grid com 3 colunas de mesmo tamanho*/
  grid-gap: 20px; /*espaço entre as colunas*/
  list-style: none;
  overflow: auto;

    li {
      display: flex;
      flex-direction: column;
      background: #fff;
      border-radius: 4px;
      padding: 20px;

        img {
            max-width: 250px;
            width: 100%;
            height: auto;
            align-self: center;
        }

        > strong {
            font-size: 16px;
            line-height: 20px;
            color: #333;
            margin-top: 5px; 
        }

        > span {
            font-size: 21px;
            font-weight: bold;
            margin: 5px 0 20px;
        }

        button {
          background: var(--base-purple-color);
          color: #fff;
          border: 0;
          border-radius: 4px;
          overflow: hidden;
          margin-top: auto; /*ocupa toda a margin disponível (mantém o posicionamento do elemento mesmo com o conteúdo do componente pai variando)*/
          display: flex;
          align-items: center;
          transition: background 0.2s;

          div {
            display: flex;
            padding: 12px;
            align-items: center;
            background: rgba(0, 0, 0, 0.1); /* a alpha (opacidade) 10% */
          }

          svg {
            margin-right: 5px;
          }

          span {
            flex: 1; /*ocupa todo espaço disponível */
            text-align: center;
            font-weight: bold;
            font-size: 12px;
          }

          &:hover { 
            background: ${darken(0.05, '#7159c1')}; /* escurece essa cor em 5% */
          }
        }
    }
`;

