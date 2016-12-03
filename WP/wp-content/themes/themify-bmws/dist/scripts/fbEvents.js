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
	                { ref: "root", className: "fb-events" },
	                React.createElement(
	                    "div",
	                    { className: "centered-contents" },
	                    React.createElement("i", { className: "fa fa-spinner fa-pulse" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "event-list-wrapper" },
	                    React.createElement(
	                        "ul",
	                        { className: "styleless days" },
	                        _.keys(_store2.default.fbEventData).map(function (eventYyyymmdd) {
	                            return React.createElement(
	                                "li",
	                                { key: eventYyyymmdd },
	                                React.createElement(
	                                    "h2",
	                                    null,
	                                    moment(eventYyyymmdd).format("dddd DD")
	                                ),
	                                React.createElement(
	                                    "ul",
	                                    { className: "styleless day-events" },
	                                    _store2.default.fbEventData[eventYyyymmdd].map(function (fbEvent) {
	                                        var style = { backgroundImage: "url(" + fbEvent.imgUrl + ")" };

	                                        return React.createElement(
	                                            "li",
	                                            { key: fbEvent.id },
	                                            React.createElement(
	                                                "a",
	                                                { href: "https://facebook.com/" + fbEvent.id, target: "_blank" },
	                                                React.createElement("div", { className: "event-img", style: style }),
	                                                React.createElement(
	                                                    "h3",
	                                                    null,
	                                                    fbEvent.name
	                                                ),
	                                                React.createElement(
	                                                    "section",
	                                                    { className: "event-time-and-location" },
	                                                    React.createElement(
	                                                        "span",
	                                                        { className: "event-time" },
	                                                        fbEvent.startMoment.format("HH:mm")
	                                                    ),
	                                                    React.createElement(
	                                                        "span",
	                                                        { className: "time-location-separator" },
	                                                        "|"
	                                                    ),
	                                                    React.createElement(
	                                                        "span",
	                                                        { className: "event-location" },
	                                                        fbEvent.location
	                                                    )
	                                                )
	                                            )
	                                        );
	                                    })
	                                )
	                            );
	                        })
	                    )
	                )
	            );
	        },
	        componentDidMount: function componentDidMount() {
	            this._initElements();
	        },
	        componentDidUpdate: function componentDidUpdate() {
	            if (!_.isEmpty(_store2.default.fbEventData)) {
	                this.$loaderWrapper.hide();
	            }
	        },
	        _initElements: function _initElements() {
	            var $rootEl = $(ReactDOM.findDOMNode(this.refs.root));

	            this.$loaderWrapper = $rootEl.children(".centered-contents");
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
	    acfCount: 30,
	    fbEventIds: [],
	    fbEventData: {},

	    init: function init() {
	        var _this = this;

	        $(window).on("facebook:init", function () {
	            return _this._fetchFacebookEventData();
	        });
	    },
	    _fetchFacebookEventData: function _fetchFacebookEventData() {
	        var _this2 = this;

	        for (var i = 1; i <= this.acfCount; i++) {
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
	        var eventMoment = moment(fbEvent.start_time);
	        var eventYyyymmdd = parseInt(eventMoment.format("YYYYMMDD"), 10);

	        this.fbEventData[eventYyyymmdd] = this.fbEventData[eventYyyymmdd] || [];

	        // Push the event to the value array
	        this.fbEventData[eventYyyymmdd].push({
	            id: parseInt(fbEvent.id, 10),
	            name: fbEvent.name,
	            description: fbEvent.description,
	            startMoment: moment(fbEvent.start_time),
	            location: fbEvent.place ? fbEvent.place.name : null,
	            imgUrl: fbEvent.cover.source
	        });

	        // When all the events are added to the right place, reorder each array by start_time
	        var fbEventCount = 0;

	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	            for (var _iterator2 = _.values(this.fbEventData)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var _dayFbEvents = _step2.value;

	                fbEventCount += _dayFbEvents.length;
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }

	        if (fbEventCount === this.fbEventIds.length) {
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = _.values(this.fbEventData)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var dayFbEvents = _step3.value;

	                    dayFbEvents = _.sortBy(dayFbEvents, function (e) {
	                        return e.startMoment.valueOf();
	                    });
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

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