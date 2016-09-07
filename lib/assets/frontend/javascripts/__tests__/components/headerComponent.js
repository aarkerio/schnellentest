// file: __tests__/components/HeaderComponent.js

import $ from 'jquery';
import jQuery from 'jquery';

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

var expect = require('chai').expect;
var jsdom = require('mocha-jsdom');

import HeaderComponent from "../../components/HeaderComponent";

describe('HeaderComponent', function() {
  window.$ = $;
  window.jQuery = jQuery;
  jsdom();

  before('render and locate element', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <HeaderComponent />
    );
    
    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    this.inputElement = inputComponent.getDOMNode();
  });

  it('<input> should be of type "checkbox"', function() {
    assert(this.inputElement.getAttribute('type') === 'checkbox');
  });

  it('<input> should not be checked', function() {
    assert(this.inputElement.checked === false);
  });
});
