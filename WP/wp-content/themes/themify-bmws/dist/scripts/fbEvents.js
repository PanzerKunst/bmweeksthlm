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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _store = __webpack_require__(1);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var controller = {
	    init: function init() {
	        _store2.default.reactComponent = ReactDOM.render(React.createElement(this.reactComponent), document.querySelector("[role=main]"));

	        _store2.default.init();
	    },


	    reactComponent: React.createClass({
	        displayName: "reactComponent",
	        render: function render() {
	            return React.createElement(
	                "div",
	                { className: "fb-events" },
	                React.createElement(
	                    "div",
	                    { className: "event-list-wrapper" },
	                    React.createElement(
	                        "ul",
	                        { className: "styleless" },
	                        _store2.default.fbEventData.map(function (fbEvent) {
	                            return React.createElement(
	                                "li",
	                                { key: fbEvent.id },
	                                React.createElement(
	                                    "a",
	                                    { href: "https://facebook.com/" + fbEvent.id, target: "_blank" },
	                                    React.createElement(
	                                        "figure",
	                                        null,
	                                        React.createElement("img", { src: fbEvent.imgUrl })
	                                    ),
	                                    React.createElement(
	                                        "aside",
	                                        null,
	                                        React.createElement(
	                                            "h2",
	                                            null,
	                                            fbEvent.name
	                                        )
	                                    )
	                                )
	                            );
	                        })
	                    )
	                )
	            );
	        }
	    })
	};

	controller.init();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var store = {
	    fbEventIds: [],
	    fbEventData: [],

	    init: function init() {
	        var _this = this;

	        $(window).on("facebook:init", function () {
	            return _this._fetchFacebookEventData();
	        });
	    },
	    _fetchFacebookEventData: function _fetchFacebookEventData() {
	        var _this2 = this;

	        for (var i = 1; i < 11; i++) {
	            var fbEventId = this._extractFbEventIdFromAcf("fbEventShortNameAndId" + i);

	            if (fbEventId) {
	                this.fbEventIds.push(fbEventId);
	            }
	        }

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = this.fbEventIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var eventId = _step.value;

	                this._requestFbEventData(eventId, function (fbEvent) {
	                    return _this2._processFbEventData(fbEvent);
	                });
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    },
	    _processFbEventData: function _processFbEventData(fbEvent) {
	        this.fbEventData.push({
	            id: parseInt(fbEvent.id, 10),
	            name: fbEvent.name,
	            description: fbEvent.description,
	            startMoment: moment(fbEvent.start_time),
	            imgUrl: fbEvent.cover.source
	        });

	        if (this.fbEventData.length === this.fbEventIds.length) {
	            this.fbEventData = _.sortBy(this.fbEventData, function (e) {
	                return e.startMoment.valueOf();
	            });
	            this.reactComponent.forceUpdate();
	        }
	    },
	    _extractFbEventIdFromAcf: function _extractFbEventIdFromAcf(controllerDataVarName) {
	        var shortNameAndId = BM.ControllerData[controllerDataVarName];

	        if (!shortNameAndId) {
	            return null;
	        }

	        var fbEventId = shortNameAndId.substring(shortNameAndId.indexOf(";") + 1);

	        return _.isEmpty(fbEventId) ? null : parseInt(fbEventId, 10);
	    },
	    _requestFbEventData: function _requestFbEventData(fbEventId, onSuccess) {
	        FB.api("/" + fbEventId + "?fields=cover,description,start_time,name,place", {
	            access_token: "1833011923649309|77M2J2UJc9sdgYZYnzE8xx15MAc"
	        }, function (response) {
	            if (response && !response.error && _.isFunction(onSuccess)) {
	                onSuccess(response);
	            }
	        });
	    }
	};

	exports.default = store;

/***/ }
/******/ ]);