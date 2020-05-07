import {expect} from 'chai';
import tests_rdcr from '../../reducers/tests_rdcr';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Test Reducer', () => {
  it('Should handle INCREMENT', () => {
    const initialState = {count: 0};

    const newState = reducer(initialState, {type: 'INCREMENT'});

    expect(newState).to.eql({
      count: 1
    });
  });

  it('Should handle DECREMENT', () => {
    const initialState = {count: 1};

    const newState = reducer(initialState, {type: 'DECREMENT'});

    expect(newState).to.eql({count: 0    });
    // expect(state.rootReducer.test_rdcer.oneAppo.docs[0].label).toEqual('Herrera Lalo');
  });

  // Test example with mocha and expect
  it('should dispatch action', () => {
    const initialState = {};
    const addTodo = { type: 'ADD_TODO' };

    const store = mockStore(initialState);
    store.dispatch(addTodo);

    const actions = store.getActions();

    expect(actions).toEqual([addTodo]);
  });

  // Promise test example with mocha and expect
  it('should execute promise', () => {
    function success() {
      return {
        type: 'FETCH_DATA_SUCCESS'
      };
    }

    function fetchData () {
      return dispatch => {
        return fetch('/users.json') // Some async action with promise
          .then(() => dispatch(success()));
      };
    }

    const store = mockStore({});

    // Return the promise
    return store.dispatch(fetchData())
      .then(() => {
        expect(store.getActions()[0]).toEqual(success());
      });
  });

});


