'use strict';

//  Mocha TEST
// __tests__/components/QuestionComponent.spec.js

import React from 'react';
import { Router, Route, browserHistory, IndexRoute, withRouter } from 'react-router';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import stubContext from 'react-stub-context';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';

import { QuestionsComponent } from '../../components/QuestionsComponent'

function noop() {}

describe('QuestionsComponent', function () {

  // before(function () {
    // jQuery = require('jquery')
  // })

  // it('calls componentDidMount', () => {
  //   let routeParams = { test_id: 1};
  //   const wrapper = mount( <QuestionsComponent routeParams={routeParams} /> );
  //   expect(QuestionsComponent.prototype.componentDidMount.calledOnce).to.equal(true);
  // });

  it('QuestionsComponent executes componentWillMount', () => {
    Router.makeHref = noop;
    Router.isActive = noop;
    QuestionsComponent.contextTypes = {   router:  Router };
    QuestionsComponent.childContextTypes = { history : React.PropTypes.object };
    QuestionsComponent.prototype.getChildContext = () => ({
       history : browserHistory
    });
    const context = { context: { path: "/questions/1", router: { isActive:  true, test_id: 1 } }, contextTypes: { router: Router  } }
  
    const wrapper = shallow(<QuestionsComponent contextTypes={ {router: Router}  } /> );
    //wrapper.setProps(context);
    // wrapper.update();
    //assert.equal(wrapper.prop('routeParams.test_id'), 1); 
    // expect(wrapper.find(Foo)).to.have.length(3);
    // const questionsNode = ReactDOM.findDOMNode(questions)
  
    // Verify that it's Off by default
    // expect(questionsNode.textContent).toEqual('Off')
 })
})

