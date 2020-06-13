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
    devToolsExtension: any;
  }
}

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
      window.devToolsExtension ? window.devToolsExtension() : f => f
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

