import Cookies from 'universal-cookie';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import * as TestActions from "../actions/tests";
import { RootRState } from "../redux/";

const TestsComponent: React.FC = () => {
  const dispatch  = useDispatch();
  const cookies   = new Cookies();
  const USER_GUID = cookies.get("guid");
  console.log("  ############  ** document.coo USER_GUID ** :  >>>> ", JSON.stringify(USER_GUID));

  useEffect(() => {
    dispatch(TestActions.loadUserTests(USER_GUID, true));
  }, []);

  const useTests = () =>  useSelector((state: RootRState) => (state as any).rootReducer.tests_rdcr.TestsArray); // hook

  const testsArray = useTests();

  const renderTests = (): React.ReactNode => {
         return testsArray?.map((row: any, rowIndex: number) => {
           return <tr key={ rowIndex }>
             <td>
               <Link to={`/tests/${row.uurlid}/edit`}>
                 <img src="/icon_edit_test.png" alt="Edit" title="Edit" />
               </Link>
             </td>
             <td>{row.title}</td>
             <td>{row.subjectId}</td>
             <td><img src="/icon_clock.png" alt={formatDate(row.createdAt)} title={formatDate(row.createdAt)} /></td>
             <td><a href="#" onClick={() => window.confirm("Are you sure you wish to delete this test?") && dispatch(TestActions.deleteTest(row.uurlid)) }>
               <img src="/icon_delete.png" alt="Delete" title="Delete" />
             </a>
             </td></tr>;
         });
  };

  const formatDate = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <div>
      <div className="records">
        <h2>Tests</h2>
        <table>
          <thead>
            <tr><td>Edit</td><td>Title</td><td>Subject</td><td>Done at</td><td>Delete</td></tr>
          </thead>
          <tbody>
            { renderTests() }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestsComponent;
