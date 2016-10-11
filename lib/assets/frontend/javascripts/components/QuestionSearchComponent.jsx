'use strict'

import React, { PropTypes, Component } from 'react'
import { Link, browserHistory, withRouter } from 'react-router'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'

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
                 page: 1
             }
    this.loadQuestions = this.loadQuestions.bind(this);
  }

  componentWillMount() {
    if ( ! this.props.SearchArrayProp.length ) {
      this.loadQuestions();
    }
  }

  loadQuestions(){
    let action = TestsActionCreators.searchQuestions( this.state.test_id, this.state.terms, this.state.page);
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
    let action = TestsActionCreators.searchQuestions(this.state.test_id, this.state.terms);
    this.props.dispatch(action);
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
            <ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageNum={this.state.pageNum}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                clickCallback={this.loadQuestions}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
          </div>
        </div>
     );
  }
}


QuestionSearchComponent.propTypes = {
  SearchArrayProp: PropTypes.array
}

QuestionSearchComponent.defaultProps = {
  SearchArrayProp: []
}

const mapStateToProps = (state) => {
  return {
      SearchArrayProp: state.rootReducer.tests_rdcr.SearchArrayProp
  }
}

// binding React-Router-Redux
export default withRouter(connect(mapStateToProps)(QuestionSearchComponent));

