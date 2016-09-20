'use strict';

//import { REQUEST_TESTS, RECEIVE_TESTS, RECEIVE_ONE_TEST, RECEIVE_ONE_QUESTION } from '../actions/users';

export const RECEIVE_TESTS        = 'RECEIVE_TESTS';
export const REQUEST_TESTS        = 'REQUEST_TESTS';
export const RECEIVE_ONE_TEST     = 'RECEIVE_ONE_TEST';
export const RECEIVE_ONE_QUESTION = 'RECEIVE_ONE_QUESTION';


const initialState = {
    TestsArrayProp: [],
};

const tests_rdcr = (state = initialState, action) => {
  // console.log('>>>>>>>>>>>>> At tests_rdcr: ' + JSON.stringify(action)); 
  switch (action.type) {
    case RECEIVE_TESTS:
      return Object.assign({}, state, {
           TestsArrayProp: action.TestsArrayProp
      });
     
    case REQUEST_TESTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case RECEIVE_ONE_TEST:
      return Object.assign({}, state, {
          OneTestArrayProp: action.OneTestArrayProp,
          QuestionsTestArrayProp: action.OneTestArrayProp.questions
      });
    
    case RECEIVE_ONE_QUESTION:
      return Object.assign({}, state, {
          OneQuestionArrayProp: action.OneQuestionArrayProp,
          AnswersArrayProp: action.OneQuestionArrayProp.answers
      });

    default:
      return state;
  }
};

export default tests_rdcr;

