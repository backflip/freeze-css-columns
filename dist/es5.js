window["FreezeCssColumns"] =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FreezeCssColumns = function () {
  function FreezeCssColumns(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      marginTopFallback: '100em'
    };

    _classCallCheck(this, FreezeCssColumns);

    this.element = element;
    this.options = options;

    this.isEngaged = false;

    this.children = [].slice.call(this.element.childNodes).filter(function (node) {
      return node.nodeType === 1;
    });
    this.initialDisplayStyle = this.element.style.display;

    // Save children's initial styles to be able to reset them later
    this.initialChildrenStyles = this.children.map(function (child) {
      return child.style;
    });
  }

  // Fix columns


  _createClass(FreezeCssColumns, [{
    key: 'engage',
    value: function engage() {
      var _this = this;

      var currentOffset = null;

      // Reset styles to allow for proper reflow on resize
      this.disengage();

      // Loop through items and find first item in every new column
      this.children.forEach(function (child) {
        var childOffset = child.offsetLeft;

        // First column
        if (currentOffset === null) {
          currentOffset = childOffset;
          // New column
        } else if (childOffset > currentOffset) {
          // Add break-before
          child.style.breakBefore = 'column';

          // Add margin-top fallback if break-before is not supported
          if (!window.getComputedStyle(child).breakBefore) {
            child.style.marginTop = _this.options.marginTopFallback;
          }

          // Keep new column as reference
          currentOffset = childOffset;
        }
      });

      // Force column redraw in order for "break-before" to take effect
      this.redraw();

      // Save state
      this.isEngaged = true;
    }

    // Unfix columns

  }, {
    key: 'disengage',
    value: function disengage() {
      var _this2 = this;

      // Reset styles to allow for proper reflow on resize
      this.children.forEach(function (child, i) {
        child.style = _this2.initialChildrenStyles[i];
      });

      this.redraw();

      this.isEngaged = false;
    }

    // Reflow on resize, e.g.

  }, {
    key: 'update',
    value: function update() {
      if (!this.isEngaged) {
        return;
      }

      this.engage();
    }

    // Force column redraw

  }, {
    key: 'redraw',
    value: function redraw() {
      this.element.style.display = 'none';
      void this.element.offsetHeight;
      this.element.style.display = this.initialDisplayStyle;
    }
  }]);

  return FreezeCssColumns;
}();

exports.default = FreezeCssColumns;
module.exports = exports['default'];

/***/ })
/******/ ]);