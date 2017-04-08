import createAction from '../createAction'
import { actionMeta } from '../constants';

test('the toStrnig() function of return object from createAction is equal to type', () => {
    expect(createAction('type').toString()).toEqual('type');
});

test('create action', () => {
    const actionCreator = createAction('type');
    var a = { c : 'd'};
    var b = 'b';
    const action = actionCreator({a, b});
    expect(action).toEqual({
        type : 'type',
        meta : actionMeta,
        payload : {
            a : { c : 'd'},
            b : 'b'
        }
    });
});