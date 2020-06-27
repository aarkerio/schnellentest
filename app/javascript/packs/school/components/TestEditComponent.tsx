import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import * as TestActions from "../actions/tests";
import { RootRState } from "../redux/";

interface TestEditProps {
  row: number;
  match: any;
}

const TestEditComponent: React.FC<TestEditProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TestActions.getOneTest(props.match.params.uurlid));
  }, []);

  const useTest = () =>  useSelector((state: RootRState) => (state as any)); // hook

  const testObject = useTest();

  console.log("  ############  ** PROOOPS ** :  >>>> ", JSON.stringify(props.match.params.uurlid));

  const formatDate = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <div className="editTest">
      <h2>{testObject.title}</h2>

    </div>
  );
};

export default TestEditComponent;
