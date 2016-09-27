require('es6-promise').polyfill();
require('isomorphic-fetch');

import cookie from 'react-cookie';

export const RECEIVE_TESTS    = 'RECEIVE_TESTS';
export const RECEIVE_ONE_TEST = 'RECEIVE_ONE_TEST';
export const REMOVE_TEST      = 'REMOVE_TEST';
export const REQUEST_TESTS    = 'REQUEST_TESTS';
export const CREATE_TEST      = 'CREATE_TEST';
export const UPDATED_TEST     = 'UPDATED_TEST';

export const RECEIVE_QUESTIONS    = 'RECEIVE_QUESTIONS';
export const RECEIVE_ONE_QUESTION = 'RECEIVE_ONE_QUESTION';

function requestTest(test_id) {
  return {
    type: REQUEST_POSTS,
    test_id
  }
}

export function fetchTests(user_id, active=true) {
  return function (dispatch) {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        user_id: user_id,
        active: active,  // get all
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
        'Authorization': "Bearer " + cookie.load('remember_user_token'),
      }
    };
    return fetch('/api/v1/tests/listing/', data)
          .then(response => response.json())
          .then(json => dispatch(receiveTests(json)));
  }
};

/* Internal method */
function receiveTests(TestsArrayProp) {
  return {
    type:  RECEIVE_TESTS,
    TestsArrayProp: TestsArrayProp
  }
};

export function createTest(fields) {
  let data = {
      method: 'POST',
      body: JSON.stringify(fields),
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
  };
  return dispatch => {
    return fetch('/api/v1/tests/create/', data)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json)))
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
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      };
      return fetch('/api/v1/tests/fulfill_form', data)
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

export function createQuestion(fields) {
  let data = {
      method: 'POST',
      body: JSON.stringify(fields),
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
  };
  return dispatch => {
    return fetch('/api/v1/questions/create/', data)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json)))
  }
};

/* Load data in form to edit test */
export function updateTest(id) {
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
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      };
      return fetch('/api/v1/tests/update', data)
          .then(response => response.json())  // promise
          .then(json => dispatch(receiveTest(json)));
  };
};

function receiveTest(update_form) {
  return {
    type:  UPDATE_FORM,
    oneTEST: update_form
  };
};


export function __updateTest(fields) {
  let data = {
      method: 'PATCH',
      body:  JSON.stringify(fields),
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
  };
  return dispatch => {
    return fetch('/api/v1/tests/update/', data)
           .then(response => response.json())
           .then(json => dispatch(updatedTest(json)))
  };
};

function updatedTest(TestArrayProp) {
  return {
    type:  UPDATED_TEST,
    TestArrayProp
  };
}

/*   Load test and questions  */
export function fetchOneTest(test_id) {
    return function (dispatch) {
      let data = {
        method:      'POST',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({
                       id: test_id
                     }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      }
      return fetch('/api/v1/tests/get_one/', data)
          .then(response => response.json())
          .then(json => dispatch(setOneTest(json)));
  }
};

function setOneTest(OneTestArrayProp) {

  return {
    type:  RECEIVE_ONE_TEST,
    OneTestArrayProp
  }
};

export function deleteRow(id, controller){
     return function (dispatch) {
      let data = {
        method: 'DELETE',
        credentials: 'same-origin',
        mode:        'same-origin',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      };
      return fetch('/api/v1/'+controller+'/delete/'+id, data)
          .then(response => response.json())
          .then(json => console.log('Deleted id:  ' + id));
  };
};

/*** QUESTIONS SECTION***/

/*   Load question and answers  */
export function fetchOneQuestion(question_id) {
    return function (dispatch) {
      let data = {
        method:      'POST',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({
                       id: question_id
                     }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      }
      return fetch('/api/v1/questions/get_one/', data)
          .then(response => response.json())
          .then(json => dispatch(setOneQuestion(json)));
  }
};

function setOneQuestion(OneQuestionArrayProp) {
  return {
    type:  RECEIVE_ONE_QUESTION,
    OneQuestionArrayProp 
  }
};

export function createAnswer(fields) {
  let data = {
      method: 'POST',
      body: JSON.stringify(fields),
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
  };
  return dispatch => {
    return fetch('/api/v1/answers/create/', data)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json)))
  }
};

export function deleteQuestion(id, test_id){
     return function (dispatch) {
      let data = {
        method: 'DELETE',
        credentials: 'same-origin',
        mode:        'same-origin',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      };
      return fetch('/api/v1/questions/delete/'+id+'/'+test_id, data)
          .then(response => response.json())
          .then(json => console.log('Deleted id:  ' + id));
  };
};

export function toggleField(controller, field, id){
     return function (dispatch) {
      let data = {
        method: 'PATCH',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({
                       id: id,
                       field: field
                     }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      };
      return fetch('/api/v1/'+controller+'/toggle/', data)
          .then(response => response.json())
          .then(json => console.log('Toggle id:  ' + id));
  };
};

export function updateAnswer(id, answer){
     return function (dispatch) {
      let data = {
        method: 'PATCH',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({
                       id: id,
                       answer: answer
                     }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      };
      return fetch('/api/v1/answers/update/', data)
          .then(response => response.json())
          .then(json => console.log('Update answer id:  ' + id));
  };
};

export function fetchOneAnswer(answer_id) {
    return function (dispatch) {
      let data = {
        method:      'POST',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({
                       id: answer_id
                     }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      }
      return fetch('/api/v1/answers/get_one/', data)
          .then(response => response.json())
          .then(json => dispatch(setOneTest(json)));
  }
};
