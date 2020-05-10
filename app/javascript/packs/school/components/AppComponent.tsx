import React from 'react';
import { withRouter, Link } from "react-router-dom";

import HeaderComponent from '../components/HeaderComponent';

import history from '../libs/history';

class AppComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="someCSSClass">
        <HeaderComponent />
        <h1>Anwendung</h1>
        <p><Link to="/">Zuhause.</Link></p>
        <div><button onClick={() => history.push('/tests')}> Zu Ernennungs </button></div>
        <p><Link to="/tests/11">Bearbeitung</Link></p>
        <p><Link to="/about">About</Link></p>
        <p><Link to="/users">Users</Link></p>
        {this.props.children}
      </div>
    );
  }
}

export default AppComponent;
module.exports = withRouter(AppComponent);

