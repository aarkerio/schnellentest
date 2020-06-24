import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { modalConfig } from '../config/modals';
import HeaderComponent  from './HeaderComponent';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { Alert, AlertContainer } from 'react-bs-notifier';
import * as TestsActionCreators from '../actions/tests';
import * as QuestionsActionCreators from '../actions/questions';

interface ObjectLiteral {
  [key: string]: any
}

interface IOwnProps {
  routeParams:     ObjectLiteral
  question: ObjectLiteral
  QuestionsArrayProp: any
  OneTestHashProp: any
  question_id: number
  dispatch: any
  cookies: any
  router: any
}
const QuestionEditComponent: React.FC<IOwnProps> = () => {

 this.state = {
   question:   [],
   question_id: this.props.routeParams.question_id,
   explanation: "",
   hint:        "",
   tags:        "",
   worth:       0,
   active:      "",
   qtype:       false,
   showModal:   false,
   change:      {},
   test_id:     0,
   terms:       ""
 };

  /**
   * Order tests method
   */
   const orderList = (field: any, order: any) => {
        return field;
   };

  const showAlert = (message: string) => {
        <AlertContainer>
          <Alert type="info"> message </Alert>
          <Alert type="success">Oh, hai</Alert>
        </AlertContainer>
  };

  /**
   * Sends the data to create a new question
   **/
  const handleSubmit = (e: any) => {
    e.preventDefault()

    let fields = {question: {
      user_id:     this.props.cookies.get('user_id'),
      question:    this.state.question,
      explanation: this.state.explanation,
      hint:        this.state.hint,
      tags:        this.state.tags,
      worth:       this.state.worth,
      active:      this.state.active,
      qtype:       this.state.qtype,
      test_id:     this.props.routeParams.test_id
    }};

    let isValid = this.validatesForm();
    if ( !isValid['pass'] ) {
      console.log('Question not valid: ' + isValid['message']);
    }
    // save
    let action = TestsActionCreators.createQuestion(fields);
    this.props.dispatch(action);  // thunk middleware
    this.setState({showModal: false});
    this.clearForm();
  };

  const clearForm = () => {
    let change = {};
    let fields = { question: '',  explanation: '', hint: '', tags: '', worth: 1, active: true, qtype: true };
    Object.keys(fields).forEach(function(key) {
      change[key] = fields[key];
    });
    this.setState(change);
  };

  const openModal = () => {
    this.setState({showModal: true});
  };

  const closeModal = () => {
    this.setState({showModal: false});
    this.clearForm();
  };

  /* Validates form*/
  const validatesForm = () => {
    let valid = {pass: true, message: 'Not message yet'};
    if ( !this.state.question.length ) {
      valid['question']  = false;
      valid['message']   = 'Question not valid';
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

  /**
   *  Delete Single Question
   *  Private
   */
  const deleteQuestion = (question_id: number) => {
    let action = TestsActionCreators.deleteQuestion(question_id, this.state.test_id);
    this.props.dispatch(action);
    this.showAlert('Question removed succesfully');
  };

  const renderAnswersButton = (type: string, id: number) => {
    if (type) {
      return (
        <div className="right_button">
          <Link to={"/answers/"+id+"/"+this.state.test_id+"/"}>
            <button type="button" className="btn btn-default btn-sm" title="Manage answers">
              <span className="glyphicon glyphicon-check"></span>
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>Open question</div>
      );
    }
  };

  const newOrder = (id: number, way: string) => {
    let action = TestsActionCreators.reorderQuestion(this.state.test_id, id, way);
    this.props.dispatch(action);
    this.showAlert('Question resorted succesfully');
  };

  const renderReorderButton = (id: number, i: number, up: boolean) => {
    if (i == 0 && up){ return null}
    if (this.props.QuestionsArrayProp.length == (i+1) && !up){ return null}
    let title = up ? 'up' : 'down';
    return (<div className="right_button">
      <button type="button" onClick={() => {this.newOrder(id, title);}} className="btn btn-default btn-sm" title={"Move question "+title}>
        <span className={"glyphicon glyphicon-"+title+"load"}></span>
      </button>
    </div>
    );
  };
  /**
   * Sends the data to create a new appointment
   **/
  const submitSearch = (e: any) => {
    e.preventDefault();
    this.props.router.replace('/search/'+ this.state.test_id + '/' + this.state.terms);
  };

  return (
      <div className="container_div">
        <AlertContainer>
          <Alert type="info">Hello, world</Alert>
          <Alert type="success">Oh, hai</Alert>
        </AlertContainer>
        <HeaderComponent />
        <h1> {this.props.OneTestHashProp.title} </h1>
        <div>
          <button type="button" onClick={this.openModal} className="btn btn-default btn-sm" title="Frage hinzüfugen">
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          <form>
            <label htmlFor="terms">Search:</label>
            <input className="form-control" name="terms" value={this.state.terms} onChange={this.handleChange.bind(this, 'terms')} />
            <Button onClick={this.submitSearch.bind(this)}>Search</Button>
          </form>
        </div>
        <div>
          {this.props.QuestionsArrayProp.map((q, i) =>
            <div key={i} className="questions_div">
              <div><b>{i+1}.- Question</b>: {q.question} -- {q.id} </div>
              <div><b>Explanation</b>: {q.explanation}</div>
              <div><b>Hint</b>: {q.hint}</div>
              <div><b>Worth</b>: {q.worth}</div>
              <div><b>Active</b>: { q.active ? 'Enabled' : 'Disabled'} </div>
              <div><b>Type</b>: { q.qtype  ?  'Multiple Option' : 'Open question' } </div>
              <div className="right_button">
                <Link to={"/questionedit/"+q.id+"/"}>
                  <button type="button" className="btn btn-default btn-sm" title="Edit question">
                    <span className="glyphicon glyphicon-pencil"></span>
                  </button>
                </Link>
              </div>

              { this.renderAnswersButton(q.qtype, q.id)  }
              { this.renderReorderButton(q.id, i, true)  }
              { this.renderReorderButton(q.id, i, false) }
              <div className="right_button">
                <button type="button" onClick={() => {if(confirm('Delete the question?')) {this.deleteQuestion(q.id);};}} className="btn btn-default btn-sm" title="Delete question">
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div id="questionform" className="modal hide fade">
          <Modal
            aria-labelledby='modal-label'
            backdropStyle={modalConfig.backdropStyle}
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
              <Button onClick={this.closeModal.bind(this)}>Cancel</Button>
              <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
}

export default QuestionEditComponent;

