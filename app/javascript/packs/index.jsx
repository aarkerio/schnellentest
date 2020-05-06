
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, withRouter } from 'react-router';
import { syncHistoryWithStore, routeActions } from 'react-router-redux';

import AppContainer            from './containers/AppContainer';
import TestsContainer          from './containers/TestsContainer';
import TestModalEditComponent  from './components/TestModalEditComponent';
import TestModalNewComponent   from './components/TestModalNewComponent';
import QuestionsComponent      from './components/QuestionsComponent';
import AnswersModalComponent   from './components/AnswersModalComponent';
import QuestionSearchComponent from './components/QuestionSearchComponent';
import QuestionEditComponent   from './components/QuestionEditComponent';
import NotFound                from './components/NotFound';
import HeaderComponent         from './components/HeaderComponent';
import configureStore          from './config/configureStore';     // load redux store

const my_store = configureStore();
const history  = syncHistoryWithStore(browserHistory, my_store);   // mix redux and route

if ( document.getElementById('reactroot')) {
  render(
    <Provider store={my_store}>
      <div>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
          <Route name="app" path="/tests/" component={AppContainer} />
          <Route path="/questions/:test_id" component={QuestionsComponent}>
            <Route path="/questions/:question_id/edit" component={QuestionEditComponent} />
            <Route path="/answers/:question_id/:test_id" component={AnswersModalComponent} />
          </Route>
          <Route path="/search/:test_id/:terms" component={QuestionSearchComponent} />
          <Route path="/tests" component={TestsContainer}>
            <Route path="/tests/:id" component={TestModalEditComponent} />
            <Route path="/testnew" component={TestModalNewComponent} />
            <Route path="/testedit/:id" component={TestModalEditComponent} />
          </Route>
          <Route path="*" component={NotFound} status={404} />
        </Router>
      </div>
    </Provider>,
    document.getElementById('reactroot')
  );
}

