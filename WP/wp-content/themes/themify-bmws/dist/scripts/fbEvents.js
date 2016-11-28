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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var controller = {
	    init: function init() {
	        ReactDOM.render(React.createElement(this.reactComponent), document.querySelector("[role=main]"));
	    },


	    reactComponent: React.createClass({
	        displayName: "reactComponent",
	        render: function render() {
	            return React.createElement(
	                "div",
	                { id: "content" },
	                "Hello React!"
	            );
	        },
	        componentDidMount: function componentDidMount() {
	            var _this = this;

	            $(window).on("facebook:init", function () {
	                return _this._fbRequest();
	            });
	        },
	        _fbRequest: function _fbRequest() {

	            // TODO
	            FB.api("/653056831543408?fields=cover,description,start_time,name,place", {
	                access_token: "1833011923649309|77M2J2UJc9sdgYZYnzE8xx15MAc"
	            }, function (response) {
	                if (response && !response.error) {
	                    console.log("FB reponse", response);
	                }
	            });
	        }
	    })
	};

	controller.init();

/***/ }
/******/ ]);