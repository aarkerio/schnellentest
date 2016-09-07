'use strict';

import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import * as AnswersActionCreators from '../actions/tests';
import { browserHistory } from 'react-router';

// Inline edition 
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags } from 'riek';

class AnswerRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isHovering: false,
       isExecuting: false,
       textValues: ["Delete", "Are you sure?", "Deleting..."],
       boolean:      true,
       text:         '',            //initial prop value
       propName:     '',            //name of the prop to return to the change function
       change:       'handleSubmit', //function which will receive a plain object with a single key, provided in propName
       date :        Date.now(),
       tags:         new Set(["Bergen", "Asmara", "Göteborg", "Newcastle", "Seattle"]),
       simulateXHR:  false,
       XHRDelay:     450,
       highlight:    false,
       showSource:   false
    }
  }

/**
  *  Delete Single Answer
  *  Private
  */
  deleteAnswer(answer_id) {
    let action = AnswersActionCreators.deleteAnswer(answer_id);
    this.props.dispatch(action);
    console.log(' to delete answer_id: >>>>' + answer_id);
    window.location='/tests';
  }

  changeState(newState) {
    this.setState(newState);
  }

  isStringAcceptable(string) {
    return (string.length >= 1);  // Minimum 4 letters long
  }

  virtualServerCallback(newState) {
    if (this.state.simulateXHR) {
    window.setTimeout(function() {
      this.changeState(newState);
    }.bind(this), this.state.XHRDelay);
    } else {
    this.changeState(newState);
    }
  }

  render() {
    const { answer, keyRow } = this.props;
    return (
      <div key={keyRow}>
          <RIEToggle
              value={this.state.boolean}
              className={this.state.highlight ? "editable" : ""}
              change={this.virtualServerCallback}
              classLoading="loading"
              propName="boolean" />

          <RIEInput
              value={this.state.text}
              change={this.virtualServerCallback}
              propName="text"
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
  keyRow:    PropTypes.string,
  dispatch:  PropTypes.func
}

export default connect()(AnswerRow);


