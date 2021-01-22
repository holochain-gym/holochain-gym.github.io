/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/material-components/material-components-web/blob/master/LICENSE
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["linearProgress"] = factory();
	else
		root["mdc"] = root["mdc"] || {}, root["mdc"]["linearProgress"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/mdc-linear-progress/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/mdc-animation/util.ts":
/*!****************************************!*\
  !*** ./packages/mdc-animation/util.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var cssPropertyNameMap = {
    animation: {
        prefixed: '-webkit-animation',
        standard: 'animation'
    },
    transform: {
        prefixed: '-webkit-transform',
        standard: 'transform'
    },
    transition: {
        prefixed: '-webkit-transition',
        standard: 'transition'
    }
};
var jsEventTypeMap = {
    animationend: {
        cssProperty: 'animation',
        prefixed: 'webkitAnimationEnd',
        standard: 'animationend'
    },
    animationiteration: {
        cssProperty: 'animation',
        prefixed: 'webkitAnimationIteration',
        standard: 'animationiteration'
    },
    animationstart: {
        cssProperty: 'animation',
        prefixed: 'webkitAnimationStart',
        standard: 'animationstart'
    },
    transitionend: {
        cssProperty: 'transition',
        prefixed: 'webkitTransitionEnd',
        standard: 'transitionend'
    }
};
function isWindow(windowObj) {
    return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
}
function getCorrectPropertyName(windowObj, cssProperty) {
    if (isWindow(windowObj) && cssProperty in cssPropertyNameMap) {
        var el = windowObj.document.createElement('div');
        var _a = cssPropertyNameMap[cssProperty],
            standard = _a.standard,
            prefixed = _a.prefixed;
        var isStandard = standard in el.style;
        return isStandard ? standard : prefixed;
    }
    return cssProperty;
}
exports.getCorrectPropertyName = getCorrectPropertyName;
function getCorrectEventName(windowObj, eventType) {
    if (isWindow(windowObj) && eventType in jsEventTypeMap) {
        var el = windowObj.document.createElement('div');
        var _a = jsEventTypeMap[eventType],
            standard = _a.standard,
            prefixed = _a.prefixed,
            cssProperty = _a.cssProperty;
        var isStandard = cssProperty in el.style;
        return isStandard ? standard : prefixed;
    }
    return eventType;
}
exports.getCorrectEventName = getCorrectEventName;

/***/ }),

/***/ "./packages/mdc-base/component.ts":
/*!****************************************!*\
  !*** ./packages/mdc-base/component.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var __read = this && this.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = this && this.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var foundation_1 = __webpack_require__(/*! ./foundation */ "./packages/mdc-base/foundation.ts");
var MDCComponent = /** @class */function () {
    function MDCComponent(root, foundation) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.root = root;
        this.initialize.apply(this, __spread(args));
        // Note that we initialize foundation here and not within the constructor's default param so that
        // this.root_ is defined and can be used within the foundation class.
        this.foundation = foundation === undefined ? this.getDefaultFoundation() : foundation;
        this.foundation.init();
        this.initialSyncWithDOM();
    }
    MDCComponent.attachTo = function (root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new foundation_1.MDCFoundation({}));
    };
    /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */
    MDCComponent.prototype.initialize = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        // Subclasses can override this to do any additional setup work that would be considered part of a
        // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
        // initialized. Any additional arguments besides root and foundation will be passed in here.
    };
    MDCComponent.prototype.getDefaultFoundation = function () {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    };
    MDCComponent.prototype.initialSyncWithDOM = function () {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    };
    MDCComponent.prototype.destroy = function () {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation.destroy();
    };
    MDCComponent.prototype.listen = function (evtType, handler, options) {
        this.root.addEventListener(evtType, handler, options);
    };
    MDCComponent.prototype.unlisten = function (evtType, handler, options) {
        this.root.removeEventListener(evtType, handler, options);
    };
    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
     */
    MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
        if (shouldBubble === void 0) {
            shouldBubble = false;
        }
        var evt;
        if (typeof CustomEvent === 'function') {
            evt = new CustomEvent(evtType, {
                bubbles: shouldBubble,
                detail: evtData
            });
        } else {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }
        this.root.dispatchEvent(evt);
    };
    return MDCComponent;
}();
exports.MDCComponent = MDCComponent;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
exports.default = MDCComponent;

