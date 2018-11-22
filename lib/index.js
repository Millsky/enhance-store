/**
 * Created by millsky on 11/22/18.
 */
import { combineReducers } from 'redux';
import EventEmitter from 'eventemitter3';

let initialStore = null;
let initialReducers = {};

const EE = new EventEmitter();

const ENHANCE_STORE = 'ENHANCE_STORE';
const LIB_ACTION_PREFIX = `@${ENHANCE_STORE}`

EE.on(ENHANCE_STORE, (reducerName, reducer) => {
    initialStore.dispatch({
        type: `${LIB_ACTION_PREFIX}/ADD_REDUCER_START`,
        payload: {
            name: reducerName,
        }
    });
    initialStore.replaceReducer(combineReducers({
        ...initialReducers,
        [reducerName]: reducer,
    }));
    initialReducers = {
        ...initialReducers,
        [reducerName]: reducer,
    };
    initialStore.dispatch({
        type: `${LIB_ACTION_PREFIX}/ADD_REDUCER_SUCCESS`,
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
export const initializeStore = (store, reducers) => {
    if (!initialStore) {
        initialStore = store;
        initialReducers = reducers;
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
    if (initialStore) {
        EE.emit(ENHANCE_STORE, reducerName, reducer);
    }
};
