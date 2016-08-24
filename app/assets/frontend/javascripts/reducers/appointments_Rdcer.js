'use strict';

import { REQUEST_POSTS, RECEIVE_APPOS } from '../actions/appos';

const initialState = {
    apposArrayProp: [],
};

const appointments_rdcer = (state = initialState, action) => { 
  switch (action.type) {
    case RECEIVE_APPOS:
      return Object.assign({}, state, {
           apposArrayProp: action.apposArrayProp
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
