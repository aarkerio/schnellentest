'use strict';

//  Mocha TEST
// __tests__/components/QuestionComponent.spec.js

import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, withRouter, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import rootReducer from '../../reducers/index';
import QuestionsComponent from '../../components/QuestionsComponent';
import sinon from 'sinon';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`

const mockStore = configureStore(rootReducer);

const initialState = {TestsArrayProp: [], OneTestArrayProp: {}, OneQuestionArrayProp: {}, AnswersArrayProp: [], QuestionsArrayProp:   [] }

const store = mockStore(initialState);

// const history  = syncHistoryWithStore(browserHistory, store);   // mix redux and route 

const history = createMemoryHistory("/questions/1");

// Setup routes configuration.
// JSX would also work, but this way it's more convenient to specify custom route properties (excludes, localized labels, etc..).
const routes = [{
        path: "/tests/",
        component: React.createClass({ render() { return <div>{this.props.children}</div>; }}),
        childRoutes: [{
             path: "/questions/:test_id",
             component: React.createClass({
                            // Render your component with contextual route props or anything else you need
                            // If you need to test different combinations of properties, then setup a separate route configuration.
                            render() { return <QuestionsComponent routes={this.props.routes} />; }
             })
        }]
}];

describe('QuestionsComponent', function () {

  beforeEach(function() {
    // Render the entire route configuration with Breadcrumbs available on a specified route
    this.component = TestUtils.renderIntoDocument(<Provider store={store}><div><Router routes={routes} history={history} /></div></Provider>);
    //this.componentNode = ReactDOM.findDOMNode(this.component);
    //this.breadcrumbNode = ReactDOM.findDOMNode(this.component).querySelector(".breadcrumbs");
  });

  it('calls componentDidMount', () => {
     console.log('>>>>>>>>>>>>>>starting#########' + JSON.stringify(this.component));
     // sinon.spy(Ruta.prototype, 'componentDidMount');
     // const wrapper = mount(Ruta);
     // console.log();
     // expect(Ruta.prototype.componentDidMount.calledOnce).to.equal(true);
   });

   // it("contains spec with an expectation", function() {
   //  expect(mount(<QuestionsComponent />).find('.foo').length).to.equal(1);
   // });

  //it('QuestionsComponent will render questions', () => { 
    // const wrapper = mount(<Router routes={routes} history={history} />);
 
    // Verify that it's Off by default
    // expect(questionsNode.textContent).toEqual('Off')
 // })
})

