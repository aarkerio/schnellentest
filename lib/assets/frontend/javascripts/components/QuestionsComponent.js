'use strict';
  
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import * as TestsActionCreators from '../actions/tests';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HeaderComponent    from '../components/HeaderComponent';

class QuestionsComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
               questions:  [],
               test_id: this.props.routeParams.test_id
      };
  }
     
  /**
   * Load test data and questions 
   **/
  componentWillMount() {
    if ( ! this.props.OneTestArrayProp.length ) {
      let action = TestsActionCreators.fetchOneTest( this.props.routeParams.test_id );
      this.props.dispatch(action);
    }
  }

  /**  
   * Order tests method   
   */
  orderList(field, order) {
    return field;
  }

 /**
  *  Delete Single Question
  *  Private
  */
  deleteQuestion(question_id) {
    let action = TestsActionCreators.deleteQuestion(question_id, this.state.test_id);
    this.props.dispatch(action);
    // window.location='/questions/'+this.props.routeParams.test_id;
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
      <HeaderComponent />
      <h1> {this.props.OneTestArrayProp.title} </h1>
      <div>
        <Link to={"/questionnew/"+this.state.test_id+"/"}> 
          <button type="button" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-plus"></span>
          </button>
         </Link>
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
      </div>
    )
  }
};

QuestionsComponent.propTypes = {
  OneTestArrayProp: PropTypes.object,
  QuestionsArrayProp: PropTypes.array,
  dispatch: PropTypes.func
};

QuestionsComponent.defaultProps = {
  OneTestArrayProp:  {},
  QuestionsArrayProp: []
};

const mapStateToProps = (state) => {
  return {
    OneTestArrayProp: state.rootReducer.tests_rdcr.OneTestArrayProp,
    QuestionsArrayProp: state.rootReducer.tests_rdcr.QuestionsTestArrayProp
  }
};

export default connect(mapStateToProps)(QuestionsComponent);

