'use strict';

import { REQUEST_POSTS, RECEIVE_APPOS } from '../actions/appos';

const initialState = {
    apposArrayProp: [],
};

const tests_rdcer = (state = initialState, action) => { 
  switch (action.type) {
    case RECEIVE_APPOS:
      return Object.assign({}, state, {
           TestsArrayProp: action.TestsArrayProp
      });
     
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
     
    default:
      return state;
  }
};

export default appointments_rdcer;
