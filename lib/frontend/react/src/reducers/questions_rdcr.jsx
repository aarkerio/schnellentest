'use strict'

import { REQUEST_QUESTION } from '../actions/questions'

const initialState = {
    QuestionsArrayProp:   [],
    AnswersArrayProp:     []
}

const questions_rdcr = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUESTION:
      return Object.assign({}, state, {
           QuestionsArrayProp: action.QuestionsArrayProp
      })

    default:
      return state;
  }
}

export default questions_rdcr

