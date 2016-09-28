// Mocha Test helper
require("babel-polyfill");
require('isomorphic-fetch');
var React  = require('react');
var Router = require('react-router');

var baseDOM = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><div id="reactroot"></div></body></html>';

var jsdom = require('jsdom').jsdom;

global.document = jsdom(baseDOM);

global.window   = document.defaultView;

if ( global.self != null) {
  console.log(' global.self >>>>> ' + global.self);
} else { 
  global.self = global.this;
}

global.jQuery = global.$ = require('jquery'); 

global.navigator = {
  userAgent: 'node.js'
};


