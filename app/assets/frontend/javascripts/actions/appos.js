import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie';
import 'babel-polyfill';

export const RECEIVE_APPOS    = 'RECEIVE_APPOS';
export const RECEIVE_ONE_APPO = 'RECEIVE_ONE_APPO';
export const REMOVE_APPO      = 'REMOVE_APPO';
export const REQUEST_POSTS    = 'REQUEST_POSTS';
export const CREATE_APPO      = 'CREATE_APPO';
export const UPDATED_APPO     = 'UPDATED_APPO';
export const UPDATE_FORM      = 'UPDATE_FORM';
export const FULFILL_FORM     = 'FULFILL_FORM';

export const RECEIVE_OWNERS   = 'RECEIVE_OWNERS';
export const RECEIVE_DOCTORS  = 'RECEIVE_DOCTORS';
export const SET_PETS         = 'SET_PETS';

function requestAppo(appo_id) {
  return {
    type: REQUEST_POSTS,
    appo_id
  }
}

export function fetchAppos(active=true) {
  return function (dispatch) {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        active: active // get all
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken':  cookie.load('csrftoken')
      }
    };
    return fetch('/appointments/get_appos', data)
          .then(response => response.json())
          .then(json => dispatch(receiveAppos(json)));
  }
};

export function receiveAppos(apposArrayProp) {
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp
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
      return fetch('/appointments/fulfill_form', data)
          .then(response => response.json())
          .then(json => dispatch(setAppoForm(json)));
  };
};

/*  Auxiliar Method */  
function setAppoForm(appo_arrays) {
  return {
    type:  FULFILL_FORM,
    appo_arrays: appo_arrays
  };
};

/* Load data in form to edit appointment */
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
      return fetch('/appointments/get_one_appo', data)
          .then(response => response.json())  // promise
          .then(json => dispatch(receiveAppo(json)));
  };
};

function receiveAppo(update_form) {
  return {
    type:  UPDATE_FORM,
    oneAppo: update_form
  };
};

/* 
  Load pets owned for a customer 
  owner defines if it gets the pets (:id, :name) for owner or for appointment model 
*/
export function getPets(id, owner=true) {
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
      return fetch('/pets/get_pets', data)
          .then(response => response.json())
          .then(json => dispatch(setPets(json)));
  }
};

export function setPets(pets_options) {
  console.log('>>>>>>>>>>>>> Fields in setPets: ' + JSON.stringify(pets_options));
  return {
    type:  SET_PETS,
    pets_options
  }
};

export function createAppo(fields) {
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
    return fetch('/appointments', data)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json)))
  }
};

export function updateAppo(fields) {
  let data = {
      method: 'PATCH',
      body:  {appointment: JSON.stringify(fields)},
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
      }
  };
  return dispatch => {
    return fetch('/appointments/', data)
           .then(response => response.json())
           .then(json => dispatch(updatedAppo(json)))
  };
};

function updatedAppo(apposArrayProp) {
  console.log('PARAMS RAILS response: ' + JSON.stringify(apposArrayProp));
  return {
    type:  UPDATED_APPO,
    apposArrayProp
  };
}

export function removeAppo(appo_id) {
  let data = {
      method: 'GET',
      id: aid,
      credentials: 'same-origin',
      headers: {
          'X-CSRFToken': cookie.load('csrftoken')
      }
  };

  return dispatch => {
    return fetch('/appointments/delete_appo', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(json)))
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
        credentials: 'same-origin',
        mode:        'same-origin',
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
    doctors_options: apposArrayProp
  }
};

export function deleteAppo(id){
     return function (dispatch) {
      let data = {
        method: 'DELETE',
        credentials: 'same-origin',
        mode:        'same-origin',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
        }
      };
      return fetch('/appointments/'+id, data)
          .then(response => response.json())
          .then(json => console.log('Deleted id:  ' + id));
  };
};





