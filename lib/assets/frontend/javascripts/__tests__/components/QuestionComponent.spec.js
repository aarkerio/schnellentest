'use strict';

//  Jest TEST
// __tests__/components/QuestionComponent.spec.js
import React from 'react/addons';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer'; 
 
import QuestionsComponent from '../../components/QuestionsComponent';
   
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
});
