/**
 * Created by millsky on 11/24/18.
 */
import { combineReducers } from 'redux';
import initialStore from './storeGetterSetter';
import initialReducers from './reducersGetterSetter';
import { LIB_ACTION_PREFIX } from './constants';

export default function addReducer(reducerName, reducer) {
    /* Send a hook action to the store */
    const store = initialStore.get();
    const reducers = initialReducers.get();
    store.dispatch({
        type: `${LIB_ACTION_PREFIX}/ADD_REDUCER_START`,
        payload: {
            name: reducerName,
        }
    });

    /* Add the new reducer to the provided store
     *  https://redux.js.org/api/store#replaceReducer
     */
    store.replaceReducer(combineReducers({
        ...reducers,
        [reducerName]: reducer,
    }));

    /* manage our locally stored reducers */
    initialReducers.set({
        ...reducers,
        [reducerName]: reducer,
    });

    /* Send a hook action to the store */
    store.dispatch({
        type: `${LIB_ACTION_PREFIX}/ADD_REDUCER_SUCCESS`,
        payload: {
            name: reducerName,
        }
    });
}
