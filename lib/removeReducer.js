/**
 * Created by millsky on 11/24/18.
 */
import { combineReducers } from 'redux';
import initialStore from './storeGetterSetter';
import initialReducers from './reducersGetterSetter';
import { LIB_ACTION_PREFIX } from './constants';

export default function removeReducer(reducerName) {
    const store = initialStore.get();
    const reducers = initialReducers.get();
    /* Send a start action  hook to the store */
    store.dispatch({
        type: `${LIB_ACTION_PREFIX}/REMOVE_REDUCER_START`,
        payload: {
            name: reducerName,
        }
    });
    /* Manage our local reducers collection */
    delete reducers[reducerName];
    initialReducers.set(reducers);

    /* Update the store reducers to delete a reducer
     *  https://redux.js.org/api/store#replaceReducer
     */
    store.replaceReducer(combineReducers({
        ...initialReducers,
    }));

    /* Send a action success hook action to the store */
    store.dispatch({
        type: `${LIB_ACTION_PREFIX}/REMOVE_REDUCER_SUCCESS`,
        payload: {
            name: reducerName,
        }
    });
}
