'use strict';
import cookie from 'react-cookie';
import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as testsActionCreators from '../actions/tests';

// Inline edition 
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags } from 'riek';

import { Button, Modal } from 'react-bootstrap';

// The Set object lets you store unique values of any type

class AnswersModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal:    true, 
                   user_id:      0,    // not valid values
                   answer:       '',
                   question_id:  this.props.routeParams.question_id,
                   active:       true,
                   correct:      true,
                   boolean:      true,
                   text:         '',            //initial prop value
                   propName:     '',            //name of the prop to return to the change function
                   change:       'handleSubmit', //function which will receive a plain object with a single key, provided in propName
                   date :        Date.now(),
                   tags:         new Set(["Bergen", "Asmara", "Göteborg", "Newcastle", "Seattle"]),
                   simulateXHR:  false,
                   XHRDelay:     450,
                   highlight:    false,
                   showSource:   false,
                   simulateXHR:  false
             };
  }


enableEditing(){
    // set your contenteditable field into editing mode.
    this.setState({ editing: true });
  }


/**
 * Sends the data to create a new appointment
 **/
  handleSubmit(e) {
    e.preventDefault();

    let fields = {
      user_id:     cookie.load('user_id'),
      answer:      this.state.answer, 
      correct:     this.state.correct,
      active:      this.state.active,
      question_id: this.state.question_id
    };
    
    let isValid = this.validatesForm(fields);

    if ( !isValid['pass'] ) {
      console.log('Question not valid: ' + isValid['message']);
    }
    let action = testsActionCreators.createQuestion(fields);
    this.props.dispatch(action);  // thunk middleware
    window.location='/questions/' + this.state.question_id;
  }

  /* Validates form*/
  validatesForm(fields){
    let valid = {pass: true, message: 'Not message yet'};
    //console.log(JSON.stringify(fields));

    if ( !this.state.question.length ) {
      valid['answer']  = false;
      valid['message']   = 'Answer not valid';
    }

    return valid;    
  }

  handleChange(name, event) 
  {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  toggleCheckbox(name, event) {
    let change = !this.state[name];
    this.setState({name: change});
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
            <div>
               <RIEToggle
                  value={this.state.boolean}
                  className={this.state.highlight ? "editable" : ""}
                  change={this.virtualServerCallback}
                  classLoading="loading"
                  propName="boolean" />
           </div>

           <form>
             <label htmlFor="answer">Answer:</label>
             <input className="form-control" name="answer" value={this.state.answer} onChange={this.handleChange.bind(this, 'answer')} />
             
             <label htmlFor="correct">This answer is correct:</label>
             <input type="checkbox" name="correct" defaultChecked={this.state.correct} onChange={this.toggleCheckbox.bind(this, 'correct')} />

             <label htmlFor="active">Active:</label>
             <input type="checkbox" name="active" defaultChecked={this.state.active} onChange={this.toggleCheckbox.bind(this, 'active')} />
             
            </form>
          </Modal.Body>
          <Modal.Footer>
             <Button onClick={() => browserHistory.push('/questions/' + this.state.question_id)}>Close</Button>
             <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
};

AnswersModalComponent.propTypes = {
    backdropStyle: PropTypes.string,
    QuestionArrayProp: PropTypes.object,
    AnswersArrayProp: PropTypes.array,
    dispatch: PropTypes.func
};

AnswersModalComponent.defaultProps = {
  QuestionArrayProp: {},
  AnswersArrayProp: []
};

const mapStateToProps = (state) => {
  return {
      QuestionArrayProp: state.rootReducer.tests_rdcr.QuestionArrayProp,
      AnswersArrayProp: state.rootReducer.tests_rdcr.AnswersArrayProp   
  }
};

// binding React-Redux
export default connect()(AnswersModalComponent);

