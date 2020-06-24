import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="container">
          <h1>Error 404! Page not found. Es tut uns leid.</h1>
          <Link to="/">Zuhause</Link>
        </div>
    );
};

export default NotFound;
