require('es6-promise').polyfill();
require('isomorphic-fetch');

import Cookies from 'universal-cookie'

export const RECEIVE_TESTS    = 'RECEIVE_TESTS';
export const RECEIVE_ONE_TEST = 'RECEIVE_ONE_TEST';
export const REMOVE_TEST      = 'REMOVE_TEST';
export const REQUEST_TESTS    = 'REQUEST_TESTS';
export const CREATE_TEST      = 'CREATE_TEST';
export const UPDATED_TEST     = 'UPDATED_TEST';
export const SEARCH_QUESTIONS = 'SEARCH_QUESTIONS';

export const RECEIVE_QUESTIONS    = 'RECEIVE_QUESTIONS';
export const RECEIVE_ONE_QUESTION = 'RECEIVE_ONE_QUESTION';

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
export function fetchTests(user_id, active=true) {
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
    // pause until fetch returns
    let data = await fetch('http://sampleapi.com/posts')
    return fetch('/api/v1/tests/listing/', data)
          .then(response => response.json())
          .then(json => dispatch(receiveTests(json)));
  }
}

/* Internal method */
function receiveTests(TestsArrayProp) {
  return {
    type:  RECEIVE_TESTS,
    TestsArrayProp: TestsArrayProp
  }
}

export function createOrUpdateTest(fields, action='create') {
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

export function fulFillForm() {
  return function (dispatch) {
      let data = {
        method:      'GET',
        credentials: 'same-origin',
        mode:        'same-origin',
        headers:     headers(false)
      }
      return fetch('/api/v1/tests/fulfill_form', data)
          .then(response => response.json())
          .then(json => dispatch(setTestForm(json)));
  }
}

/*  Auxiliar Method */
function setTestForm(test_arrays) {
  return {
    type:  FULFILL_FORM,
    TEST_arrays: test_arrays
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
        headers: headers(false)
      }
      return fetch('/api/v1/tests/update', data)
          .then(response => response.json())  // promise
          .then(json => dispatch(receiveTest(json)));
  }
}

function receiveTest(update_form) {
  return {
    type:  UPDATE_FORM,
    oneTEST: update_form
  }
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
        headers:     headers(false)
      }
      return fetch('/api/v1/tests/get_one/', data)
          .then(response => response.json())
          .then(json => dispatch(setOneTest(json)));
  }
}

function setOneTest(OneTestArrayProp) {
  return {
    type:  RECEIVE_ONE_TEST,
    OneTestArrayProp
  }
}

export function deleteRow(id, controller){
     return function (dispatch) {
      let data = {
        method:      'DELETE',
        credentials: 'same-origin',
        mode:        'same-origin',
        headers:     headers(false)
      }
      return fetch('/api/v1/'+controller+'/delete/'+id, data)
          .then(response => response.json())
          .then(json => console.log('Deleted id:  ' + id));
  }
}

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
        headers:     headers(false)
      }
      return fetch('/api/v1/questions/get_one/', data)
          .then(response => response.json())
          .then(json => dispatch(setOneQuestion(json)))
  }
}

function setOneQuestion(OneQuestionArrayProp) {
  return {
    type:  RECEIVE_ONE_QUESTION,
    OneQuestionArrayProp
  }
}

export function createAnswer(fields) {
  let data = {
      method:      'POST',
      body:        JSON.stringify(fields),
      credentials: 'same-origin',
      mode:        'same-origin',
      headers:     headers(false)
  }
  return dispatch => {
    return fetch('/api/v1/answers/create/', data)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json)))
  }
}

export function deleteQuestion(id, test_id){
     return function (dispatch) {
      let data = {
        method:      'DELETE',
        credentials: 'same-origin',
        mode:        'same-origin',
        headers:     headers(false)
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
        headers:     headers(false)
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
        headers:     headers(false)
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
        headers:     headers(false)
      }
      return fetch('/api/v1/answers/get_one/', data)
          .then(response => response.json())
          .then(json => dispatch(setOneTest(json)));
  }
};

export function searchQuestions(id, terms, page, per_page) {
    return function (dispatch) {
      let data = {
        method:      'POST',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({id: id, test: {
                       id:    id,
                       terms: terms,
                       page:  page,
                       per_page: per_page
                     }}),
        headers:     headers(false)
      }
      return fetch('/api/v1/tests/search/', data)
          .then(response => response.json())
          .then(json => dispatch(setSearch(json)));
  }
};

function setSearch(SearchArrayProp) {
  return {
    type:  SEARCH_QUESTIONS,
    SearchArrayProp
  }
};

export function addQuestions(id, ids) {
  let question_ids = [];
  for (var i = 0; i < ids.length; i++){
     question_ids.push({id: ids[i]});
  }
  return function (dispatch) {
      let data = {
        method:      'POST',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({id: id, test: {
                       id: id,
                       question_ids: question_ids
                     }}),
        headers:     headers(false)
      }
      return fetch('/api/v1/tests/linking/', data)
          .then(response => response.json())
          .then(json => console.log(json));
  }
};

export function reorderQuestion(id, question_id, way) {
  return function (dispatch) {
      let data = {
        method:      'PATCH',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({id: id, test:{
                       question_id: question_id,
                       id: id,
                       way: way
                     }}),
        headers:     headers(false)
      }
      return fetch('/api/v1/tests/reorder/', data)
          .then(response => response.json())
          .then(json => console.log(json));
  }
};

