import { FETCH_FAILURE, REQUEST_TESTS, RECEIVE_ONE_TEST, RECEIVE_ONE_QUESTION, SEARCH_QUESTIONS } from '../actions/tests';

import { RECEIVE_TESTS } from '../libs/types/test-types';

const initialState: object = {
    TestsArrayProp:       [],
    OneTestArrayProp:     {},
    OneQuestionArrayProp: {},
    AnswersArrayProp:     [],
    QuestionsArrayProp:   [],
    SearchArrayProp:      [],
    isLoading: false,
    isError: false
};

const tests_rdcr = (state: object = initialState, action: any) => {
  switch (action.type) {
    case RECEIVE_TESTS:
      return Object.assign({}, state, {
           TestsArrayProp: action.payload
      });

    case REQUEST_TESTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case RECEIVE_ONE_TEST:
      return Object.assign({}, state, {
          OneTestArrayProp: action.payload,
          QuestionsArrayProp: action.OneTestArrayProp.questions
      });

    case RECEIVE_ONE_QUESTION:
      return Object.assign({}, state, {
          OneQuestionArrayProp: action.payload,
          AnswersArrayProp: action.OneQuestionArrayProp.answers
      });

    case SEARCH_QUESTIONS:
      return Object.assign({}, state, {
        SearchArrayProp: action.payload.results,
        TotalNumberProp: action.payload.total
      });

   case FETCH_FAILURE:
     return {
         ...state,
         isLoading: false,
         isError: true,
     };

    default:
      return state;
  }
};

export default tests_rdcr;
