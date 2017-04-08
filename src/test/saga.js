import { takeEvery, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

function* resolveSaga(action){
    action.resolve({a : 'a'});
    yield 0;
}

function* rejectSaga(action){
    action.reject({a : 'a'});
    yield 0;
}

function* asynSaga(action){
    yield call(delay, 500);
    action.resolve({a : 'a'});
}

function* errorSaga(action){
    try{
        yield call(delay, 500);
        throw new Error('error');
    }catch(err){

    }
    finally{
        action.reject({a : 'a'})
    }
}

function* saga(){
    yield takeEvery('RESOLVE_ACTION', resolveSaga)
    yield takeEvery('REJECT_ACTION', rejectSaga)
    yield takeEvery('ASYN_ACTION', asynSaga)
    yield takeEvery('ERROR_ACTION', errorSaga)
}

export default saga;
