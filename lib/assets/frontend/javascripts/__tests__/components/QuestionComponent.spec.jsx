'use strict';

//  Mocha TEST
// __tests__/components/QuestionComponent.spec.js

import ReactDOM from 'react-dom';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import { QuestionsComponent } from '../../components/QuestionsComponent';
import sinon from 'sinon';

 var dispatch = function() {
   console.log('>>>>>>>> Mocking dispatch ');
 };

 var props = {
   dispatch: dispatch,
   routeParams: {test_id: 1},
   tests_rdcr: {}
  };

describe('QuestionsComponent', function () {

  it('QuestionsComponent calls componentWillMount', () => {
     sinon.spy(QuestionsComponent.prototype, 'componentWillMount');
     const enzymeWrapper = mount(<QuestionsComponent {...props} />);
     expect(QuestionsComponent.prototype.componentWillMount.calledOnce).to.equal(true);
   });
  
   it("QuestionsComponent does not render questions_div", function() {
    expect(shallow(<QuestionsComponent {...props} />).contains(<div className="questions_div" />)).to.equal(false);
  });
  
   it("QuestionsComponent does not render questions_div", function() {
      var answers = [{id:1, answer: 'answer uno',  correct: true,  active: true, question_id: 1},
                     {id:2, answer: 'answer dos ',  correct: true,  active: true, question_id: 1},
                     {id:3, answer: 'answer tres',  correct: true,  active: true, question_id: 1}
                    ];

    props['QuestionsArrayProp'] = answers;
    expect(mount(<QuestionsComponent {...props} />).find('.questions_div').length).to.equal(3);
  });

});

