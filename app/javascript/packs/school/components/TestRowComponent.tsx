import React from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector  } from "react-redux";
import * as TestsActionCreators from '../actions/tests';
import PropTypes from 'prop-types';

const TestRow: React.FC<> = () => {

  /**
   *  Delete Single Test
   *  Private
   */
  const deleteTest = (test_id: number) => {
    let action = TestsActionCreators.deleteRow(test_id, 'tests');
    this.props.dispatch(action);
    window.location.href = '/tests';
  };

  const { test, keyRow } = this.props;
  return (
    <tr key={keyRow}>
      <td style={{width: '35px', padding:0, textAlign: 'center'}}> <Link to={"/testedit/"+test.id+"/"}> <button type="button" className="btn btn-secondary btn-sm">Edit</button> </Link></td>
      <td style={{width: '35px', padding:0, textAlign: 'center'}}> <Link to={"/questions/"+test.id+"/"}> <button type="button" className="btn btn-secondary btn-sm"> Questions</button> </Link></td>
      <td style={{width: '35px', padding:0}}> {test.title}   </td>
      <td style={{width: '35px', padding:0}}> {test.description}    </td>
      <td style={{width: '35px', padding:0, textAlign: 'center'}}> {test.created}    </td>
      <td style={{width: '35px', padding:0, textAlign: 'center'}}> {test.active} </td>
      <td style={{width: '35px', padding:0, textAlign: 'center'}}> {test.shared}  </td>
      <td style={{width: '35px', padding:0, textAlign: 'center'}}> <a href={"/tests/"+test.id+"/print.pdf"}> <button type="button" className="btn btn-secondary btn-sm">Print</button></a></td>
      <td style={{width: '35px', padding:0, textAlign:'center'}}>
        <a href="#" onClick={() => {if(confirm('Delete the item?')) {this.deleteTest(test.id);};}} className="removable"><button type="button" className="btn btn-secondary btn-sm">Delete</button></a>
      </td>
    </tr>
  );
};

export default TestRow;
