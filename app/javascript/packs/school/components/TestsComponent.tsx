import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as TestActions from "../actions/tests";
import { RootRState } from "../redux/";

const TestsComponent: React.FC = () => {
  const dispatch = useDispatch();

  const { execute, pending, value, error } = useAsync(TestActions.loadUserTests("5c3c999c656d82abebda3998bd1d2b90", true));
  // const getTests = useCallback(() => dispatch(TestActions.loadUserTests("5c3c999c656d82abebda3998bd1d2b90", true)), [dispatch]);

  useEffect(() => {
    dispatch(TestActions.loadUserTests("5c3c999c656d82abebda3998bd1d2b90", true));
  }, []);

  const useTests = () =>  useSelector((state: RootRState) => (state as any).rootReducer.tests_rdcr.TestsArray);

  const testsArray = useTests();

  // const counter = useSelector(state => state);

  const renderTests = (): React.ReactNode => {
         return testsArray?.map((row: any, rowIndex: number) => {
           return <tr key={ rowIndex }>
             <td>{row.title}</td><td>{row.subject_id}</td>
             <td><img src="/icon_clock.png" alt={formatDate(row.createdAt)} title={formatDate(row.createdAt)} /></td>
             <td><a href="#" onClick={() => window.confirm("Are you sure you wish to delete this test?") && dispatch(TestActions.deleteTest(row.uurlid)) }>
               <img src="/icon_delete.png" alt="Delete" title="Delete" />
             </a></td></tr>;
    });
  };

  const formatDate = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <div>
      {value && <div>{value}</div>}
      {error && <div>{error}</div>}
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
      <button onClick={execute} disabled={pending}>
        {!pending ? 'Click me' : 'Loading...'}
      </button>
    </div>
  );
};

export default TestsComponent;

// An async function for testing our hook.
// Will be successful 50% of the time.

const myFunction = () => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random() * 10;
      rnd <= 5
                ? resolve('Submitted successfully 🙌')
                : reject('Oh no there was an error 😞');
    }, 2000);
  });
};

// Hook
const useAsync = (asyncFunction) => {

  const [pending, setPending] = useState(false);
  const [value, setValue]     = useState(null);
  const [error, setError]     = useState(null);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.

  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    return asyncFunction();
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.

  useEffect(() => {
      execute();
  }, [execute]);

  return { execute, pending, value, error };
};
