/**
 * Created by millsky on 11/22/18.
 */
import initialStore from './store';
import initialReducers from './reducers';
import { combineReducers } from 'redux';
import EventEmitter from 'eventemitter3';

const EE = new EventEmitter();

const ENHANCE_STORE = 'ENHANCE_STORE';
const UNENHANCE_STORE = 'UNENHANCE_STORE';
const LIB_ACTION_PREFIX = `@${ENHANCE_STORE}`;

EE.on(ENHANCE_STORE, (reducerName, reducer) => {
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
});

EE.on(UNENHANCE_STORE, (reducerName) => {
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
});

/***
 * Initializes the enhanceable store
 * @param store: ReduxStore - the redux store
 * @param reducers: Object - the initial reducers, if any
 */
export const initializeStore = (store, reducers = initialReducers) => {
    if (!initialStore.get()) {
        initialStore.set(store);
        initialReducers.set(reducers);
    } else {
        throw new Error("Store has already been set");
    }
};

/***
 * Enhances the store by providing it with a new reducer
 * @param reducerName: String - the name of the reducer
 * @param reducer: Fn - The functional redux reducer
 */
export const enhanceStore = (reducerName, reducer) => {
    if (initialStore.get()) {
        EE.emit(ENHANCE_STORE, reducerName, reducer);
    } else {
        throw new Error('Store has not been set');
    }
};

/***
 * The opposite of Enhance - removes a reducer from the store
 * @param reducerName: String - the name of the reducer
 */
export const unenhanceStore = (reducerName) => {
    if (initialStore.get()) {
        EE.emit(UNENHANCE_STORE, reducerName);
    } else {
        throw new Error('Store has not been set');
    }
};
