// get the "hardcore" api
import "babel-polyfill";

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

