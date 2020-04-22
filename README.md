# Redux-Saga setup

## Launching this Code

1. In the project directory from the terminal you will need to run a series of commands.
1. run: `npm install`
1. run: `npm run server`
1. Open a new terminal for the project.
1. from the new terminal run: `npm run client`

## Setting Up Redux-Saga

Redux Saga has a fair amount of overhead. Here's what needs to be done in order to setup the saga middleware:

1. Install `redux-saga` dependency

    ```
    npm install redux-saga
    ```

1. configuration updates are needed in `index.js`
1. at the top of `index.js` import the new dependency

    ```JS
    // bringing redux-saga into our project
    import createSagaMiddleware from 'redux-saga';
    ```

1. create the saga middleware and register it with the redux store

    ```JSX
    // create the sags middleware
    const sagaMiddleware = createSagaMiddleware();

    // This is creating the store
    // the store is the big JavaScript Object that holds all of the information for our application
    const storeInstance = createStore(
        // This function is our first reducer
        // reducer is a function that runs every time an action is dispatched
        combineReducers({
            firstReducer,
            secondReducer,
            elementListReducer,
        }),
        applyMiddleware(sagaMiddleware),
    );
    ```

1. we now need to create a generator function that will be used to register all of our sagas

    ```JSX
    // this is a special generator function
    // sagas are generator functions
    // we'll talk about how they work later
    // for now, know that they let us run code synchronously
    function* watcherSaga() {

    }

    // create the sags middleware
    const sagaMiddleware = createSagaMiddleware();
    ```

1. finally we need to make sure the saga middleware runs this registration generator function

    ```JSX
    // This is creating the store
    // the store is the big JavaScript Object that holds all of the information for our application
    const storeInstance = createStore(
        // This function is our first reducer
        // reducer is a function that runs every time an action is dispatched
        combineReducers({
            firstReducer,
            secondReducer,
            elementListReducer,
        }),
        applyMiddleware(sagaMiddleware),
    );

    // run registration of sagas
    sagaMiddleware.run(watcherSaga);
    ```

## Registering Sagas

Great! `redux-saga` is a part of our project. Like other middleware, redux-saga has access to every dispatched action. It's also special, because it's a middleware that can dispatch other actions.

If we want it to listen for specific actions. We need to use the `takeEvery` effect in our `watcherSaga`. Let's bring that in from `redux-saga/effects`

```JSX
import { takeEvery } from 'redux-saga/effects';
```

and then we can use it in our generator function:

```JSX
function* watcherSaga() {
    yield takeEvery('SET_ELEMENTS', firstSaga);
}
```

Here we are saying, every time our action has a type of `SET_ELEMENTS`, we will run `firstSaga`. We don't have a `firstSaga`, so let's create one:

```JSX
function* firstSaga(action) {
    console.log('firstSaga was hit with action:', action);
}
```
