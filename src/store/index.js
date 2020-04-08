import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// applyMiddleware server para aplicar middlewares ao dispatch do Redux store,
// compose une configurações

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// redux saga no reactotron
const sagaMonitor = process.env.NODE_ENV === 'development' ?
    console.tron.createSagaMonitor(): null;

// saga middleware na aplicação
const sagaMiddleware = createSagaMiddleware({
    sagaMonitor
});

// config do reactotron para que monitore o store do redux
const enhancer = process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);    

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;