
import fetch from 'isomorphic-fetch';

export const REQUEST_TEAMS = 'REQUEST_TEAMS';

// Get all the quiz tests from this user
export function fetchTeams() {
  return function (dispatch) {
    let data = {
      method:      'GET',
      credentials: 'same-origin',
      mode:        'same-origin',
      headers:     {
                     'Accept':       'application/json',
                     'Content-Type': 'application/json'
      }
    };
    return fetch('/v1/teams', data)
      .then(response => response.json())
      .then(json => dispatch((json) => {
        console.log("  ############  JSON   >>>> " + JSON.stringify(json));
        return {type: REQUEST_TEAMS, TeamsArrayProp: json};
      }));
  };
}

