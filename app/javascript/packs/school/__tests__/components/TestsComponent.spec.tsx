// //  Mocha TEST
// // __tests__/components/TestsContainer.spec.js

// import ReactDOM from 'react-dom';
// import React from 'react';
// import { expect } from 'chai';
// import { mount, shallow, render } from 'enzyme';
// import { TestsContainer } from '../../containers/TestsContainer';
// import sinon from 'sinon';

//  var dispatch = function() {
//    console.log('>>>>>>>> Mocking dispatch ');
//  };

//  var props = {
//    dispatch: dispatch,
//    routeParams: {test_id: 1},
//    tests_rdcr: {}
//   };

// describe('TestsContainer', function () {

//   it('TestsContainer calls componentWillMount', () => {
//      sinon.spy(TestsContainer.prototype, 'componentWillMount');
//      const enzymeWrapper = mount(<TestsContainer {...props} />);
//      expect(TestsContainer.prototype.componentWillMount.calledOnce).to.equal(true);
//    });

//    it("TestsContainer does not render questions_div", function() {
//     expect(shallow(<QuestionsComponent {...props} />).contains(<div className="questions_div" />)).to.equal(false);
//   });

//    it("TestsContainer does not render questions_div", function() {
//       var answers = [{id:1, answer: 'answer uno',  correct: true,  active: true, question_id: 1},
//                      {id:2, answer: 'answer dos ',  correct: true,  active: true, question_id: 1},
//                      {id:3, answer: 'answer tres',  correct: true,  active: true, question_id: 1}
//                     ];

//     props['TestsArrayProp'] = answers;
//     expect(mount(<TestsContainer {...props} />).find('.questions_div').length).to.equal(3);
//   });

// });

