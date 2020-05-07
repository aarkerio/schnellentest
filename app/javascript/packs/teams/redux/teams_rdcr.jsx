
import { REQUEST_TEAMS } from '../actions/calls';

const initialState = {
    TeamsArrayProp:  []
};

const teams_rdcr = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TEAMS:
      return Object.assign({}, state, {
           TeamsArrayProp: action.TeamsArrayProp
      });

    default:
      return state;
  }
};

export default teams_rdcr;


