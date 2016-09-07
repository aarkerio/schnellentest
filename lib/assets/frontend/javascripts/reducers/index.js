import { combineReducers } from 'redux';
import appointments_rdcer from './appointments_Rdcer';
import appo_rdcer from './appo_reducer';
import tests_rdcr from './tests_rdcr';

/* Merge reducers  */
const rootReducer = combineReducers({
  appointments_rdcer,
  appo_rdcer,
  tests_rdcr
});

export default rootReducer;
