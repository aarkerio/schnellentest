'use strict'

import React, { PropTypes, Component } from 'react'
import { Link, browserHistory, withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Button } from 'react-bootstrap'
import * as TestsActionCreators from '../actions/tests'

class QuestionSearchComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
                 terms:    this.props.routeParams.terms,
                 selected: [],
                 data: [],
                 offset: 0,
                 test_id:  this.props.routeParams.test_id,
                 title: 'Test title',
                 page: 1,
                 per_page: 3
             }
    this.loadQuestions   = this.loadQuestions.bind(this);
    this.pagination      = this.pagination.bind(this);
    this.getPage         = this.getPage.bind(this);
  }

  componentWillMount() {
    if ( ! this.props.SearchArrayProp.length ) {
      this.loadQuestions();
    }
  }

  loadQuestions(){
    let action   = TestsActionCreators.searchQuestions(this.state.test_id, this.state.terms, this.state.page, this.state.per_page);
    this.props.dispatch(action);
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

  handleChange(event){
    this.setState({terms:event.target.value});
  }

  toggleCheckbox(question_id, event){
    let index = this.state.selected.indexOf(question_id);
    if (index != -1) {
      this.state.selected.splice( index, 1 );
    } else {
      this.state.selected.push(question_id);
    }
    this.setState({selected:this.state.selected});
  }

  submitSearch(e) {
    e.preventDefault();
    this.loadQuestions();
  }

  getPage(page) {
    this.setState({page: page});
    let self = this;
    setTimeout(function(){ self.loadQuestions() ; }, 1000);
  }

  pagination(){
    let total_rows = parseInt(this.props.TotalNumberProp);
    if ( total_rows < 1) { return }
    let current = this.state.page;
    let page  = 1, left = false, right = false, rows  = [];
    let first_r = 0;
    for(let x = 0;  x < total_rows; x += this.state.per_page){
      if (page > 9) {
        rows.push(page);
        right = true;
        break;
      }

      rows.push(page);
      page++;
    }
    if (this.state.page != 1 && page > 10) {
        left = true;
        first_r  = this.state.page - 1;
    }
    let last_r   = rows[rows.length - 1] + 1;

    return (
            <ul className="pagination">
              { left ? <li key={first_r}><a href={"#"+first_r} onClick={() => this.getPage(first_r)}> &lt;&lt; </a></li> : null }
              {rows.map((r) =>
                <li key={r}><a href={"#"+r} onClick={() => this.getPage(r)}>{r}</a></li>
              ) }
              { right ? <li key={last_r}><a href={"#"+last_r} onClick={() => this.getPage(last_r)}> &gt;&gt; </a></li> : null }
            </ul>
           )
  }

  render() {
    return (
        <div id="responsive">
          <h2> Search and add questions for the test: {this.state.title}</h2>
          <div>
            <Button onClick={() => this.props.router.replace('/questions/' + this.state.test_id )}>Go back</Button>
          </div>
          <div>
            <form>
              <label htmlFor="subject">Suche nach:</label>
              <input className="form-control" maxLength="30" size="30" name="subject" value={this.state.terms} onChange={this.handleChange.bind(this)} />
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
  }
}


QuestionSearchComponent.propTypes = {
  SearchArrayProp: PropTypes.array,
  TotalNumberProp: PropTypes.number
}

QuestionSearchComponent.defaultProps = {
  SearchArrayProp: [],
  TotalNumberProp: 0
}

const mapStateToProps = (state) => {
  return {
      SearchArrayProp: state.rootReducer.tests_rdcr.SearchArrayProp,
      TotalNumberProp: state.rootReducer.tests_rdcr.TotalNumberProp
  }
}

// binding React-Router-Redux
export default withRouter(connect(mapStateToProps)(QuestionSearchComponent));

