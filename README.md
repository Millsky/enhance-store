# Redux Enhancer

## Design Goals

The goal of this npm package, is to make it easy to modularize large redux applications.

### Design Goal 1: 
Avoid large central imports

### Design Goal 2: 
Decouple independent features

### Design Goal 3:
Only load logic if the component was rendered

## API

### `initializeStore(store: ReduxStore, reducers: Object)`
Initializes the store and stores any provided reducers.

### `enhanceStore(reducerName: String, reducer: Fn)`
Enhance store provides the store with the new components reducer.
Under the hood, it operates by calling `replaceStore` on the redux-store

#### Redux Lifecycle Hooks:
``enhance-store`` provides the following lifcycle hooks to use how you like:

``@ENHANCE_STORE/ADD_REDUCER_START``: Fires before start of adding a new reducer to the store.

``@ENHANCE_STORE/ADD_REDUCER_SUCCESS``: Fires after a new reducer has been added to the store.

### `unenhanceStore(reducerName: String)`
Removes a reducer from the store by calling: `replaceStore` on the redux-store

#### Redux Lifecycle Hooks:
``enhance-store`` provides the following lifcycle hooks to use how you like:

``@ENHANCE_STORE/REMOVE_REDUCER_START``: Fires before the start of removing a reducer. 

``@ENHANCE_STORE/REMOVE_REDUCER_SUCCESS``: Fires after a reducer has been removed from the store.

## Contributing

### Testing:

Tests are written in [Jest](https://jestjs.io/).

To run tests: ``npm run test``

To run tests in watch mode: ``npm run test:watch``
