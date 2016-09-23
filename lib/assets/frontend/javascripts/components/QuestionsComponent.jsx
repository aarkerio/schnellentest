'use strict'
  
import cookie from 'react-cookie'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { dialogStyle, modalConfig } from '../config/modals'
import HeaderComponent  from './HeaderComponent'
import * as TestsActionCreators from '../actions/tests'
import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { Button, Modal } from 'react-bootstrap' 
import AlertContainer from 'react-alert'

class QuestionsComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
          questions:  [],
          test_id: this.props.routeParams.test_id,
          showModal:   false,
          user_id:     0,    // not valid value
          question:    '',
          explanation: '',
          hint:        '',
          tags:        '',
          worth:       1,
          active:      true,
          qtype:       true
         }

      this.alertOptions = {
          offset: 14,
          position: 'top left',
          theme: 'dark',
          time: 5000,
          transition: 'scale'
      }
      this.openModal = this.openModal.bind(this)
  }
  
  /**
   * Load test data and questions 
   **/
  componentWillMount() {
    if ( ! this.props.OneTestArrayProp.length ) {
      this.loadTest();
    }
  }
  
  loadTest() {
    let action = TestsActionCreators.fetchOneTest( this.props.routeParams.test_id );
    this.props.dispatch(action);
  }

  /**
   * Order tests method   
   */
  orderList(field, order) {
    return field;
  }

  showAlert(){
    msg.show('Question removed succesfully', {
      time: 2000,
      type: 'success',
      icon: <img src="/assets/close.png" />
    });
  }

/**
 * Sends the data to create a new appointment
 **/
  handleSubmit(e) {
    e.preventDefault()

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
    }}
    
    let isValid = this.validatesForm(fields);
    if ( !isValid['pass'] ) {
      console.log('Question not valid: ' + isValid['message']);
    }
    // save
    let action = TestsActionCreators.createQuestion(fields)
    this.props.dispatch(action);  // thunk middleware
    this.setState({showModal: false});
    this.clearForm();
    setTimeout(
        () => { this.loadTest(); },
        2000
      );
  }

  clearForm(){
    let change = {};
    let fields = { question: '',  explanation: '', hint: '', tags: '', worth: 1, active: true, qtype: true };
    Object.keys(fields).forEach(function(key) {
      change[key] = fields[key];
    });
    this.setState(change);
  }

  openModal(){
    this.setState({showModal: true})
  }

  /* Validates form*/
  validatesForm(fields){
    let valid = {pass: true, message: 'Not message yet'};
    //console.log(JSON.stringify(fields));

    if ( !this.state.question.length ) {
      valid['question']  = false;
      valid['message']   = 'Question not valid';
    }

    return valid
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

 /**
  *  Delete Single Question
  *  Private
  */
  deleteQuestion(question_id) {
    let action = TestsActionCreators.deleteQuestion(question_id, this.state.test_id);
    this.props.dispatch(action);
    this.showAlert();
    setTimeout(
        () => { this.loadTest(); },
        2000
    );
  }

  renderAnswersButton(type, id){
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
  }

  render() {
    return (
      <div className="container_div">
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
        <HeaderComponent />
        <h1> {this.props.OneTestArrayProp.title} </h1>
        <div>
          <button type="button" onClick={this.openModal} className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
        <div>
          {this.props.QuestionsArrayProp.map((q, i) =>
            <div key={i} className="questions_div">
              <div><b>Question</b>: {q.question}</div>
              <div><b>Explanation</b>: {q.explanation}</div>
              <div><b>Hint</b>: {q.hint}</div>
              <div><b>Worth</b>: {q.worth}</div>
              <div><b>Active</b>: {q.active.toString()} </div>
              <div><b>Type</b>: { q.qtype  ?  'Multiple Option' : 'Open question' } </div>
              <div className="right_button"> 
                <Link to={"/questionedit/"+q.id+"/"}>
                  <button type="button" className="btn btn-default btn-sm" title="Edit question">
                    <span className="glyphicon glyphicon-pencil"></span>
                  </button>
                </Link> 
              </div>
              { this.renderAnswersButton(q.qtype, q.id) }
              <div className="right_button">
                  <a href="#" onClick={() => {if(confirm('Delete the question?')) {this.deleteQuestion(q.id)};}} className="removable"  title="Delete question">
                    <i className="glyphicon glyphicon-trash"></i>
                  </a>
              </div>
        </div>
        )}
      </div>
      { this.props.children }
      <div id="responsive" className="modal hide fade" tabIndex="-1" >
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
             <Button onClick={() => browserHistory.push('/questions/'+this.props.routeParams.test_id)}>Cancel</Button>
             <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
    )
  }
}

QuestionsComponent.propTypes = {
  OneTestArrayProp: PropTypes.object,
  QuestionsArrayProp: PropTypes.array,
  dispatch: PropTypes.func
}

QuestionsComponent.defaultProps = {
  OneTestArrayProp:  {},
  QuestionsArrayProp: []
}

const mapStateToProps = (state) => {
  return {
    OneTestArrayProp: state.rootReducer.tests_rdcr.OneTestArrayProp,
    QuestionsArrayProp: state.rootReducer.tests_rdcr.QuestionsArrayProp
  }
}

export default connect(mapStateToProps)(QuestionsComponent);

