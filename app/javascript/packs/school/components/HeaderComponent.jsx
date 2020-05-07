import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//require('bootstrap')
//require('bootstrap-webpack')

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       <ul id="nav">
         <li><Link to="/tests">Tests</Link></li>
         <li><Link to="/tests">Ernennungs</Link></li>
         <li><Link to="/tests/view/11">Bearbeitung</Link></li>
         {this.props.children}
        </ul>
      </div>
    );
  }
}
export default HeaderComponent;

