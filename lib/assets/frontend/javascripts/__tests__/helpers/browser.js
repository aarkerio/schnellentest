// Mocha Test helper
import "babel-polyfill";

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');

var baseDOM = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
   
var jsdom = require('jsdom').jsdom(baseDOM);

import configureStore from '../../configureStore';

const my_store = configureStore;

global.document = jsdom;
global.window   = document.defaultView;

global.$ = require('jquery')(window)
global.jQuery = require('jquery')(window);
   
global.navigator = {
  userAgent: 'node.js'
};

//global.self = global;

// var globalObj = global.self;
//module.exports = globalObj.fetch.bind(globalObj);


