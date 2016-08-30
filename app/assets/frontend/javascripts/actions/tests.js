import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie';
import 'babel-polyfill';

export const RECEIVE_TESTS    = 'RECEIVE_TESTS';
export const RECEIVE_ONE_TEST = 'RECEIVE_ONE_TEST';
export const REMOVE_TEST      = 'REMOVE_TEST';
export const REQUEST_POSTS    = 'REQUEST_POSTS';
export const CREATE_TEST      = 'CREATE_TEST';
export const UPDATED_TEST     = 'UPDATED_TEST';
export const UPDATE_FORM      = 'UPDATE_FORM';
export const FULFILL_FORM     = 'FULFILL_FORM';

export const RECEIVE_OWNERS   = 'RECEIVE_OWNERS';
export const RECEIVE_DOCTORS  = 'RECEIVE_DOCTORS';
export const SET_PETS         = 'SET_PETS';

function requestTEST(TEST_id) {
  return {
    type: REQUEST_POSTS,
    TEST_id
  }
}

export function fetchTests(active=true, user_id=11) {
  return function (dispatch) {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        active: active,  // get all
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken')
      }
    };
    return fetch('/api/v1/tests/listing/'+user_id+'/', data)
          .then(response => response.json())
          .then(json => dispatch(receiveTests(json)));
  }
};

export function receiveTests(TestsArrayProp) {
  return {
    type:  RECEIVE_TESTS,
    TestsArrayProp
  }
};

export function fulFillForm() {
    return function (dispatch) {
      let data = {
        method:      'GET',
        credentials: 'same-origin',
        mode:        'same-origin',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
        }
      };
      return fetch('/tests/fulfill_form', data)
          .then(response => response.json())
          .then(json => dispatch(setTestForm(json)));
  };
};

/*  Auxiliar Method */  
function setTestForm(test_arrays) {
  return {
    type:  FULFILL_FORM,
    TEST_arrays: test_arrays
  };
};

/* Load data in form to edit test */
export function updateForm(id) {
    return function (dispatch) {
      let data = {
        method:      'POST',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({
                       id: id
                     }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
        }
      };
      return fetch('/TESTintments/get_one_TEST', data)
          .then(response => response.json())  // promise
          .then(json => dispatch(receiveTEST(json)));
  };
};

function receiveTEST(update_form) {
  return {
    type:  UPDATE_FORM,
    oneTEST: update_form
  };
};

/* 
  Load pets owned for a customer 
  owner defines if it gets the pets (:id, :name) for owner or for TESTintment model 
*/
export function getTests(id, owner=true) {
    console.log('#############  In action getPets!!!');
    return function (dispatch) {
      let data = {
        method:      'POST',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({
                       id: id,
                       owner: owner
                     }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
        }
      }
      return fetch('/pets/get_tests', data)
          .then(response => response.json())
          .then(json => dispatch(setPets(json)));
  }
};

export function setPets(tests_options) {
  console.log('>>>>>>>>>>>>> Fields in setPets: ' + JSON.stringify(pets_options));
  return {
    type:  SET_PETS,
    tests_options
  }
};

export function createTEST(fields) {
  let data = {
      method: 'POST',
      body: JSON.stringify(fields),
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken')
      }
  };
  console.log('Fields create action: ' + JSON.stringify(fields));
  return dispatch => {
    return fetch('/TESTintments', data)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json)))
  }
};

export function updateTEST(fields) {
  let data = {
      method: 'PATCH',
      body:  {TESTintment: JSON.stringify(fields)},
      credentials: 'omit',
      mode: 'cors',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
      }
  };
  return dispatch => {
    return fetch('/intments/', data)
           .then(response => response.json())
           .then(json => dispatch(updatedTEST(json)))
  };
};

function updatedTEST(TESTsArrayProp) {
  console.log('PARAMS RAILS response: ' + JSON.stringify(TESTsArrayProp));
  return {
    type:  UPDATED_TEST,
    TESTsArrayProp
  };
}

export function removeTEST(TEST_id) {
  let data = {
      method: 'GET',
      id: aid,
      credentials: 'omit',
      headers: {
          'X-CSRFToken': cookie.load('csrftoken')
      }
  };

  return dispatch => {
    return fetch('/intments/delete_TEST', data)
           .then(response => response.json())
           .then(json => dispatch(receiveTESTs(json)))
  };
};

/** 
 * admin=1, owners =2,  doctors=3, staff=4 
 * owners by default
 **/
export function getUsersByGroup(group_id=1) {
    return function (dispatch) {
      let data = {
        method: 'POST',
        body:  JSON.stringify({
                       group_id: group_id
                     }),
        credentials: 'omit',
        mode:        'cors',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
        }
      };
      return fetch('/users/get_bygroup', data)
          .then(response => response.json())
          .then(json => dispatch(setUsers(json, group_id)));
  }
};

function setUsers(usersArrayProp, group_id) {
  if (group_id == 2) 
  {
    return {
      type:  RECEIVE_OWNERS,
      owners_options: usersArrayProp
    };
  } else {
    return {
       type:  RECEIVE_DOCTORS,
       doctors_options: usersArrayProp
    };
  }
};

function setDoctors(usersArrayProp) {
  return {
    type:  RECEIVE_DOCTORS,
    doctors_options: TESTsArrayProp
  }
};

export function deleteTEST(id){
     return function (dispatch) {
      let data = {
        method: 'DELETE',
        credentials: 'omit',
        mode:        'cors',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
        }
      };
      return fetch('/TESTintments/'+id, data)
          .then(response => response.json())
          .then(json => console.log('Deleted id:  ' + id));
  };
};





