import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './index';

import { routerReducer } from 'react-router-redux';

export default function configureStore(initialState) {

  const store = createStore(
    combineReducers({
        rootReducer,
        routing: routerReducer
    }),
    initialState,
    compose(
      applyMiddleware(thunk, createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

   if (module.hot) {
     // Enable Webpack hot module replacement for reducers
     module.hot.accept('./', () => {
       const nextRootReducer = require('./').default;
       store.replaceReducer(nextRootReducer);
     });
   }

  return store;
}
