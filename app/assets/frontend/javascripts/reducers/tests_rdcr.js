'use strict';

import { REQUEST_TESTS, RECEIVE_TESTS } from '../actions/tests';

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
     
    default:
      return state;
  }
};

export default tests_rdcr;

