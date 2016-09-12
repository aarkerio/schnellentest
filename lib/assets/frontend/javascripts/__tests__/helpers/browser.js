// get the "hardcore" api
import "babel-polyfill";
var baseDOM = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
   
var jsdom = require('jsdom').jsdom('<html></html>');
   
require("../../app/assets/javascripts/bundle.js");
   
global.document = jsdom(baseDOM);
global.window = document.defaultView;

global.$ = require('jquery')(window)
global.jQuery = require('jquery')(window);
   
global.navigator = {
  userAgent: 'node.js'
};
