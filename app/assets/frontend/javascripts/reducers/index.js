import { combineReducers } from 'redux';
import appointments_rdcer from './appointments_Rdcer';
import appo_rdcer from './appo_reducer';

/* Merge reducers  */
const rootReducer = combineReducers({
  appointments_rdcer,
  appo_rdcer
});

export default rootReducer;
