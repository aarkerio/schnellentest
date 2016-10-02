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
                 terms:    this.props.routeParams.terms,
                 selected: [],
                 test_id:  this.props.routeParams.test_id
             }
  }

  componentWillMount() {
    if ( ! this.props.QuestionsArrayProp.length ) {
      let action = TestsActionCreators.searchQuestions( this.props.routeParams.test_id, this.props.routeParams.terms );
      this.props.dispatch(action);
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
    let action = TestsActionCreators.addQuestions(this.state.test_id, this.state.selected);
    this.props.dispatch(action);  // thunk middleware
    this.props.router.replace('/questions/'+ this.state.test_id);
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
    this.setState({terms:event.target.value});

  }

  toggleCheckbox(question_id, event){
    console.log('question_id >>>> ' + question_id);
    let index = this.state.selected.indexOf(question_id);
    console.log(' Index >>>> ' + index);
    if (index != -1) {
      this.state.selected.splice( index, 1 );
    } else {
      this.state.selected.push(question_id);
    }
    this.setState({selected:this.state.selected});
  }

  submitSearch(e) {
    e.preventDefault();
    let action = TestsActionCreators.searchQuestions(this.state.test_id, this.state.terms);
    this.props.dispatch(action);
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
            <Button onClick={() => browserHistory.push('/questions/' + this.state.test_id )}>Go back</Button>
          </div>
          <div>
            <form>
              <label htmlFor="subject">Suche nach:</label>
              <input className="form-control" maxLength="30" size="30" name="subject" value={this.state.terms} onChange={this.handleChange.bind(this)} />
              <Button onClick={this.submitSearch.bind(this)}>Search</Button>
            </form>
          </div>
          { this.props.QuestionsArrayProp.length ?  null : <div>No matches</div> }
          <div>
            {this.props.QuestionsArrayProp.map((question, i) =>
               <div key={i}> Question:    {question.question}  {question.id}   <br />
                             Explanation: {question.explanation}  <br />
                             Hint:        {question.explanation}  <br />
                             Tags:        {question.tags}  <br />
               <div>
                 <form>
                   <input type="checkbox" name="active" value={question.id} checked={this.state.active} title="Add question" onChange={this.toggleCheckbox.bind(this, question.id)} />
                 </form>
               </div>
             </div>
            )}
          </div>
          <div>
            { this.state.selected.length ? <Button onClick={this.handleSubmit.bind(this)}>Save questions</Button> : null }
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

