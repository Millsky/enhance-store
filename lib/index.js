/**
 * Created by millsky on 11/22/18.
 */
import initialStore from './storeGetterSetter';
import initialReducers from './reducersGetterSetter';
import addReducer from './addReducer';
import removeReducer from './removeReducer';

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
        addReducer(reducerName, reducer);
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
        removeReducer(reducerName);
    } else {
        throw new Error('Store has not been set');
    }
};
