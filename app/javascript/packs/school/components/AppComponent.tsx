import React from 'react';
import { withRouter, Link } from "react-router-dom";

import HeaderComponent from './HeaderComponent';

const AppComponent: React.FC = () => {
  return (
    <div className="someCSSClass">
      <HeaderComponent />
      <h1>Anwendung</h1>
      <p><Link to="/">Zuhause.</Link></p>
      <p><Link to="/tests/11">Bearbeitung</Link></p>
      <p><Link to="/about">About</Link></p>
      <p><Link to="/users">Users</Link></p>
    </div>
  );
};

export default withRouter(AppComponent);


