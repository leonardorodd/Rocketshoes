import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
// utilizado para debugar o store do redux, estaando conectado a ele
// verifica se está no modo de desenvolvimento - yarn start 
if (process.env.NODE_ENV === 'development') {
    const tron = Reactotron.configure()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

        tron.clear();

        console.tron = tron;
}