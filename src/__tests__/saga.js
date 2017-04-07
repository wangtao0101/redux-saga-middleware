import { takeEvery } from 'redux-saga/effects'

function* test(action){
    action.resolve({a : 'a'});
    yield 0;
}

function* saga(){
    yield takeEvery('TEST', test)
}

export default saga;
