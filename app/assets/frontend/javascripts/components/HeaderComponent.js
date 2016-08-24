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
         <li><Link to="/groups/start">Zuhause</Link></li>
         <li><Link to="/appointments">Ernennungs</Link></li>
         <li><Link to="/appointment/5">Bearbeitung</Link></li>
         <li><Link to="/users">Users</Link></li>
         {this.props.children}
        </ul>
      </div>
      )
  }
}
export default HeaderComponent;
