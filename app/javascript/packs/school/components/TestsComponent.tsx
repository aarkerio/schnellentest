import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import TestRowComponent   from '../components/TestRowComponent';
import * as TestsActionCreators from '../actions/tests';

interface IPropTypes {
  routeParams:  any
  TestsArrayProp:  any[]
  dispatch: any
  cookies: any
}


// export for unconnected component (for mocha tests)
const TestsComponent: React.FC<IPropTypes> = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [user, setUser]        = useState<any>( cookies.get('user_id')   );
  const [records, setRecords]  = useState<any>( dispatch( TestsActionCreators.fetchTests(user) ));
  const TestsArray = [];
  /* useEffect(() => {
   *   dispatch(TestsActionCreators.loadRecords());
   * }, []);

   * const useRecords = () =>  useSelector((state: RootRState) => (state as any).rootReducer.api_rdcr.RecordsArray);

   * const RecordsArray = useRecords();
   */
  /**
   * Order tests method
   */
  const orderList = (e: any, field: any, order: any) => {
    return field;
  }
  /* {TestsArray.forEach((test) => {
   *   <TestRowComponent test={test} key={test.id} keyRow={test.id} />
   * })
   * }
   */
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
            <th style={{width: '35px', textAlign:'center', padding:0}} key='ktitle'><a href="#" onClick={orderList(this, 'title', 'asc')}>Title</a></th>
            <th style={{width: '35px', textAlign:'center', padding:0}} key='kdesc'>Description</th>
            <th style={{width: '35px', textAlign:'center', padding:0}} key='kdate'><a href="#" onClick={orderList(this, 'date', 'asc')}>Created</a></th>
            <th style={{width: '35px', textAlign:'center', padding:0}} key='kacrive'>Active</th>
            <th style={{width: '35px', textAlign:'center', padding:0}} key='kshared'>Shared</th>
            <th style={{width: '35px', textAlign:'center', padding:0}} key='kprint'>Print</th>
            <th style={{width: '35px', textAlign:'center', padding:0}} key='kdel'>Delete</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default TestsComponent;
