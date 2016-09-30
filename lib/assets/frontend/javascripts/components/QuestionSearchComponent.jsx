'use strict'

import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as TestsActionCreators from '../actions/tests'

class QuestionSearchComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
                 subject:  '',
                 selected: [],
                 test_id:  this.props.routeParams.test_id
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

  handleChange(event){
    this.setState({subject:event.target.value});
    let action = TestsActionCreators.searchQuestions(this.state.test_id, this.state.subject);
    this.props.dispatch(action);
  }

  toggleCheckbox(name, event){
    let obj = {}; 
    obj[name] = !this.state[name];
    console.log(JSON.stringify(obj))
    this.setState(obj);
  }

 /**
  *  Delete Single Answer
  *  Private
  */
  deleteAnswer(answer_id) {
    console.log(' In parent !!! : >>>>' + answer_id);
    let action = TestsActionCreators.deleteRow(answer_id, 'answers');
    this.props.dispatch(action);
  }

  render() {
    return (
        <div id="responsive">
          <h2> Search questions for: {this.state.title}</h2>
          <div>
            <form>
              <label htmlFor="subject">Suche nach:</label>
              <input className="form-control" maxLength="30" size="30" name="subject" value={this.state.subject} onChange={this.handleChange.bind(this)} />
            </form>
          </div>
          <div>
            {this.props.QuestionsArrayProp.map((question, i) =>
               <div key={i}>{question.question}</div>
            )}
          </div>
          <div>
            <Button onClick={() => browserHistory.push('/questions/' + this.state.test_id )}>Go back</Button>
          </div>
          <div>
            { this.state.selected.length ? <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button> : null }
          </div>
        </div>
     );
  }
};

// <AnswerRowComponent answer={answer} key={answer.id} keyRow={answer.id} onChange={this.handleSubmit.bind(this)} />

QuestionSearchComponent.propTypes = {
  QuestionsArrayProp: PropTypes.array
};

QuestionSearchComponent.defaultProps = {
  QuestionsArrayProp: []
};

const mapStateToProps = (state) => {
  return {
      QuestionsArrayProp: state.rootReducer.tests_rdcr.QuestionsArrayProp
  };
};

// binding React-Redux
export default connect(mapStateToProps)(QuestionSearchComponent);

