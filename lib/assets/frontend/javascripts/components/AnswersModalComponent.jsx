'use strict'
import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import * as TestsActionCreators from '../actions/tests'
import { dialogStyle, modalConfig } from '../config/modals'
import AnswerRowComponent from './AnswerRowComponent'
import PropTypes from 'prop-types';

class AnswersModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal:   true,
                   question_id: this.props.routeParams.question_id,
                   test_id:     this.props.routeParams.test_id,
                   nactive:     true,
                   ncorrect:    false,
                   nuser_id:    0,    // not valid values
                   nanswer:     '',
                   title:       'Question'
             }
  }

  /**
   * Load question data and answers
   **/
  componentWillMount() {
    if ( ! this.props.QuestionArrayProp.length ) {
      let action = TestsActionCreators.fetchOneQuestion( this.state.question_id );
      this.props.dispatch(action);
      this.setState({title: this.props.QuestionArrayProp.question});
    }
  }

  handleChange(name, event) {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  toggleCheckbox(name, event) {
    let change = !this.state[name];
    this.setState({name: change});
  }

/**
 * Sends the data to create a new appointment
 **/
  handleSubmit(e) {
    e.preventDefault();

    let fields = { answer: {
      answer:      this.state.nanswer,
      correct:     this.state.ncorrect,
      active:      this.state.nactive,
      question_id: this.state.question_id
    }};

    let isValid = this.validatesForm(fields);

    if ( !isValid['pass'] ) {
      console.log('Question not valid: ' + isValid['message']);
    }
    let action = TestsActionCreators.createAnswer(fields);
    this.props.dispatch(action);  // thunk middleware
    this.setState({nanswer: '', ncorrect: false});
    this.loadQuestion();
  }

  /* Validates form*/
  validatesForm(fields){
    let valid = {pass: true, message: 'Not message yet'};

    if ( this.state.nanswer.length < 2) {
      valid['answer']  = false;
      valid['message'] = 'New answer lenght not valid';
    }
    return valid;
  }

  handleChange(name, event){
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  toggleCheckbox(name, event){
    let obj = {};
    obj[name] = !this.state[name];
    console.log(JSON.stringify(obj))
    this.setState(obj);
  }
  /* Lädt Fragen und Antworten wieder.**/
  loadQuestion(){
    let newcall = TestsActionCreators.fetchOneQuestion( this.state.question_id );
    setTimeout(() => { this.props.dispatch(newcall); }, 2000);
  }

 /**
  *  Delete Single Answer
  *  Private
  */
  deleteAnswer(answer_id) {
    console.log(' In parent !!! : >>>>' + answer_id);
    let action = TestsActionCreators.deleteRow(answer_id, 'answers');
    this.props.dispatch(action);
    this.loadQuestion();
  }

  render() {
    const backdropStyle = {...modalConfig};

    return (
        <div id="responsive" className="modal hide fade" tabIndex="-1" >
        <Modal
          aria-labelledby='modal-label'
          backdropStyle={backdropStyle}
          show={this.state.showModal}
        >
          <Modal.Header>
             <Modal.Title> Answers for: {this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            {this.props.AnswersArrayProp.map((answer, i) =>
              <AnswerRowComponent answer={answer} key={answer.id} keyRow={answer.id} onChange={this.deleteAnswer.bind(this)} />
            )}
          </div>
          <form>
             <label htmlFor="nanswer">Answer:</label>
             <input className="form-control" name="nanswer" value={this.state.nanswer} onChange={this.handleChange.bind(this, 'nanswer')} />

             <label htmlFor="ncorrect">This answer is correct:</label>
             <input type="checkbox" name="ncorrect" defaultChecked={this.state.ncorrect} onChange={this.toggleCheckbox.bind(this, 'ncorrect')} />

             <label htmlFor="nactive">Active:</label>
             <input type="checkbox" name="nactive" defaultChecked={this.state.nactive} onChange={this.toggleCheckbox.bind(this, 'nactive')} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => browserHistory.push('/questions/' + this.state.test_id )}>Close</Button>
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
  };
};

// binding React-Redux
export default connect(mapStateToProps)(AnswersModalComponent);

