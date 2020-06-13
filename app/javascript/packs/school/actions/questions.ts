require('es6-promise').polyfill();
require('isomorphic-fetch');

import Cookies from 'universal-cookie'

export const RECEIVE_QUESTION  = 'RECEIVE_QUESTION';
export const REQUEST_QUESTION  = 'REQUEST_QUESTION';
export const REQUEST_POSTS     = 'REQUEST_POSTS';

const cookies = new Cookies();

function headers(set_cookie: boolean = false) {
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

// Get all the quiz tests from this user
export function fetchQuestion(user_id: number, active:boolean = true) {
  return function (dispatch) {
    let data: RequestInit = {
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
      .then(json => dispatch(console.log(json)))
  }
}

