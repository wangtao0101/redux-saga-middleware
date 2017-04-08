import { actionMeta } from './constants';

/**
 * simple createAction for redux saga middleware, not standard FSA.
 * @param  {string} type actionType
 * @return {actionCreator}      actionCreator
 */
export default function(type){
    const actionCreator  = (...args) => {
        const action = {
            type,
            meta : actionMeta
        };
        action.payload = args[0];
        return action;
    }
    actionCreator.toString = () => type.toString();
    return actionCreator ;
}