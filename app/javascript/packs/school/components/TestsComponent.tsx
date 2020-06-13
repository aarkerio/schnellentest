import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Chipotle
import TestRowComponent   from '../components/TestRowComponent';
import * as TestsActionCreators from '../actions/tests';

interface ObjectLiteral {
  [key: string]: any
}

interface ObjectAnswers {
  [key: string]: any
}

interface IPropTypes {
  routeParams:  ObjectLiteral
  backdropStyle: string
  QuestionHashProp: ObjectAnswers
  TestsArrayProp:  any[]
  TestsHashProp: {}
  AnswersHashProp: ObjectAnswers
  dispatch: any
  cookies: any
}

// export for unconnected component (for mocha tests)
export class TestsComponent extends React.Component<IPropTypes, any> {

  static propTypes = {
    TestsHashProp:  PropTypes.object,
    dispatch:       PropTypes.func,
    cookies:        PropTypes.object
  }

  constructor(props: any) {
    super(props);
    this.state = {
      user_id: this.props.cookies.get('user_id')
    };
    if ( ! Object.keys(this.props.TestsHashProp).length ) {
      let action = TestsActionCreators.fetchTests(this.state.user_id);
      this.props.dispatch(action);
    }
  }

  /**
   * Order tests method
   */
  orderList(field: string, order: number) {
    return field;
  }

  render() {
    let rows = [];
    this.props.TestsArrayProp.forEach(function(test) {
      rows.push(<TestRowComponent test={test} key={test.id} keyRow={test.id} />);
    });

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
    );
  }
};

const mapStateToProps = (state) => {
  return {
    TestsArrayProp: state.rootReducer.tests_rdcr.TestsArrayProp
  };
};

export default connect(mapStateToProps)(TestsComponent);
