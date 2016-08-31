'use strict';

import { REQUEST_TESTS, RECEIVE_TESTS } from '../actions/tests';

const initialState = {
    TestsArrayProp: [],
};

const tests_rdcer = (state = initialState, action) => { 
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
     
    default:
      return state;
  }
};

export default tests_rdcer;
