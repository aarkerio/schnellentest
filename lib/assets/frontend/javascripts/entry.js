'use strict';

import 'babel-polyfill';

import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import AppContainer              from './containers/AppContainer';
import TestsContainer            from './containers/TestsContainer';
import TestModalEditComponent    from './components/TestModalEditComponent';
import TestModalNewComponent     from './components/TestModalNewComponent';
import QuestionsComponent        from './components/QuestionsComponent';
import QuestionModalNewComponent from './components/QuestionModalNewComponent';
import AnswersModalComponent     from './components/AnswersModalComponent';
import NotFound                  from './components/NotFound';

import configureStore from './configureStore';

const my_store = configureStore();
const history  = syncHistoryWithStore(browserHistory, my_store);

render(
    <Provider store={my_store}>
    <div>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route name="app" path="/tests/" component={AppContainer} />
        <Route path="/questions/:test_id" component={QuestionsComponent}>
          <Route path="/questionnew/:test_id" component={QuestionModalNewComponent} />
          <Route path="/answers/:question_id/:test_id" component={AnswersModalComponent} />
        </Route>
        <Route path="/tests" component={TestsContainer}>
          <Route path="/tests/:id" component={TestModalEditComponent} />
          <Route path="/testnew" component={TestModalNewComponent} />
        </Route>

        <Route path="*" component={NotFound} status={404} />
      </Router>
    </div>
  </Provider>,
  document.getElementById('reactroot')
);

