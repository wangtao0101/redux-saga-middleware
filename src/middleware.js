/**
 * redux saga middleware
 */
import { actionMeta } from './constants';

export default function middleware(store){
    return next => action => {
        if (action.meta === actionMeta) {
            return new Promise((resolve, reject) => {
                action.resolve = resolve;
                action.reject = reject;
                next(action);
            })
        }
        return next(action);
    }
}
