import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, createStore} from 'redux';
import 'babel-polyfill';
import saga from './saga';
import _ from 'lodash';
import { reduxSagaMiddleware, createAction } from '../'

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, reduxSagaMiddleware]

function reducer(state, action) {
    return state;
}

const store = createStore(
    reducer,
    applyMiddleware(...middlewares),
);

sagaMiddleware.run(saga);

const resolveAction = createAction('RESOLVE_ACTION');
const rejectAction = createAction('REJECT_ACTION');
const asynAction = createAction('ASYN_ACTION');
const errorAction = createAction('ERROR_ACTION');

test('dispatch action return Promise', () => {
    const p = store.dispatch(resolveAction())
    expect(typeof p.then === 'function').toBeTruthy();
});

test('dispatch a resolve action', () => {
    const p = store.dispatch(resolveAction())
    return p.then(data => {
        expect(data).toEqual({a : 'a'});
    })
});

test('dispatch a reject action', () => {
    const p = store.dispatch(rejectAction())
    return p.catch(data => {
        expect(data).toEqual({a : 'a'});
    })
});

test('dispatch a anyc action', () => {
    const p = store.dispatch(asynAction())
    return p.catch(data => {
        expect(data).toEqual({a : 'a'});
    })
});

test('dispatch a error action', () => {
    const p = store.dispatch(errorAction())
    return p.catch(data => {
        expect(data).toEqual({a : 'a'});
    })
});