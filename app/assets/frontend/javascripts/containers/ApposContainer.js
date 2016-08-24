'use strict';

import { connect } from 'react-redux';
import { render } from 'react-dom';
import * as ApposActionCreators from '../actions/appos';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HeaderComponent    from '../components/HeaderComponent';
import AppoRowComponent   from '../components/AppoRowComponent';
import AppoModalNewComponent from '../components/AppoModalNewComponent';

class ApposContainer extends Component {
  constructor(props) {
      super(props);
  }
    
  /**
   * Load default appointment
   **/
  componentDidMount() {
    let action = ApposActionCreators.fetchAppos();
    this.props.dispatch(action);
  }

  orderList(field, order) {
    return field;
  }

  render() {
    let rows = [];
    this.props.apposArrayProp.forEach(function(appo) {
       rows.push(<AppoRowComponent appointment={appo} key={appo.id} keyRow={appo.id} />);
    });
    
    return (
      <div>
      <HeaderComponent />
      <div><Link to="/appointmentnew">
            <button type="button" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
         </Link></div>
      <table className="MyClassName">
        <thead>
          <tr>
             <th style={{width: '35px', padding:0}} key='kedit'>Edit</th>
             <th style={{width: '35px', padding:0}} key='kowner'><a href="#" onClick={this.orderList.bind(this, 'owner', 'asc')}>Owner</a></th>
             <th style={{width: '35px', padding:0}} key='kdate'><a href="#" onClick={this.orderList.bind(this, 'date', 'asc')}>Scheduled date</a></th>
             <th style={{width: '35px', padding:0}} key='kpetname'>Pet</th>
             <th style={{width: '35px', padding:0}} key='kreason'>Reason</th>
             <th style={{width: '35px', padding:0}} key='kdoctor'><a href="#" onClick={this.orderList.bind(this, 'doctor', 'asc')}>Doctor</a></th>
             <th style={{width: '35px', padding:0}} key='kdel'>Delete</th>
           </tr>
         </thead>
         <tbody>
            { rows }
          </tbody>
          </table>
          { this.props.children }
      </div>
    )
  }
};

ApposContainer.propTypes = {
  apposArrayProp: PropTypes.array,
  dispatch: PropTypes.func
};

 ApposContainer.defaultProps = {
      apposArrayProp:  []
 };

const mapStateToProps = (state) => {
  return {
    apposArrayProp: state.rootReducer.appointments_rdcer.apposArrayProp
  }
};

export default connect(mapStateToProps)(ApposContainer);

