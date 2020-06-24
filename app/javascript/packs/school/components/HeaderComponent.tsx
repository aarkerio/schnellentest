import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
  return (
    <div>
      <ul id="nav">
        <li><Link to="/tests">Tests</Link></li>
        <li><Link to="/tests">Ernennungs</Link></li>
        <li><Link to="/tests/view/11">Bearbeitung</Link></li>
      </ul>
    </div>
  );
};

export default HeaderComponent;

