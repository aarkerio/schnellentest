'use strict';

import { connect } from 'react-redux';
import { render } from 'react-dom';
import * as TestsActionCreators from '../actions/tests';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HeaderComponent    from '../components/HeaderComponent';
import TestRowComponent   from '../components/TestRowComponent';

class TestContainer extends Component {
  constructor(props) {
      super(props);
  }
    
  /**
   * Load default appointment
   **/
  componentDidMount() {
    let action = TestsActionCreators.fetchTests();
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
       rows.push(<TestRowComponent appointment={test} key={test.id} keyRow={test.id} />);
    });
    
    return (
      <div>
      <HeaderComponent />
      <div><Link to="/testnew">
            <button type="button" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
         </Link></div>
      <table className="MyClassName">
        <thead>
          <tr>
             <th style={{width: '35px', padding:0}} key='kedit'>Edit</th>
             <th style={{width: '35px', padding:0}} key='kowner'><a href="#" onClick={this.orderList.bind(this, 'owner', 'asc')}>Title</a></th>
             <th style={{width: '35px', padding:0}} key='kdate'><a href="#" onClick={this.orderList.bind(this, 'date', 'asc')}>Description</a></th>
             <th style={{width: '35px', padding:0}} key='kpetname'>Active</th>
             <th style={{width: '35px', padding:0}} key='kreason'>Shared</th>
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

TestContainer.propTypes = {
  TestsArrayProp: PropTypes.array,
  dispatch: PropTypes.func
};

 TestContainer.defaultProps = {
      TestsArrayProp:  []
 };

const mapStateToProps = (state) => {
  return {
    TestsArrayProp: state.rootReducer.test_rdcer.TestsArrayProp
  }
};

export default connect(mapStateToProps)(TestContainer);

