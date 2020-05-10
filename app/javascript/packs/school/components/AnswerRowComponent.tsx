import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as AnswersActionCreators from '../actions/tests';
import PropTypes from 'prop-types';

// Inline edition
import { RIEInput } from 'riek';

interface IPropTypes {
  answer: {id:      number,
           correct: boolean,
           active:  boolean,
           answer:  string },
  keyRow:    string,
  dispatch:  any,
  onChange:  any
};

class AnswerRow extends React.Component<IPropTypes, any> {

  static propTypes  = {
    answer:    PropTypes.object,
    keyRow:    PropTypes.string.isRequired,
    dispatch:  PropTypes.func,
    onChange:  PropTypes.func
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isHovering:  false,
      isExecuting: false,
      textValues:  ["Delete", "Are you sure?", "Deleting..."],
      boolean:     true,
      id:          this.props.answer.id,
      answer:      this.props.answer.answer,
      correct:     this.props.answer.correct,
      active:      this.props.answer.active,
      text:        '',            //initial prop value
      propName:    '',            //name of the prop to return to the change function
      change:      'handleSubmit', //function which will receive a plain object with a single key, provided in propName
      date :       Date.now(),
      tags:        new Set(["Math", "Geography", "History", "Science", "Chemistry"]),
      simulateXHR: false,
      XHRDelay:    450,
      highlight:   false,
      showSource:  false
    };
    this.toggleAnswer = this.toggleAnswer.bind(this);
  }

  changeState(newState: any) {
    this.setState(newState);
  }

  isStringAcceptable(string: string) {
    return (string.length >= 4);  // Minimum 4 letters long
  }

  handleChange(event: any){
    this.setState({answer: event.answer});
    let action = AnswersActionCreators.updateAnswer(this.state.id, event.answer);
    this.props.dispatch(action);
  }

  toggleCheckbox(name: string){
    let change = !this.state[name];
    this.setState({name: change});
  }

  toggleAnswer() {
    let new_state = !this.state.correct;
    this.setState({correct: new_state});
    let action = AnswersActionCreators.toggleField('answers', 'correct', this.state.id);
    this.props.dispatch(action);
  }

  loadAnswer(){
    let newcall = AnswersActionCreators.fetchOneAnswer( this.state.question_id );
    this.props.dispatch(newcall);
  }

  deleteAnswer(id: number) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(id);
    }
  }

  render() {
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
  }
}

export default AnswerRow;
