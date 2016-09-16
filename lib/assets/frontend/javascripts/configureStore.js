'use strict';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index';

import { routerReducer } from 'react-router-redux';

export default function configureStore(initialState) {

  const store = createStore(
    combineReducers({
        rootReducer,
        routing: routerReducer
    }),
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     const nextRootReducer = require('./reducers').default;
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return store;
}

