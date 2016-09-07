'use strict';

import { REQUEST_TESTS, RECEIVE_TESTS, RECEIVE_ONE_TEST } from '../actions/tests';

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
     
    default:
      return state;
  }
};

export default tests_rdcr;

