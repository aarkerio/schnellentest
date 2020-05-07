import React, { Component } from 'react';
import history from '../libs/history';

import HeaderComponent from '../components/HeaderComponent';
// require('bootstrap');
// require('bootstrap-webpack');

class AppContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="someCSSClass">
        <HeaderComponent />
        <h1>Anwendung</h1>
        <p><Link to="/">Zuhause.</Link></p>
        <div><button onClick={() => hstory.push('/tests')}> Zu Ernennungs </button></div>
        <p><Link to="/tests/11">Bearbeitung</Link></p>
        <p><Link to="/about">About</Link></p>
        <p><Link to="/users">Users</Link></p>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
module.exports = withRouter(AppContainer);

