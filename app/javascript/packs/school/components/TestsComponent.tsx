import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as TestActions from "../actions/tests";

const TestsComponent: React.FC = () => {

  const { execute, pending, value, error } = useAsync(TestActions.loadUserTests);
  // const counter = useSelector(state => state);

  return (
    <div>
      {value && <div>{value}</div>}
      {error && <div>{error}</div>}
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
