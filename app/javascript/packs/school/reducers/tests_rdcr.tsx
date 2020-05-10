import { REQUEST_TESTS, RECEIVE_ONE_TEST, RECEIVE_ONE_QUESTION, SEARCH_QUESTIONS } from '../actions/tests';

import { RECEIVE_TESTS } from '../libs/types/test-types';

const initialState: object = {
    TestsArrayProp:       [],
    OneTestArrayProp:     {},
    OneQuestionArrayProp: {},
    AnswersArrayProp:     [],
    QuestionsArrayProp:   [],
    SearchArrayProp:      []
};

const tests_rdcr = (state: object = initialState, action: any) => {
  switch (action.type) {
    case RECEIVE_TESTS:
      return Object.assign({}, state, {
           TestsArrayProp: action.TestsArrayProp
      });

    case REQUEST_TESTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

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
      return Object.assign({}, state, {
        SearchArrayProp: action.SearchArrayProp.results,
        TotalNumberProp: action.SearchArrayProp.total
      });

    default:
      return state;
  }
};

export default tests_rdcr;
