/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(global) {'use strict';\n\n// Mocha Test helper\n\n\nvar baseDOM = '<!DOCTYPE html><html><head><meta charset=\"utf-8\"></head><body><div id=\"reactroot\"></div></body></html>';\n\nvar jsdom = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"jsdom\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).jsdom;\n\nglobal.document = jsdom(baseDOM);\n\nglobal.window = document.defaultView;\n\nif (global.self != null) {\n  console.log(' global.self >>>>> ' + global.self);\n} else {\n  global.self = global.this;\n}\n\nglobal.navigator = {\n  userAgent: 'node.js'\n};\n/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./browser.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./browser.js?");

/***/ }
/******/ ]);