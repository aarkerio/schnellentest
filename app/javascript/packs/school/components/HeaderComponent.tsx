import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class HeaderComponent extends React.Component<any, any> {
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

