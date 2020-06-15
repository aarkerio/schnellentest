
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
};

const receiveTests: any = (TestsArrayProp: any) => {
  return {
    type:  RECEIVE_TESTS,
    payload: TestsArrayProp
  };
};

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
const setTestForm: any = (test_arrays: any) => {
  return {
    type:  FULFILL_FORM,
    payload: test_arrays
  };
};

export const createQuestion: any = (fields: any) => async (dispatch: any) => {
  let data: RequestInit = {
    method:      'POST',
    body:        JSON.stringify(fields),
    credentials: 'same-origin',
    mode:        'same-origin',
    headers:     headers()
  };
  const res  = await fetch('/api/v1/questions/create/', data);
  try {
      const response = await res.json();
      const result   = await dispatch(JSON.stringify(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

/* Load data in form to edit test */
export const updateTest: any = (id: number) => async (dispatch: any) => {
  let data: RequestInit = {
      method:      'POST',
      credentials: 'same-origin',
      mode:        'same-origin',
      body:        JSON.stringify({
          id: id
      }),
      headers: headers(false)
  };
  const res = await fetch('/api/v1/tests/update', data);
  try {
      const response = await res.json();
      const result   = await dispatch(receiveTest(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

const receiveTest:any = (update_form: any) => {
  return {
    type:  UPDATE_FORM,
    payload: update_form
  };
};

 /*   Load test and questions  */
export const fetchOneTest: any = (test_id: number) => async (dispatch: any) => {
  let data: RequestInit = {
      method:      'POST',
      credentials: 'same-origin',
      mode:        'same-origin',
      body:        JSON.stringify({
        id: test_id
      }),
      headers:     headers(false)
  }
  const res = await fetch('/api/v1/tests/get_one/', data);
  try {
      const response = await res.json();
      const result   = await dispatch(setOneTest(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

const setOneTest: any = (OneTestArrayProp: any) => {
  return {
    type:  RECEIVE_ONE_TEST,
    payload: OneTestArrayProp
  };
};

// Deletes test, question or answer
export const deleteRow: any = (id: number, controller: string) => async (dispatch: any) => {
  let data: RequestInit  = {
      method:      'DELETE',
      credentials: 'same-origin',
      mode:        'same-origin',
      headers:     headers(false)
    };

  const res  = await fetch('/api/v1/'+controller+'/delete/'+id, data);
  try {
      const response = await res.json();
      const result   = await dispatch(console.log(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
}

/*** QUESTIONS SECTION***/

/*   Load question and answers  */
export const fetchOneQuestion: any = (question_id: number) => async (dispatch: any) => {
    let data: RequestInit = {
      method:      'POST',
      credentials: 'same-origin',
      mode:        'same-origin',
      body:        JSON.stringify({
        id: question_id
      }),
      headers:     headers(false)
    };

    const res = await fetch('/api/v1/questions/get_one/', data);
    try {
        const response = await res.json();
        const result   = await dispatch(setOneQuestion(response));
        return result;
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
    }
}

const setOneQuestion = (OneQuestionArrayProp: any) => {
  return {
      type:  RECEIVE_ONE_QUESTION,
      payload: OneQuestionArrayProp
  };
}

export const createAnswer: any = (fields: string) => async (dispatch: any) => {

  let data: RequestInit = {
    method:      'POST',
    body:        JSON.stringify(fields),
    credentials: 'same-origin',
    mode:        'same-origin',
    headers:     headers(false)
  }
  const res = await fetch('/api/v1/answers/create/', data);
  try {
      const response = await res.json();
      const result   = await dispatch(JSON.stringify(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};


export const deleteQuestion: any = (id: number, test_id: number) => async (dispatch: any) => {

  let data: RequestInit = {
      method:      'DELETE',
      credentials: 'same-origin',
      mode:        'same-origin',
      headers:     headers(false)
  };

  const res  = await fetch('/api/v1/questions/delete/'+id+'/'+test_id, data);
  try {
      const response = await res.json();
      const result   = await dispatch(console.log('Deleted id:  ' + id));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

export const toggleField: any = (controller: string, field: string, id: number) => async (dispatch: any) => {

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

    try {
        const res      = await fetch('/api/v1/'+controller+'/toggle/', data);
        const response = await res.json();
        const result   = console.log('Toggle id:  ' + id + "  >> " + response);
        return result;
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
    }
};

export const updateAnswer: any = (id: number, answer: string) => async (dispatch: any) => {

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

  const res  = await fetch('/api/v1/answers/update/', data);
  try {
      const response = await res.json();
      const result   = console.log('Update answer id:  ' + id + ' >>> ' + response);
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

export const fetchOneAnswer: any = (answer_id: number) => async (dispatch: any) => {

  let data: RequestInit = {
      method:      'POST',
      credentials: 'same-origin',
      mode:        'same-origin',
      body:        JSON.stringify({
        id: answer_id
      }),
      headers:     headers(false)
  };

  const res  = await fetch('/api/v1/answers/get_one/', data);
  try {
      const response = await res.json();
      const result   = await dispatch(receiveTest(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

export const searchQuestions: any = (id: number, terms: any, page: any, per_page: any) => async (dispatch: any) => {
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
  };

  const res = await fetch('/api/v1/tests/search/', data);
  try {
      const response = await res.json();
      const result   = await dispatch(setSearch(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

const setSearch: any = (SearchArrayProp: any) => {
     return {
         type:  SEARCH_QUESTIONS,
         payload: SearchArrayProp
     }
};

export const addQuestions: any = (id: number, ids: number[]) => async (dispatch: any) => {
  let question_ids = ids.reduce( (acc, value) => { acc.push({id: value}); return acc; },  []);
  let data: RequestInit = {
      method:      'POST',
      credentials: 'same-origin',
      mode:        'same-origin',
      body:        JSON.stringify({id: id, test: {
          id: id,
          question_ids: question_ids
      }}),
      headers:     headers(false)
  };

  const res  = await fetch('/api/v1/tests/linking/', data);
    try {
        const response = await res.json();
        const result   = await dispatch(console.log(response));
        return result;
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
    }
};

export const reorderQuestion: any = (id: number, question_id: number, way: any) => async (dispatch: any) => {
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
  };

  try {
      const res  = await fetch('/api/v1/tests/reorder/', data);
      const response = await res.json();
      const result   = await dispatch(console.log(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};
