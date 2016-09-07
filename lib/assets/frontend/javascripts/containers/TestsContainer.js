'use strict';

import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import * as TestsActionCreators from '../actions/tests';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HeaderComponent    from '../components/HeaderComponent';
import TestRowComponent   from '../components/TestRowComponent';

class TestsContainer extends Component {
  constructor(props) {
      super(props);
  }
    
  /**
   * Load default appointment
   **/
  componentWillMount() {
    let action = TestsActionCreators.fetchTests(cookie.load('user_id'));
    this.props.dispatch(action);
  }

  /**  
   * Order tests method   
   */
  orderList(field, order) {
    return field;
  }

  render() {
    let rows = [];
    this.props.TestsArrayProp.forEach(function(test) {
       rows.push(<TestRowComponent test={test} key={test.id} keyRow={test.id} />);
    });
    
    return (
      <div className="container_div">
      <HeaderComponent />
      <div><Link to="/testnew">
            <button type="button" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
         </Link></div>
      <table className="table_class">
        <thead>
          <tr>
             <th style={{width: '35px', padding:0}} key='kedit'>Edit</th>
             <th style={{width: '35px', padding:0}} key='kquestions'>Questions</th>
             <th style={{width: '35px', padding:0}} key='ktitle'><a href="#" onClick={this.orderList.bind(this, 'title', 'asc')}>Title</a></th>
             <th style={{width: '35px', padding:0}} key='kdesc'>Description</th>
             <th style={{width: '35px', padding:0}} key='kdate'><a href="#" onClick={this.orderList.bind(this, 'date', 'asc')}>Created</a></th>
             <th style={{width: '35px', padding:0}} key='kacrive'>Active</th>
             <th style={{width: '35px', padding:0}} key='kshared'>Shared</th>
             <th style={{width: '35px', padding:0}} key='kdel'>Delete</th>
           </tr>
         </thead>
         <tbody>
            { rows }
          </tbody>
          </table>
          { this.props.children }
      </div>
    )
  }
};

TestsContainer.propTypes = {
  TestsArrayProp: PropTypes.array,
  dispatch: PropTypes.func
};

 TestsContainer.defaultProps = {
      TestsArrayProp:  []
 };

const mapStateToProps = (state) => {
  return {
    TestsArrayProp: state.rootReducer.tests_rdcr.TestsArrayProp
  }
};

export default connect(mapStateToProps)(TestsContainer);

