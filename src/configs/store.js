import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers/';
import rootSaga from '../sagas';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleWare = createSagaMiddleware();
const middleWare = applyMiddleware(sagaMiddleWare);

const store = createStore(reducers, composeWithDevTools(middleWare));

sagaMiddleWare.run(rootSaga);

export default store;
