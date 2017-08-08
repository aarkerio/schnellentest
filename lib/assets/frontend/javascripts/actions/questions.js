require('es6-promise').polyfill()
require('isomorphic-fetch')

import Cookies from 'universal-cookie'

export const RECEIVE_QUESTION    = 'RECEIVE_QUESTION'
export const REQUEST_QUESTION    = 'REQUEST_QUESTION'

const cookies = new Cookies();

function headers(set_cookie=false) {
  let headers = {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
  if (set_cookie){
    headers['Authorization'] = "Bearer " + cookies.get('remember_user_token')
  }
  return headers;
}

function requestTest(test_id) {
  return {
    type: REQUEST_POSTS,
    test_id
  }
}
// Get all the quiz tests from this user
export function fetchQuestion(user_id, active=true) {
  return function (dispatch) {
    let data = {
      method:      'POST',
      credentials: 'same-origin',
      mode:        'same-origin',
      body:        JSON.stringify({
                       user_id: user_id,
                       active: active,  // get all
                   }),
      headers:     headers(true)
    }
    return fetch('/api/v1/tests/listing/', data)
          .then(response => response.json())
          .then(json => dispatch(receiveTests(json)));
  }
}

/* Internal method */
function receiveTests(TestsArrayProp) {
  return {
    type:  RECEIVE_QUESTIONS,
    TestsArrayProp: TestsArrayProp
  }
}

export function createOrUpdateQuestion(fields, action='create') {
  let method = (action == 'create') ? 'POST' : 'PATCH';
  let felder = (action == 'create') ? {test: fields} : {id: fields['id'], test: fields };
  let data = {
      method:      method,
      body:        JSON.stringify(felder),
      credentials: 'same-origin',
      mode:        'same-origin',
      headers:     headers(false)
  }
  return dispatch => {
    return fetch('/api/v1/tests/'+action, data)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json)))
  }
}

/*  Auxiliar Method */
function setTestForm(test_arrays) {
  return {
    type:  FULFILL_FORM,
    QUESTION_arrays: test_arrays
  }
}

export function createQuestion(fields) {
  let data = {
      method:      'POST',
      body:        JSON.stringify(fields),
      credentials: 'same-origin',
      mode:        'same-origin',
      headers:     headers()
  }
  return dispatch => {
    return fetch('/api/v1/questions/create/', data)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json)))
  }
}
