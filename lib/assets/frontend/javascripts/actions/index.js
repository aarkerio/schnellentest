/* ChipotleSoftware (c) 2015-2016 MIT License*/
import { CALL_API, Schemas } from '../middleware/ApiCalls'
import fetch from 'isomorphic-fetch';

let nextTodoId = 0

/*
 * action creators
 */
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text: text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id: id
  }
}

/** Asyncronus App **/

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}


function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}
/******  Appos API *********/
export const REQUEST_APPOS   = 'REQUEST_APPOS'
export const SHOW_APPOS      = 'SHOW_APPOS'
export const ADD_APPO        = 'ADD_APPO'
export const RECEIVE_APPOS   = 'RECEIVE_APPOS'
export const SELECT_APPO     = 'SELECT_APPO'
export const INVALIDATE_APPO = 'INVALIDATE_APPO'

export const showAppos = () => {
  return {
    type: SHOW_APPOS,
    apposArrayProp: []
  }
}

export function invalidateAppo(appo) {
  return {
    type: INVALIDATE_APPO,
    appo
  }
}

function receiveAppos(appos, json) {
  console.log(' receiveAppos Action in index file >>>>>' + JSON.stringify(json))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp: json
  }
}

function requestAppos(appo_id) {
  return {
    type: REQUEST_APPOS,
    appo_id: appo_id
  }
}

export const fetchAppos = (appo_id) => {
  let appos = []
  let data = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      }
    }
  console.log('in fetchAppos 148')
  return dispatch => {
    // dispatch(requestAppos(appos))
    return fetch('/appointments/get_appos', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(appos, json)))
  }
}

function shouldFetchAppos(state, appo) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchApposIfNeeded(owner_id) {
  return (dispatch, getState) => {
    if (shouldFetchAppos(getState(), owner_id)) {
      return dispatch(fetchPosts(owner))
    }
  }
}

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `users/${login}`,
      schema: Schemas.USER
    }
  }
}

