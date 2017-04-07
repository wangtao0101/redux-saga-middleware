import reduxSagaMiddleware from '../middleware'
import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, createStore} from 'redux';
import 'babel-polyfill';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [reduxSagaMiddleware, sagaMiddleware]

function reducer(state, action) {
    return state;
}

const store = createStore(
    reducer,
    applyMiddleware(...middlewares),
);

const testAction = () => ({ type: 'TEST', namespace: '@redux-saga-action' })

sagaMiddleware.run(saga);

test('dispatch a action', () => {
    const initialState = {}
    store.dispatch(testAction()).then(data => {
        expect(data).toEqual({a : 'a'});
    })
});