/***/ }),

/***/ "./packages/mdc-base/foundation.ts":
/*!*****************************************!*\
  !*** ./packages/mdc-base/foundation.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var MDCFoundation = /** @class */function () {
    function MDCFoundation(adapter) {
        if (adapter === void 0) {
            adapter = {};
        }
        this.adapter = adapter;
    }
    Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function get() {
            // Classes extending MDCFoundation should implement this method to return an object which exports every
            // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "strings", {
        get: function get() {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "numbers", {
        get: function get() {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function get() {
            // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
            // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
            // validation.
            return {};
        },
        enumerable: true,
        configurable: true
    });
    MDCFoundation.prototype.init = function () {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
    };
    MDCFoundation.prototype.destroy = function () {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    };
    return MDCFoundation;
}();
exports.MDCFoundation = MDCFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
exports.default = MDCFoundation;

/***/ }),

/***/ "./packages/mdc-linear-progress/component.ts":
/*!***************************************************!*\
  !*** ./packages/mdc-linear-progress/component.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var __extends = this && this.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(/*! @material/base/component */ "./packages/mdc-base/component.ts");
var foundation_1 = __webpack_require__(/*! ./foundation */ "./packages/mdc-linear-progress/foundation.ts");
var MDCLinearProgress = /** @class */function (_super) {
    __extends(MDCLinearProgress, _super);
    function MDCLinearProgress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCLinearProgress.attachTo = function (root) {
        return new MDCLinearProgress(root);
    };
    Object.defineProperty(MDCLinearProgress.prototype, "determinate", {
        set: function set(value) {
            this.foundation.setDeterminate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCLinearProgress.prototype, "progress", {
        set: function set(value) {
            this.foundation.setProgress(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCLinearProgress.prototype, "buffer", {
        set: function set(value) {
            this.foundation.setBuffer(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCLinearProgress.prototype, "reverse", {
        set: function set(value) {
            this.foundation.setReverse(value);
        },
        enumerable: true,
        configurable: true
    });
    MDCLinearProgress.prototype.open = function () {
        this.foundation.open();
    };
    MDCLinearProgress.prototype.close = function () {
        this.foundation.close();
    };
    MDCLinearProgress.prototype.initialSyncWithDOM = function () {
        var _this = this;
        this.root.addEventListener('transitionend', function () {
            _this.foundation.handleTransitionEnd();
        });
    };
    MDCLinearProgress.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take
        // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
        // methods, we need a separate, strongly typed adapter variable.
        var adapter = {
            addClass: function addClass(className) {
                _this.root.classList.add(className);
            },
            forceLayout: function forceLayout() {
                _this.root.getBoundingClientRect();
            },
            setBufferBarStyle: function setBufferBarStyle(styleProperty, value) {
                var bufferBar = _this.root.querySelector(foundation_1.MDCLinearProgressFoundation.strings.BUFFER_BAR_SELECTOR);
                if (bufferBar) {
                    bufferBar.style.setProperty(styleProperty, value);
                }
            },
            setPrimaryBarStyle: function setPrimaryBarStyle(styleProperty, value) {
                var primaryBar = _this.root.querySelector(foundation_1.MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR);
                if (primaryBar) {
                    primaryBar.style.setProperty(styleProperty, value);
                }
            },
            hasClass: function hasClass(className) {
                return _this.root.classList.contains(className);
            },
            removeAttribute: function removeAttribute(attributeName) {
                _this.root.removeAttribute(attributeName);
            },
            removeClass: function removeClass(className) {
                _this.root.classList.remove(className);
            },
            setAttribute: function setAttribute(attributeName, value) {
                _this.root.setAttribute(attributeName, value);
            },
            setStyle: function setStyle(name, value) {
                _this.root.style.setProperty(name, value);
            },
            attachResizeObserver: function attachResizeObserver(callback) {
                if (window.ResizeObserver) {
                    var ro = new ResizeObserver(callback);
                    ro.observe(_this.root);
                    return ro;
                }
                return null;
            },
            getWidth: function getWidth() {
                return _this.root.offsetWidth;
            }
        };
        return new foundation_1.MDCLinearProgressFoundation(adapter);
    };
    return MDCLinearProgress;
}(component_1.MDCComponent);
exports.MDCLinearProgress = MDCLinearProgress;

/***/ }),

/***/ "./packages/mdc-linear-progress/constants.ts":
/*!***************************************************!*\
  !*** ./packages/mdc-linear-progress/constants.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Object.defineProperty(exports, "__esModule", { value: true });
exports.cssClasses = {
    CLOSED_CLASS: 'mdc-linear-progress--closed',
    CLOSED_ANIMATION_OFF_CLASS: 'mdc-linear-progress--closed-animation-off',
    INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
    REVERSED_CLASS: 'mdc-linear-progress--reversed',
    ANIMATION_READY_CLASS: 'mdc-linear-progress--animation-ready'
};
exports.strings = {
    ARIA_VALUENOW: 'aria-valuenow',
    BUFFER_BAR_SELECTOR: '.mdc-linear-progress__buffer-bar',
    FLEX_BASIS: 'flex-basis',
    PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar'
};
// these are percentages pulled from keyframes.scss
exports.animationDimensionPercentages = {
    PRIMARY_HALF: .8367142,
    PRIMARY_FULL: 2.00611057,
    SECONDARY_QUARTER: .37651913,
    SECONDARY_HALF: .84386165,
    SECONDARY_FULL: 1.60277782
};

/***/ }),

/***/ "./packages/mdc-linear-progress/foundation.ts":
/*!****************************************************!*\
  !*** ./packages/mdc-linear-progress/foundation.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var __extends = this && this.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = this && this.__values || function (o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(/*! @material/animation/util */ "./packages/mdc-animation/util.ts");
var foundation_1 = __webpack_require__(/*! @material/base/foundation */ "./packages/mdc-base/foundation.ts");
var constants_1 = __webpack_require__(/*! ./constants */ "./packages/mdc-linear-progress/constants.ts");
var MDCLinearProgressFoundation = /** @class */function (_super) {
    __extends(MDCLinearProgressFoundation, _super);
    function MDCLinearProgressFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCLinearProgressFoundation.defaultAdapter), adapter)) || this;
        _this.observer = null;
        return _this;
    }
    Object.defineProperty(MDCLinearProgressFoundation, "cssClasses", {
        get: function get() {
            return constants_1.cssClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCLinearProgressFoundation, "strings", {
        get: function get() {
            return constants_1.strings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCLinearProgressFoundation, "defaultAdapter", {
        get: function get() {
            return {
                addClass: function addClass() {
                    return undefined;
                },
                attachResizeObserver: function attachResizeObserver() {
                    return null;
                },
                forceLayout: function forceLayout() {
                    return undefined;
                },
                getWidth: function getWidth() {
                    return 0;
                },
                hasClass: function hasClass() {
                    return false;
                },
                setBufferBarStyle: function setBufferBarStyle() {
                    return null;
                },
                setPrimaryBarStyle: function setPrimaryBarStyle() {
                    return null;
                },
                setStyle: function setStyle() {
                    return undefined;
                },
                removeAttribute: function removeAttribute() {
                    return undefined;
                },
                removeClass: function removeClass() {
                    return undefined;
                },
                setAttribute: function setAttribute() {
                    return undefined;
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    MDCLinearProgressFoundation.prototype.init = function () {
        var _this = this;
        this.isDeterminate = !this.adapter.hasClass(constants_1.cssClasses.INDETERMINATE_CLASS);
        this.adapter.addClass(constants_1.cssClasses.ANIMATION_READY_CLASS);
        this.isReversed = this.adapter.hasClass(constants_1.cssClasses.REVERSED_CLASS);
        this.progress = 0;
        this.buffer = 1;
        this.observer = this.adapter.attachResizeObserver(function (entries) {
            var e_1, _a;
            if (_this.isDeterminate) {
                return;
            }
            try {
                for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                    var entry = entries_1_1.value;
                    if (entry.contentRect) {
                        _this.calculateAndSetDimensions(entry.contentRect.width);
                    }
                }
            } catch (e_1_1) {
                e_1 = { error: e_1_1 };
            } finally {
                try {
                    if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                } finally {
                    if (e_1) throw e_1.error;
                }
            }
        });
        if (!this.isDeterminate && this.observer) {
            this.calculateAndSetDimensions(this.adapter.getWidth());
        }
    };
    MDCLinearProgressFoundation.prototype.setDeterminate = function (isDeterminate) {
        this.isDeterminate = isDeterminate;
        if (this.isDeterminate) {
            this.adapter.removeClass(constants_1.cssClasses.INDETERMINATE_CLASS);
            this.adapter.setAttribute(constants_1.strings.ARIA_VALUENOW, this.progress.toString());
            this.setPrimaryBarProgress(this.progress);
            this.setBufferBarProgress(this.buffer);
            return;
        }
        if (this.isReversed) {
            // Adding/removing REVERSED_CLASS starts a translate animation, while
            // adding INDETERMINATE_CLASS starts a scale animation. Here, we reset
            // the translate animation in order to keep it in sync with the new
            // scale animation that will start from adding INDETERMINATE_CLASS
            // below.
            this.adapter.removeClass(constants_1.cssClasses.REVERSED_CLASS);
            this.adapter.forceLayout();
            this.adapter.addClass(constants_1.cssClasses.REVERSED_CLASS);
        }
        if (this.observer) {
            this.calculateAndSetDimensions(this.adapter.getWidth());
        }
        this.adapter.addClass(constants_1.cssClasses.INDETERMINATE_CLASS);
        this.adapter.removeAttribute(constants_1.strings.ARIA_VALUENOW);
        this.setPrimaryBarProgress(1);
        this.setBufferBarProgress(1);
    };
    MDCLinearProgressFoundation.prototype.getDeterminate = function () {
        return this.isDeterminate;
    };
    MDCLinearProgressFoundation.prototype.setProgress = function (value) {
        this.progress = value;
        if (this.isDeterminate) {
            this.setPrimaryBarProgress(value);
            this.adapter.setAttribute(constants_1.strings.ARIA_VALUENOW, value.toString());
        }
    };
    MDCLinearProgressFoundation.prototype.getProgress = function () {
        return this.progress;
    };
    MDCLinearProgressFoundation.prototype.setBuffer = function (value) {
        this.buffer = value;
        if (this.isDeterminate) {
            this.setBufferBarProgress(value);
        }
    };
    MDCLinearProgressFoundation.prototype.setReverse = function (isReversed) {
        this.isReversed = isReversed;
        if (!this.isDeterminate) {
            // Adding ANIMATION_READY_CLASS starts a scale animation, while
            // adding/removing REVERSED_CLASS starts a translate animation. Here, we
            // reset the scale animation in order to keep it in sync with the new
            // translate animation that will start from adding/removing REVERSED_CLASS
            // below.
            this.restartAnimation();
        }
        if (this.isReversed) {
            this.adapter.addClass(constants_1.cssClasses.REVERSED_CLASS);
            return;
        }
        this.adapter.removeClass(constants_1.cssClasses.REVERSED_CLASS);
    };
    MDCLinearProgressFoundation.prototype.open = function () {
        this.adapter.removeClass(constants_1.cssClasses.CLOSED_CLASS);
        this.adapter.removeClass(constants_1.cssClasses.CLOSED_ANIMATION_OFF_CLASS);
    };
    MDCLinearProgressFoundation.prototype.close = function () {
        this.adapter.addClass(constants_1.cssClasses.CLOSED_CLASS);
    };
    /**
     * Handles the transitionend event emitted after `close()` is called and the
     * opacity fades out. This is so that animations are removed only after the
     * progress indicator is completely hidden.
     */
    MDCLinearProgressFoundation.prototype.handleTransitionEnd = function () {
        if (this.adapter.hasClass(constants_1.cssClasses.CLOSED_CLASS)) {
            this.adapter.addClass(constants_1.cssClasses.CLOSED_ANIMATION_OFF_CLASS);
        }
    };
    MDCLinearProgressFoundation.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.observer) {
            this.observer.disconnect();
        }
    };
    MDCLinearProgressFoundation.prototype.setPrimaryBarProgress = function (progressValue) {
        var value = "scaleX(" + progressValue + ")";
        // Accessing `window` without a `typeof` check will throw on Node
        // environments.
        var transformProp = typeof window !== 'undefined' ? util_1.getCorrectPropertyName(window, 'transform') : 'transform';
        this.adapter.setPrimaryBarStyle(transformProp, value);
    };
    MDCLinearProgressFoundation.prototype.setBufferBarProgress = function (progressValue) {
        var value = progressValue * 100 + "%";
        this.adapter.setBufferBarStyle(constants_1.strings.FLEX_BASIS, value);
    };
    MDCLinearProgressFoundation.prototype.restartAnimation = function () {
        this.adapter.removeClass(constants_1.cssClasses.ANIMATION_READY_CLASS);
        this.adapter.forceLayout();
        this.adapter.addClass(constants_1.cssClasses.ANIMATION_READY_CLASS);
    };
    MDCLinearProgressFoundation.prototype.calculateAndSetDimensions = function (width) {
        var primaryHalf = width * constants_1.animationDimensionPercentages.PRIMARY_HALF;
        var primaryFull = width * constants_1.animationDimensionPercentages.PRIMARY_FULL;
        var secondaryQuarter = width * constants_1.animationDimensionPercentages.SECONDARY_QUARTER;
        var secondaryHalf = width * constants_1.animationDimensionPercentages.SECONDARY_HALF;
        var secondaryFull = width * constants_1.animationDimensionPercentages.SECONDARY_FULL;
        this.adapter.setStyle('--mdc-linear-progress-primary-half', primaryHalf + "px");
        this.adapter.setStyle('--mdc-linear-progress-primary-half-neg', -primaryHalf + "px");
        this.adapter.setStyle('--mdc-linear-progress-primary-full', primaryFull + "px");
        this.adapter.setStyle('--mdc-linear-progress-primary-full-neg', -primaryFull + "px");
        this.adapter.setStyle('--mdc-linear-progress-secondary-quarter', secondaryQuarter + "px");
        this.adapter.setStyle('--mdc-linear-progress-secondary-quarter-neg', -secondaryQuarter + "px");
        this.adapter.setStyle('--mdc-linear-progress-secondary-half', secondaryHalf + "px");
        this.adapter.setStyle('--mdc-linear-progress-secondary-half-neg', -secondaryHalf + "px");
        this.adapter.setStyle('--mdc-linear-progress-secondary-full', secondaryFull + "px");
        this.adapter.setStyle('--mdc-linear-progress-secondary-full-neg', -secondaryFull + "px");
        // need to restart animation for custom props to apply to keyframes
        this.restartAnimation();
    };
    return MDCLinearProgressFoundation;
}(foundation_1.MDCFoundation);
exports.MDCLinearProgressFoundation = MDCLinearProgressFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
exports.default = MDCLinearProgressFoundation;

/***/ }),

/***/ "./packages/mdc-linear-progress/index.ts":
/*!***********************************************!*\
  !*** ./packages/mdc-linear-progress/index.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./component */ "./packages/mdc-linear-progress/component.ts"));
__export(__webpack_require__(/*! ./constants */ "./packages/mdc-linear-progress/constants.ts"));
__export(__webpack_require__(/*! ./foundation */ "./packages/mdc-linear-progress/foundation.ts"));

/***/ })

/******/ });
});
//# sourceMappingURL=mdc.linearProgress.js.map