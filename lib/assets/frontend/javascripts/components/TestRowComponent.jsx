'use strict'

import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import * as TestsActionCreators from '../actions/tests'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

class TestRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
      isExecuting: false,
      textValues: ["Delete", "Are you sure?", "Deleting..."]
    }
  }

 /**
   *  Delete Single Test
   *  Private
   */
  deleteTest(test_id) {
    let action = TestsActionCreators.deleteRow(test_id, 'tests');
    this.props.dispatch(action);
    window.location='/tests';
  }

  render() {
    const { test, keyRow } = this.props;
    return (
      <tr key={keyRow}>
        <td style={{width: '35px', padding:0, textAlign: 'center'}}> <Link to={"/testedit/"+test.id+"/"}>  <i className="glyphicon glyphicon-pencil"></i></Link></td>
        <td style={{width: '35px', padding:0, textAlign: 'center'}}> <Link to={"/questions/"+test.id+"/"}> <i className="glyphicon glyphicon-apple"></i></Link></td>
        <td style={{width: '35px', padding:0}}> {test.title}   </td>
        <td style={{width: '35px', padding:0}}> {test.description}    </td>
        <td style={{width: '35px', padding:0, textAlign: 'center'}}> {test.created}    </td>
        <td style={{width: '35px', padding:0, textAlign: 'center'}}> {test.active} </td>
        <td style={{width: '35px', padding:0, textAlign: 'center'}}> {test.shared}  </td>
        <td style={{width: '35px', padding:0, textAlign: 'center'}}> <a href={"/tests/"+test.id+"/print.pdf"}> <i className="glyphicon glyphicon-print" alt="drucken"></i></a></td>
        <td style={{width: '35px', padding:0, textAlign:'center'}}>
          <a href="#" onClick={() => {if(confirm('Delete the item?')) {this.deleteTest(test.id)};}} className="removable"><i className="glyphicon glyphicon-trash"></i></a>
        </td>
      </tr>
    )
  }
}

TestRow.propTypes = {
  test:      PropTypes.object,
  keyRow:    PropTypes.string,
  dispatch:  PropTypes.func
}

export default connect()(TestRow)

