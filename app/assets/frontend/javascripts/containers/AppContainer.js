'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import HeaderComponent from '../components/HeaderComponent';

require('bootstrap');
require('bootstrap-webpack');

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
       <HeaderComponent />
       <h1>Anwendung</h1>
       <p><Link to="/">Zuhause.</Link></p>
       <div><button onClick={() => browserHistory.push('/tests')}>Zu Ernennungs </button></div>
       <p><Link to="/test/5">Bearbeitung</Link></p>
       <p><Link to="/about">About</Link></p>
       <p><Link to="/users">Users</Link></p>
       {this.props.children}
      </div>
      )
  }
}
export default AppContainer;
