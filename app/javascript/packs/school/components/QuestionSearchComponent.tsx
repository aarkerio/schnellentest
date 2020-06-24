import React from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector  } from "react-redux";
import { Button } from 'react-bootstrap';
import * as TestsActionCreators from '../actions/tests';

interface IOwnProps {
  SearchArrayProp:  any[]
  routeParams: any
  dispatch: any
  router: any
  TotalNumberProp: any
}

const QuestionSearchComponent: React.FC<IOwnProps> = () => {

  if ( ! this.props.SearchArrayProp.length ) {
    this.loadQuestions();
  }
  this.state = {
    terms:    this.props.routeParams.terms,
    selected: [],
    data: [],
    offset: 0,
    test_id:  this.props.routeParams.test_id,
    title: 'Test title',
    page: 1,
    per_page: 3,
    active: false
  };
  this.loadQuestions   = this.loadQuestions.bind(this);
  this.pagination      = this.pagination.bind(this);
  this.getPage         = this.getPage.bind(this);
}

  const loadQuestions = () => {
    let action   = TestsActionCreators.searchQuestions(this.state.test_id, this.state.terms, this.state.page, this.state.per_page);
    this.props.dispatch(action);
  };

/**
 * Sends the data to create a new appointment
 **/
const handleSubmit = (e) => {
  e.preventDefault();
  let action = TestsActionCreators.addQuestions(this.state.test_id, this.state.selected);
  this.props.dispatch(action);  // thunk middleware
  this.props.router.replace('/questions/'+ this.state.test_id);
};

const handleChange = (event: any) => {
  this.setState({terms:event.target.value});
};

const toggleCheckbox = (question_id: number, event: any) => {
  let index = this.state.selected.indexOf(question_id);
  if (index != -1) {
    this.state.selected.splice( index, 1 );
  } else {
    this.state.selected.push(question_id);
  }
  this.setState({selected:this.state.selected});
};

const submitSearch = (e) => {
  e.preventDefault();
  this.loadQuestions();
};

const getPage = (page: number) => {
    this.setState({page: page});
    let self = this;
    setTimeout(function(){ self.loadQuestions() ; }, 1000);
  };

  return (
        <div id="responsive">
          <h2> Search and add questions for the test: {this.state.title}</h2>
          <div>
            <Button onClick={() => this.props.router.replace('/questions/' + this.state.test_id )}>Go back</Button>
          </div>
          <div>
            <form>
              <label htmlFor="subject">Suche nach:</label>
              <input className="form-control" maxLength={30} size={30} name="subject" value={this.state.terms} onChange={this.handleChange.bind(this)} />
              <Button onClick={this.submitSearch.bind(this)}>Search</Button>
            </form>
          </div>
          { this.props.SearchArrayProp.length ?  null : <div>No matches</div> }
          <div className="container_div">
            {this.props.SearchArrayProp.map((question, i) =>
               <div  className="container_div" key={i}> <b>{i+1}.- Question</b>:    {question.question}  {question.id}   <br />
                             <b>Explanation</b>: {question.explanation}  <br />
                             <b>Hint</b>:        {question.explanation}  <br />
                             <b>Tags</b>:        {question.tags}  <br />
                             <b>Type</b>:        {question.qtype ? 'Multiple Option' : 'Open Question' }  <br />
               <div>
                 <form>
                   Add this question: <input type="checkbox" name="active" value={question.id} checked={this.state.active} title="Add question" onChange={this.toggleCheckbox.bind(this, question.id)} />
                 </form>
               </div>
             </div>
            )}
          </div>
          <div>
            { this.state.selected.length ? <Button onClick={this.handleSubmit.bind(this)}>Save questions</Button> : null }
          </div>
          <div>
           { this.pagination() }
          </div>
        </div>
     );
};

export default withRouter(QuestionSearchComponent);

