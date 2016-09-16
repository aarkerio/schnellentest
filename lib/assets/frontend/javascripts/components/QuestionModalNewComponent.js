'use strict';
import cookie from 'react-cookie';
import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as testsActionCreators from '../actions/tests';
import { Button, Modal } from 'react-bootstrap';

import Moment from 'moment';

var Globalize = require('globalize');

class QuestionModalNewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal:   true, 
                   user_id:     0,    // not valid values
                   question:    '',
                   explanation: '',
                   hint:        '',
                   tags:        '',
                   worth:       1,
                   active:      true,
                   qtype:       true
             };
  }

/**
 * Sends the data to create a new appointment
 **/
  handleSubmit(e) {
    e.preventDefault();

    let fields = {question: {
      user_id:     cookie.load('user_id'),
      question:    this.state.question, 
      explanation: this.state.explanation,
      hint:        this.state.hint,
      tags:        this.state.tags,
      worth:       this.state.worth,
      active:      this.state.active,
      qtype:       this.state.qtype,
      test_id:     this.props.routeParams.test_id
    }};
    
    let isValid = this.validatesForm(fields);
    if ( !isValid['pass'] ) {
      console.log('Question not valid: ' + isValid['message']);
    }
    let action = testsActionCreators.createQuestion(fields);
    this.props.dispatch(action);  // thunk middleware
    //window.location='/questions/' + this.props.routeParams.test_id;
    // this.props.dispatch(push('/questions/' + this.props.routeParams.test_id));
    // browserHistory.push('/questions/' + this.props.routeParams.test_id);
    this.props.dispatch(routeActions.push('/questions/' + this.props.routeParams.test_id));
  }

  /* Validates form*/
  validatesForm(fields){
    let valid = {pass: true, message: 'Not message yet'};
    //console.log(JSON.stringify(fields));

    if ( !this.state.question.length ) {
      valid['question']  = false;
      valid['message']   = 'Question not valid';
    }

    return valid;    
  }

  handleChange(name, event) {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  toggleCheckbox(name, event) {
     let obj = {}; 
     obj[name] = !this.state[name];
     this.setState(obj);
  }

  render() {
    let rand = ()=> (Math.floor(Math.random() * 20) - 10);
    const modalStyle = {  position: 'fixed',  zIndex: 1040,   top: 0, bottom: 0, left: 0, right: 0 };

    const backdropStyle = {
      ...modalStyle,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };

    const dialogStyle = function() {
      let top = 50 + rand();
      let left = 50 + rand();
      return {
        position: 'absolute',
        width: 400,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
      };
    };

    return (
        <div id="responsive" className="modal hide fade" tabIndex="-1" >
          <Modal
            aria-labelledby='modal-label'
            backdropStyle={backdropStyle}
            show={this.state.showModal}
          >
          <Modal.Header>
            <Modal.Title> Modal Überschrift </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label htmlFor="question">Question:</label>
              <input className="form-control" name="question" value={this.state.question} onChange={this.handleChange.bind(this, 'question')} />

              <label htmlFor="explanation">Explanation:</label>
              <textarea className="form-control" name="explanation" value={this.state.explanation} onChange={this.handleChange.bind(this, 'explanation')}  />

              <label htmlFor="hint">Hint:</label>
              <input className="form-control" name="hint" value={this.state.hint} onChange={this.handleChange.bind(this, 'hint')} />
          
              <label htmlFor="tags">Tags:</label>
              <input className="form-control" name="tags" value={this.state.tags} onChange={this.handleChange.bind(this, 'tags')} />

              <label htmlFor="worth">Worth:</label>
              <select className="form-control" name="worth" value={this.state.worth} onChange={this.handleChange.bind(this, 'worth')}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <div>
                <label htmlFor="active">Active:</label>
                <input type="checkbox" name="active" value={this.state.active} checked={this.state.active} onChange={this.toggleCheckbox.bind(this, 'active')} />
              </div>
              <div>
                <label htmlFor="qtype">Multiple choice question:</label>
                <input type="checkbox" name="qtype" value={this.state.qtype} checked={this.state.qtype} onChange={this.toggleCheckbox.bind(this, 'qtype')} />
              </div>
             </form>
          </Modal.Body>
          <Modal.Footer>
             <Button onClick={() => browserHistory.push('/questions/'+this.props.routeParams.test_id)}>Cancel</Button>
             <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
};

QuestionModalNewComponent.propTypes = {
    backdropStyle: PropTypes.string,
    dispatch: PropTypes.func
};

const mapStateToProps = (dispatch) => {
  return {
   routeActions: bindActionCreators(routeActions, dispatch)
  }
}

// binding React-Redux
export default connect(mapStateToProps)(QuestionModalNewComponent);

