'use strict'

import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import PropTypes from 'prop-types'

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
      )
  }
}
export default HeaderComponent
