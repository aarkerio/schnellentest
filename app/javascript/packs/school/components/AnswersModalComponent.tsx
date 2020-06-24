import React from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector  } from "react-redux";
import { Button, Modal } from 'react-bootstrap';
import { modalConfig } from '../config/modals';
import AnswerRowComponent from './AnswerRowComponent';
import PropTypes from 'prop-types';
import history from '../libs/history';
import * as TestsActionCreators from '../actions/tests';

interface ObjectLiteral {
  [key: string]: any
}

interface ObjectAnswers {
  [key: string]: any
}

interface IAnswersModalComponentProps {
  routeParams:  ObjectLiteral
  backdropStyle: string
  QuestionHashProp: ObjectAnswers
  AnswersHashProp: ObjectAnswers
  dispatch: any
}

const AnswersModalComponent: React.FC<IAnswersModalComponentProps> = () => {

  const backdropStyle = {...modalConfig};
  this.state = { showModal:   true,
                 question_id: this.props.routeParams.question_id,
                 test_id:     this.props.routeParams.test_id,
                 nactive:     true,
                 ncorrect:    false,
                 nuser_id:    0,    // not valid values
                 nanswer:     '',
                 title:       'Question'
  };
  if ( ! this.props.QuestionHashProp.length ) {
      let action = TestsActionCreators.fetchOneQuestion( this.state.question_id );
      this.props.dispatch(action);
      this.setState({title: this.props.QuestionHashProp.question});
    }


/**
 * Sends the data to create a new appointment
 **/
  const handleSubmit= (e: any) => {
    e.preventDefault();

    let fields = { answer: {
      answer:      this.state.nanswer,
      correct:     this.state.ncorrect,
      active:      this.state.nactive,
      question_id: this.state.question_id
    }};

    let isValid = this.validatesForm();

    if ( !isValid['pass'] ) {
      console.log('Question not valid: ' + isValid['message']);
    }
    let action = TestsActionCreators.createAnswer(fields);
    this.props.dispatch(action);  // thunk middleware
    this.setState({nanswer: '', ncorrect: false});
    this.loadQuestion();
  };

  /* Validates form*/
  const validatesForm = () => {
    let valid = {pass: true, message: 'Not message yet'};

    if ( this.state.nanswer.length < 2) {
      valid['answer']  = false;
      valid['message'] = 'New answer lenght not valid';
    }
    return valid;
  };

  const handleChange = (name: string, event: any) => {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  };

  const toggleCheckbox = (name: string, event: any) => {
    let obj = {};
    obj[name] = !this.state[name];
    this.setState(obj);
  };

  /* Lädt Fragen und Antworten wieder.**/
  const loadQuestion = () => {
    let newcall = TestsActionCreators.fetchOneQuestion( this.state.question_id );
    setTimeout(() => { this.props.dispatch(newcall); }, 2000);
  };

 /**
  *  Delete Single Answer
  *  Private
  */
  const deleteAnswer = (answer_id: number) => {
    let action = TestsActionCreators.deleteRow(answer_id, 'answers');
    this.props.dispatch(action);
    this.loadQuestion();
  };

  /* {this.props.AnswersHashProp.forEach((answer, i) =>
   *   <AnswerRowComponent answer={answer} key={answer.id} keyRow={answer.id} onChange={this.deleteAnswer.bind(this)} />
   * )}
   */

  return (
    <div id="responsive" className="modal hide fade">
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
          <Button onClick={() => history.push('/questions/' + this.state.test_id )}>Close</Button>
          <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnswersModalComponent;

