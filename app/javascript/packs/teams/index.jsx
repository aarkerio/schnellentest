import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./redux/store";

import TeamsApp from "./TeamsApp";

const my_store = configureStore();
const rootElement = document.getElementById('approot');

ReactDOM.render(
   <Provider store={my_store}>
     <TeamsApp />
   </Provider>,
   rootElement
);

