/**
 * redux saga middleware
 */
const actionNamespace = '@redux-saga-action';

export default function middleware(store){
    return next => action => {
        if (action.namespace === actionNamespace) {
            return new Promise((resolve, reject) => {
                action.resolve = resolve;
                action.reject = reject;
                next(action);
            })
        }
        return next(action);
    }
}
