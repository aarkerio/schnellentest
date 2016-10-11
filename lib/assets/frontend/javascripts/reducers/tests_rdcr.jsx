'use strict'

import { REQUEST_TESTS, RECEIVE_TESTS, RECEIVE_ONE_TEST, RECEIVE_ONE_QUESTION, SEARCH_QUESTIONS } from '../actions/tests'

const initialState = {
    TestsArrayProp:       [],
    OneTestArrayProp:     {},
    OneQuestionArrayProp: {},
    AnswersArrayProp:     [],
    QuestionsArrayProp:   [],
    SearchArrayProp:      []
}

const tests_rdcr = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TESTS:
      return Object.assign({}, state, {
           TestsArrayProp: action.TestsArrayProp
      })

    case REQUEST_TESTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case RECEIVE_ONE_TEST:
      return Object.assign({}, state, {
          OneTestArrayProp: action.OneTestArrayProp,
          QuestionsArrayProp: action.OneTestArrayProp.questions
      });

    case RECEIVE_ONE_QUESTION:
      return Object.assign({}, state, {
          OneQuestionArrayProp: action.OneQuestionArrayProp,
          AnswersArrayProp: action.OneQuestionArrayProp.answers
      });

    case SEARCH_QUESTIONS:
      console.log('ACTION.:  >>>> ' + JSON.stringify(action));
      return Object.assign({}, state, {
        SearchArrayProp: action.SearchArrayProp
      });

    default:
      return state;
  }
}

export default tests_rdcr

