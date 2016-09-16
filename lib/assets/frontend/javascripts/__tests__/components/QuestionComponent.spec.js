'use strict';

//  Jest TEST
// __tests__/components/QuestionComponent.spec.js

import React from 'react'
import { Provider } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import chai from 'chai';
// import sinon from 'sinon';
import spies from 'chai-spies';

//import configureStore from 'redux-mock-store'
//import thunk from 'redux-thunk'

import configureStore from '../../configureStore';

const my_store = configureStore();

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

import QuestionsComponent from '../../components/QuestionsComponent'

describe('QuestionsComponent', function () {

  // before(function () {
    // jQuery = require('jquery')
  // })

  it('QuestionsComponent executes componentWillMount', () => {
  
  // Render a checkbox with label in the document
  const questions = TestUtils.renderIntoDocument(
          <Provider store={my_store}>
              {() => <QuestionsComponent /> }
          </Provider>
       );


  // const questionsNode = ReactDOM.findDOMNode(questions)
  
  // Verify that it's Off by default
  // expect(questionsNode.textContent).toEqual('Off')
 
  // Simulate a click and verify that it is now On
  // TestUtils.Simulate.change(
  //  TestUtils.findRenderedDOMComponentWithTag(questions, 'input')
  // );
  // expect(questionsNode.textContent).toEqual('On')
 })
})

