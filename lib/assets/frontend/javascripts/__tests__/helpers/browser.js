// Mocha Test helper
import "babel-polyfill";
require('whatwg-fetch'); // the whatwg-fetch polyfill installs the fetch() function on the global object (window or self)
require('isomorphic-fetch');

import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

var baseDOM = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
   
global.document = jsdom;

var jsdom = require('jsdom').jsdom;

global.document = jsdom(baseDOM);

global.window   = document.defaultView;
//global.fetch = Fetch;
//global.self = global;
console.log( 'FETCH at Global >>>>> ' + global.window);

if ( global.self != null) {
  console.log(' global.self >>>>> ' + global.self);
} else { 
  global.self = global.this;
}

// global.$ = require('jquery')(window)
// global.jQuery = require('jquery')(window);

// global.fetch = require('isomorphic-fetch');

global.navigator = {
  userAgent: 'node.js'
};

// if (  self == null ) {
//  self = global; 
// }


// var globalObj = global.self;
//module.exports = globalObj.fetch.bind(globalObj);


