'use strict';

import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import * as AnswersActionCreators from '../actions/tests';

class QuestionSearchRowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isHovering:  false,
       isExecuting: false
    }
    this.toggleAnswer = this.toggleAnswer.bind(this);
  }
     
  changeState(newState) {
    this.setState(newState);
  }

  isStringAcceptable(string) {
    return (string.length >= 4);  // Minimum 4 letters long
  }

  handleChange(event){
    this.setState({answer: event.answer});
    let action = AnswersActionCreators.updateAnswer(this.state.id, event.answer);
    this.props.dispatch(action);
  }

  toggleCheckbox(name, event){
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
  
  deleteAnswer(id) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(id);
    }
  }

  render() {
    const { question, keyRow } = this.props;
    let divStyle = {width: '100%', padding: '3px', margin: '2px'  };
    let graded = this.state.correct ? {text:'Correct', style: {color:'green',fontWeight:'bold',margin:'8px'}} : {text:'Incorrect', style:{color:'red',fontWeight:'bold',margin:'8px'}};
    return (
      <div key={keyRow} style={divStyle}>
        <a href="#" onClick={() => {this.toggleAnswer()}} className="removable" title="Switch Correct/Incorrect"><i className="glyphicon glyphicon-random"></i></a>
         <span style={graded.style}>{graded.text}</span>
        <RIEInput
            value={this.state.answer}
            change={this.handleChange.bind(this)}
            propName="answer"
            validate={this.isStringAcceptable}
            classLoading="loading"
            classInvalid="invalid" />
             

        <a href="#" onClick={() => {if(confirm('Delete answer?')) {this.deleteAnswer(answer.id)};}} className="removable"><i className="glyphicon glyphicon-trash"></i></a>
      </div>
    )
  }
}

AnswerRow.propTypes = {
  answer:      PropTypes.object,
  keyRow:    PropTypes.number,
  dispatch:  PropTypes.func
};

export default connect()(AnswerRow);


