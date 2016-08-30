'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';

require('bootstrap');
require('bootstrap-webpack');

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
       <ul id="nav">
         <li><Link to="/">Zuhause</Link></li>
         <li><Link to="/tests">Ernennungs</Link></li>
         <li><Link to="/tests/view/11">Bearbeitung</Link></li>
         <li><Link to="/users">Users</Link></li>
         {this.props.children}
        </ul>
      </div>
      )
  }
}
export default HeaderComponent;
