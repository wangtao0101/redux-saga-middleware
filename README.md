# redux-saga-middleware

[![NPM version](https://img.shields.io/npm/v/redux-saga-middleware.svg?style=flat)](https://www.npmjs.com/package/redux-saga-middleware)
[![Build Status](https://img.shields.io/travis/wangtao0101/redux-saga-middleware.svg?style=flat)](https://travis-ci.org/wangtao0101/redux-saga-middleware)

Redux middleware for achieving callbacks in redux-saga

## When use redux-saga-middleware ?
When you need to access the server validation message , not for display data(which should be in redux store)!

## Installation

`npm install redux-saga-middleware --save`  or  
`yarn add redux-saga-middleware`

## Basic Usage
store.js
```js
//config store with redux-saga-middleware
import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, createStore} from 'redux';
import { reduxSagaMiddleware } from 'redux-saga-middleware'
import 'babel-polyfill'; //you alse can also config generator runtime without babel-polyfill
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, reduxSagaMiddleware]

function reducer(state, _action) {
    return state;
}

const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
);

sagaMiddleware.run(saga);
```

saga.js
```js
import { takeEvery, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

function* asynSaga(action){
    yield call(delay, 500);
    action.resolve({a : 'a'});
}

function* saga(){
    yield takeEvery('ASYN_ACTION', asynSaga)
}

export default saga;
```

test.js
```js
import { createAction } from 'redux-saga-middleware'

const asynAction = createAction('ASYN_ACTION');

test('dispatch a anyc action', () => {
    const p = store.dispatch(asynAction())
    return p.then(data => {
        expect(data).toEqual({a : 'a'});
    })
});
```

## Usage with react-redux

connect.js
```js
import { connect } from 'react-redux'
import { createAction } from 'redux-saga-middleware'
import Component from  './component';

const asynAction = createAction('ASYN_ACTION');

const mapState = (state) => {
    return 	{
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAction : (arg) => {
        return dispatch(asynAction(arg));
    },
});

export default connect(mapState, mapDispatchToProps)(Component);
```

component.js
```js
this.props.dispatchAction(args).then(data => {
    // to do
})
```
