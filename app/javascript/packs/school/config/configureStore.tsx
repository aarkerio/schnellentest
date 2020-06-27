import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../redux/index';

import { routerReducer } from 'react-router-redux';

let config: object = {
    apiKey: "AIzaSyChwqJStEFV_jHxtWcsNTFvoDzi2DLDDRE",
    authDomain: "schnellentest.firebaseapp.com",
    databaseURL: "https://schnellentest.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "254335011558"
};

// firebase.initializeApp(config);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose;

export default function configureStore(initialState={}) {

  const store = createStore(
    combineReducers({
        rootReducer,
        routing: routerReducer
    })
    ,
    initialState,
    compose(
      applyMiddleware(thunk, createLogger()),
      composeEnhancers
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

