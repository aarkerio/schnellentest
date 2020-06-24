import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector  } from "react-redux";

import * as AnswersActionCreators from '../actions/tests';
import PropTypes from 'prop-types';

// Inline edition
import { RIEInput } from 'riek';

interface AnswerRowProps {
  answer: {id:      number,
           correct: boolean,
           active:  boolean,
           answer:  string },
  keyRow:    string,
  dispatch:  any,
  onChange(rowParam: number, colParam: number): (...args: any[]) => void
};

const AnswerRow: React.FC<AnswerRowProps> = () => {

  const dispatch = useDispatch();
  const textValues =  ["Delete", "Are you sure?", "Deleting..."];
  const [isHovering, setName] = useState('Joe');
  const [isExecuting, set]    = useState(0);

  const changeState = (newState: any) => {
    this.setState(newState);
  };

  const isStringAcceptable = (string: string) => {
    return (string.length >= 4);  // Minimum 4 letters long
  };

  const handleChange = (event: any) => {
    this.setState({answer: event.answer});
    let action = AnswersActionCreators.updateAnswer(this.state.id, event.answer);
    this.props.dispatch(action);
  };

  const toggleCheckbox = (name: string) => {
    let change = !this.state[name];
    this.setState({name: change});
  };

  const toggleAnswer = () => {
    let new_state = !this.state.correct;
    this.setState({correct: new_state});
    let action = AnswersActionCreators.toggleField('answers', 'correct', this.state.id);
    this.props.dispatch(action);
  };

  const loadAnswer = () => {
    let newcall = AnswersActionCreators.fetchOneAnswer( this.state.question_id );
    this.props.dispatch(newcall);
  };

  const deleteAnswer = (id: number) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(id);
    }
  };

  const { answer, keyRow } = this.props;
  let divStyle = { width: '100%', padding: '3px', margin: '2px' };
  let graded   = this.state.correct ? {text:'Correct', style: {color:'green',fontWeight:'bold',margin:'8px'} as React.CSSProperties } : {text:'Incorrect', style:{color:'red',fontWeight:'bold',margin:'8px'} as React.CSSProperties};

  return (
    <div key={keyRow} style={divStyle}>
      <a href="#" onClick={() => {this.toggleAnswer();}} className="removable" title="Switch Correct/Incorrect"><i className="glyphicon glyphicon-random"></i></a>
      <span style={graded.style}>{graded.text}</span>
      <RIEInput
        value={this.state.answer}
        change={this.handleChange.bind(this)}
        propName='answer'
        validate={this.isStringAcceptable}
        classLoading="loading"
        classInvalid="invalid" />

      <a href="#" onClick={() => { if(confirm('Delete answer?')) {this.deleteAnswer(answer.id)}; }} className="removable"><i className="glyphicon glyphicon-trash"></i></a>
    </div>
  );
};

export default AnswerRow;
