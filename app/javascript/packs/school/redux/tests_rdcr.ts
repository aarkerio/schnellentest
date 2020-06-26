import { FETCH_FAILURE, REQUEST_TESTS, RECEIVE_ONE_TEST, RECEIVE_ONE_QUESTION, SEARCH_QUESTIONS } from '../actions/tests';

import { LOAD_TESTS } from '../libs/types/test-types';

const initialState: object = {
    TestsArray:        [],
    OneTestObject:     {},
    OneQuestionObject: {},
    AnswersArray:      [],
    QuestionsArray:    [],
    SearchArray:       [],
    isLoading: false,
    isError: false
};

const tests_rdcr = (state: object = initialState, action: any) => {
  switch (action.type) {
    case LOAD_TESTS:
      return Object.assign({}, state, {
           TestsArray: action.payload
      });

    case REQUEST_TESTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case RECEIVE_ONE_TEST:
      return Object.assign({}, state, {
          OneTestObject: action.payload,
          QuestionsArray: action.OneTestArray.questions
      });

    case RECEIVE_ONE_QUESTION:
      return Object.assign({}, state, {
          OneQuestionObject: action.payload,
          AnswersArray: action.OneQuestionArray.answers
      });

    case SEARCH_QUESTIONS:
      return Object.assign({}, state, {
        SearchArray: action.payload.results,
        TotalNumber: action.payload.total
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
