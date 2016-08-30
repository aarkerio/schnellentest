'use strict';

import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import * as ApposActionCreators from '../actions/appos';
//import InlineConfirmButton from 'react-inline-confirm';
//import { Button } from 'react-bootstrap';
 
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
  *  Add appointment
  *  Private
  */
  deleteAppointment(appo_id) {
    let action = ApposActionCreators.deleteAppo(appo_id);
    this.props.dispatch(action);
    console.log(' to delete appo_id: >>>>' + appo_id);
    window.location='/tests';
  }

  render() {
    const { appointment, keyRow } = this.props;
    return (
      <tr key={keyRow}>
        <td style={{width: '35px', padding:0, textAlign: 'center'}}> <Link to={"/test/"+test.id+"/"}><i className="glyphicon glyphicon-pencil"></i></Link></td>
        <td style={{width: '35px', padding:0}}> {test.title}   </td>
        <td style={{width: '35px', padding:0}}> {test.description}    </td>
        <td style={{width: '35px', padding:0}}> {test.active} </td>
        <td style={{width: '35px', padding:0}}> {test.shared}  </td>
        <td style={{width: '35px', padding:0, textAlign:'center'}}>
          <a href="#" onClick={() => {if(confirm('Delete the item?')) {this.deleteTest(test.id)};}} className="removable"><i className="glyphicon glyphicon-trash"></i></a>
        </td>
      </tr>  
    )
  }
}

AppoRow.propTypes = {
  test: PropTypes.object,
  keyRow:      PropTypes.number,
  dispatch:    PropTypes.func
}

export default connect()(AppoRow);

