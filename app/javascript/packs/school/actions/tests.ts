
import { IAllTests, RECEIVE_TESTS, IReceiveTestsTypes } from '../libs/types/test-types';

import Cookies from 'universal-cookie';

export const RECEIVE_ONE_TEST = 'RECEIVE_ONE_TEST';
export const REMOVE_TEST      = 'REMOVE_TEST';
export const REQUEST_TESTS    = 'REQUEST_TESTS';
export const CREATE_TEST      = 'CREATE_TEST';
export const UPDATED_TEST     = 'UPDATED_TEST';
export const SEARCH_QUESTIONS = 'SEARCH_QUESTIONS';
export const FULFILL_FORM     = 'FULFILL_FORM';

export const UPDATE_FORM = 'UPDATE_FORM';

export const RECEIVE_QUESTIONS    = 'RECEIVE_QUESTIONS';
export const RECEIVE_ONE_QUESTION = 'RECEIVE_ONE_QUESTION';

const cookies = new Cookies();

function headers(set_cookie: boolean =false) {
  let headers = {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  };
  if (set_cookie) {
    headers['Authorization'] = "Bearer " + cookies.get('remember_user_token');
 }
  return headers;
}

// Get all the quiz tests from this user
export const fetchTests: any = (user_id: number, active: boolean = true) => async (dispatch: any) => {
    let data: RequestInit = {
        method:      'POST',
        credentials: 'same-origin',
        mode:        'same-origin',
        body:        JSON.stringify({
          user_id: user_id,
          active: active,  // get all
        }),
        headers:     headers(true)
      };

    const URL  = '/api/v1/tests/listing/';
    const res  = await fetch(URL, data);
    try {
      const response = await res.json();
      const result   = await dispatch(receiveTest(response));
      return result;
    } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
}

/* Internal method */
function receiveTests(TestsArrayProp: any) {
  return {
    type:  RECEIVE_TESTS,
    payload: TestsArrayProp
  };
}

export const createOrUpdateTest: any = (fields: any, action: string = 'create') => async (dispatch: any) => {
  let method = (action == 'create') ? 'POST' : 'PATCH';
  let felder = (action == 'create') ? {test: fields} : {id: fields['id'], test: fields };
  let data: RequestInit = {
    method:      method,
    body:        JSON.stringify(felder),
    credentials: 'same-origin',
    mode:        'same-origin',
    headers:     headers(false)
  };

  const URL  =  '/api/v1/tests/' + action;
  const res  = await fetch(URL, data);
  try {
      const response = await res.json();
      const result   = await dispatch(console.log(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
}

export const fulFillForm: any = () => async (dispatch: any) => {

    let data: RequestInit = {
      method:      'GET',
      credentials: 'same-origin',
      mode:        'same-origin',
      headers:     headers(false)
    }

    const res  = await fetch('/api/v1/tests/fulfill_form', data);
    try {
        const response = await res.json();
        const result   = await dispatch(setTestForm(response));
        return result;
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
    }
}

/*  Auxiliar Method */
function setTestForm(test_arrays: any) {
  return {
    type:  FULFILL_FORM,
    payload: test_arrays
  }
}

export const createQuestion: any = (fields: any) => async (dispatch: any) => {

  let data: RequestInit = {
    method:      'POST',
    body:        JSON.stringify(fields),
    credentials: 'same-origin',
    mode:        'same-origin',
    headers:     headers()
  }
  const res  = await fetch('/api/v1/questions/create/', data);
  try {
      const response = await res.json();
      const result   = await dispatch(JSON.stringify(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
}

/* Load data in form to edit test */
export function updateTest(id: number) {
  return function (dispatch) {
    let data: RequestInit = {
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

function receiveTest(update_form: any) {
  return {
    type:  UPDATE_FORM,
    oneTEST: update_form
  }
}

/*   Load test and questions  */
export function fetchOneTest(test_id: number) {
  return function (dispatch) {
    let data: RequestInit = {
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
    let data: RequestInit  = {
      method:      'DELETE',
      credentials: 'same-origin',
      mode:        'same-origin',
      headers:     headers(false)
    };
    return fetch('/api/v1/'+controller+'/delete/'+id, data)
      .then(response => response.json())
      .then(json => console.log('Deleted id:  ' + id));
  };
}

/*** QUESTIONS SECTION***/

/*   Load question and answers  */
export function fetchOneQuestion(question_id: number) {
  return function (dispatch) {
    let data: RequestInit = {
      method:      'POST',
      credentials: 'same-origin',
      mode:        'same-origin',
      body:        JSON.stringify({
        id: question_id
      }),
      headers:     headers(false)
    };
    return fetch('/api/v1/questions/get_one/', data)
      .then(response => response.json())
      .then(json => dispatch(setOneQuestion(json)));
  };
}

function setOneQuestion(OneQuestionArrayProp: any) {
  return {
      type:  RECEIVE_ONE_QUESTION,
      payload: OneQuestionArrayProp
  };
}

export function createAnswer(fields: any) {
  let data: RequestInit = {
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

export function deleteQuestion(id: number, test_id: number){
  return function (dispatch) {
    let data: RequestInit = {
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

export function toggleField(controller: string, field: string, id: number){
  return function (dispatch) {
    let data: RequestInit = {
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
    let data: RequestInit = {
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

export function fetchOneAnswer(answer_id: number) {
  return function (dispatch) {
    let data: RequestInit = {
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

export function searchQuestions(id: number, terms: any, page: any, per_page: any) {
  return function (dispatch: any) {
    let data: RequestInit = {
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

function setSearch(SearchArrayProp: any) {
  return {
    type:  SEARCH_QUESTIONS,
    SearchArrayProp
  }
};

export function addQuestions(id: number, ids: any) {
  let question_ids = [];
  for (var i = 0; i < ids.length; i++){
    question_ids.push({id: ids[i]});
  }
  return function () {
    let data: RequestInit = {
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

export function reorderQuestion(id: number, question_id: number, way: any) {
  return function (dispatch: any) {
    let data: RequestInit = {
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
      .then(json => dispatch(console.log(json)));
  }
};
