'use strict';

import { RECEIVE_ONE_APPO,RECEIVE_OWNERS, RECEIVE_DOCTORS, UPDATE_FORM,SET_PETS,FULFILL_FORM} from '../actions/appos';

const initialState = {
   oneAppo: {},
   owners_options: [],
   doctors_options: [], 
   pets_options: [],
   appo_arrays: []
};

const appo_rdcer = (state = initialState, action) => { 
  switch (action.type){
    case RECEIVE_ONE_APPO:
      return Object.assign({}, state, {
        oneAppo: action.oneAppo
      });
   
    case RECEIVE_OWNERS:
      return Object.assign({}, state, {
        owners_options: action.owners_options
      });

    case SET_PETS:
      return Object.assign({}, state, {
        pets_options: action.pets_options
      });
    
    case UPDATE_FORM:
      return Object.assign({}, state, { 
                     oneAppo: action.oneAppo
      });

    case FULFILL_FORM:
      return Object.assign({}, state, { 
                     appo_arrays: action.appo_arrays
      });

    default:
      return state;
  }
};

export default appo_rdcer;
