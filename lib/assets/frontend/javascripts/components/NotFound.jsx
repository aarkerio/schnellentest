import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class NotFound extends Component {
   
  render() {
    return (
        <div className="container">
          <h1>Error 404! Page not found. Es tut uns leid.</h1>
          <Link to="/">Zuhause</Link>
        </div>
    );
  }
}
