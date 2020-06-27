import gql from 'graphql-tag';
import { DocumentNode } from "graphql";
import ApolloClient from 'apollo-boost';
import Cookies from 'universal-cookie';

import { IAllTests, DELETE_TEST, LOAD_TESTS, SAVE_TEST, ILoadTestsTypes } from '../libs/types/test-types';

export const RECEIVE_ONE_TEST = 'RECEIVE_ONE_TEST';
export const REMOVE_TEST      = 'REMOVE_TEST';
export const REQUEST_TESTS    = 'REQUEST_TESTS';
export const CREATE_TEST      = 'CREATE_TEST';
export const UPDATED_TEST     = 'UPDATED_TEST';
export const SEARCH_QUESTIONS = 'SEARCH_QUESTIONS';
export const FULFILL_FORM     = 'FULFILL_FORM';
export const FETCH_FAILURE    = 'FETCH_FAILURE';


export const UPDATE_FORM = 'UPDATE_FORM';

export const RECEIVE_QUESTIONS    = 'RECEIVE_QUESTIONS';
export const RECEIVE_ONE_QUESTION = 'RECEIVE_ONE_QUESTION';

const API_URL = '/graphql';
// Create the apollo client
const client = new ApolloClient({
  uri: API_URL
});

  const data: RequestInit = {
      method: 'PATCH'
    };

export const loadUserTests: any = (userGuid: string, active: boolean) => async (dispatch: any) => {
    try {
        const response = await client.query({
            query: gql`query _getUserTests_userGu825($userGuid: String!, $active: Boolean!) {
                          getUserTests(userGuid: $userGuid, active: $active) {
                              uurlid title createdAt subjectId }}`,
            variables: {userGuid: userGuid, active: active}});

        dispatch({
            type: LOAD_TESTS,
            payload: response.data.getUserTests
        });
    } catch (err) {
        console.log("  ############  ** API ERROR ** :  >>>> ", JSON.stringify(err));
        dispatch({
            type: FETCH_FAILURE,
            payload: { msg: err.toString() }
        });
    }
};

/*   Load test and questions  */
export const getOneTest: any = (uurlid: string) => async (dispatch: any) => {
    try {
        const response = await client.query({
            query: gql`{getOneTest(uurlid: $uurlid)
                          {uurlid title createdAt subjectId }}`,
            variables: {uurlid}});

        dispatch({
            type: LOAD_TESTS,
            payload: response.data.getUserTests
        });
    } catch (err) {
        dispatch({
            type: FETCH_FAILURE,
            payload: { msg: err.toString() }
        });
    }
};

export const saveTest: any = (title: string, guid: string, description: string, subject_id: number) => async (dispatch: any) => {
    try {
        const mutation: DocumentNode = gql`mutation GET_RECORD($name: String!, $time: Int!)
                                           {createRecord(name: $name, time: $time) { id name time createdAt }}`;

        const response = await client.mutate({mutation, variables: {title, guid, description, subject_id}});

        dispatch({
            type: SAVE_TEST,
            payload: response.data.createRecord
        });
    } catch (err) {
        dispatch({
            type: FETCH_FAILURE,
            payload: { msg: err.toString() }
        });
    }
};

export const createOrUpdateTest: any = (fields: any, action: string = 'create') => async (dispatch: any) => {
  let method = (action == 'create') ? 'POST' : 'PATCH';
  let felder = (action == 'create') ? {test: fields} : {id: fields['id'], test: fields };
  let data: RequestInit = {
    method:      method,
    body:        JSON.stringify(felder),
    credentials: 'same-origin',
    mode:        'same-origin'
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
};

export const deleteTest: any = (uurlid: string) => async (dispatch: any) => {
    try {
        const mutation: DocumentNode = gql`mutation DELETE_TEST($uurlid: String!)
                                           {deleteTest(uurlid: $uurlid) { message }}`;

        const response = await client.mutate({mutation, variables: {uurlid}});

        dispatch({
            type: DELETE_TEST,
            payload: response.data?.deleteTest?.message
        });
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
        dispatch({
            type: FETCH_FAILURE,
            payload: { msg: err.toString() }
        });
    }
};

export const createQuestion: any = (fields: any) => async (dispatch: any) => {

  const res  = await fetch('/api/v1/questions/create/', data);
  try {
      const response = await res.json();
      const result   = await dispatch(JSON.stringify(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

// Deletes test, question or answer
export const deleteRow: any = (id: number, controller: string) => async (dispatch: any) => {

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

  const res  = await fetch('/api/v1/answers/get_one/', data);
  try {
      const response = await res.json();
      const result   = await dispatch(console.log("  ############  ** VALUE ** :  >>>> ", JSON.stringify(response)));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

export const searchQuestions: any = (id: number, terms: any, page: any, per_page: any) => async (dispatch: any) => {

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
  // let question_ids = ids.reduce( (acc, value) => { acc.push({id: value}); return acc; },  []);


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
 
  try {
      const res  = await fetch('/api/v1/tests/reorder/', data);
      const response = await res.json();
      const result   = await dispatch(console.log(response));
      return result;
  } catch (err) {
      console.error('Error loading data: >> ', err.toString());
  }
};

