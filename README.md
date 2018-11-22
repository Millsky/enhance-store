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

