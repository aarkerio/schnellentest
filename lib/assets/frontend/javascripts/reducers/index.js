import { combineReducers } from 'redux';
import tests_rdcr from './tests_rdcr';
import users_rdcr from './users_rdcr';
/* Merge reducers  */
const rootReducer = combineReducers({
  tests_rdcr,
  users_rdcr
});

export default rootReducer;
