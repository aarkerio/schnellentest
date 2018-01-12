'use strict'

import { connect } from 'react-redux'
import { render } from 'react-dom'
import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'

// Chipotle
import TestRowComponent   from '../components/TestRowComponent'
import * as TestsActionCreators from '../actions/tests'

// export for unconnected component (for mocha tests)
export class TestsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user_id: this.props.cookies.get('user_id')
    }
  }

  /**
   * Load tests
   **/
  componentWillMount() {
    if ( ! this.props.TestsArrayProp.length ) {
      let action = TestsActionCreators.fetchTests(this.state.user_id)
      this.props.dispatch(action)
    }
  }

  /**
   * Order tests method
   */
  orderList(field, order) {
    return field;
  }

  render() {
    let rows = []
    this.props.TestsArrayProp.forEach(function(test) {
       rows.push(<TestRowComponent test={test} key={test.id} keyRow={test.id} />)
    })

    return (
      <div className="container_div">
      <div>
        <Link to="/testnew">
          <button type="button" className="btn btn-primary">
            New Test
          </button>
        </Link>
      </div>
      <table className="table_class">
        <thead>
          <tr>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='kedit'>Edit</th>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='kquestions'>Questions</th>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='ktitle'><a href="#" onClick={this.orderList.bind(this, 'title', 'asc')}>Title</a></th>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='kdesc'>Description</th>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='kdate'><a href="#" onClick={this.orderList.bind(this, 'date', 'asc')}>Created</a></th>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='kacrive'>Active</th>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='kshared'>Shared</th>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='kprint'>Print</th>
             <th style={{width: '35px', textAlign:'center', padding:0}} key='kdel'>Delete</th>
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
  dispatch:       PropTypes.func,
  cookies:        PropTypes.object
}

TestsContainer.defaultProps = {
    TestsArrayProp:  [],
    cookies: new Cookies
}

const mapStateToProps = (state) => {
  return {
    TestsArrayProp: state.rootReducer.tests_rdcr.TestsArrayProp
  }
}

export default connect(mapStateToProps)(TestsContainer)

