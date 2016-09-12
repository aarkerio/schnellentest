'use strict';

//  Jest TEST
// __tests__/components/QuestionComponent.spec.js

import React from 'react'

import TestUtils from 'react-addons-test-utils';
  
import QuestionsComponent from '../../components/QuestionsComponent';
 
var assert = require('assert');
      
describe('QuestionsComponent', function () {

  var jQuery;
  jsdom();
 
  before(function () {
    jQuery = require('jquery');
    this.jsdom = require('jsdom-global')();
    global.$ = global.jQuery = require('jquery');
  })

  it('QuestionsComponent changes the text after click', () => {
  
  // Render a checkbox with label in the document
  const questions = TestUtils.renderIntoDocument(
    <QuestionsComponent />
  );

  const questionsNode = ReactDOM.findDOMNode(questions);
  
  // Verify that it's Off by default
  expect(questionsNode.textContent).toEqual('Off');
 
  // Simulate a click and verify that it is now On
  TestUtils.Simulate.change(
    TestUtils.findRenderedDOMComponentWithTag(questions, 'input')
  );
  expect(questionsNode.textContent).toEqual('On');
 })
});
