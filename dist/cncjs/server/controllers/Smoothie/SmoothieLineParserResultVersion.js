"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _set2 = _interopRequireDefault(require("lodash/set"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SmoothieLineParserResultVersion = /*#__PURE__*/function () {
  function SmoothieLineParserResultVersion() {
    _classCallCheck(this, SmoothieLineParserResultVersion);
  }
  _createClass(SmoothieLineParserResultVersion, null, [{
    key: "parse",
    value:
    // Build version: edge-3332442, Build date: xxx, MCU: LPC1769, System Clock: 120MHz
    function parse(line) {
      // LPC1768 or LPC1769 should be Smoothie
      if (line.indexOf('LPC176') < 0) {
        return null;
      }
      var payload = {};
      var r = line.match(/[a-zA-Z0-9\s]+:[^,]+/g);
      if (!r) {
        return null;
      }
      r.forEach(function (str) {
        var nv = str.match(/\s*([^:]+)\s*:\s*(.*)\s*$/);
        if (!nv) {
          return;
        }
        var _nv$slice = nv.slice(1),
          _nv$slice2 = _slicedToArray(_nv$slice, 2),
          name = _nv$slice2[0],
          value = _nv$slice2[1];

        // Build version: edge-3332442
        if (name.match(/Build version/i)) {
          (0, _set2["default"])(payload, 'build.version', value);
        }

        // Build date: Apr 22 2015 15:52:55
        if (name.match(/Build date/i)) {
          (0, _set2["default"])(payload, 'build.date', value);
        }

        // MCU: LPC1769
        if (name.match(/MCU/i)) {
          (0, _set2["default"])(payload, 'mcu', value);
        }

        // System Clock: 120MHz
        if (name.match(/System Clock/i)) {
          (0, _set2["default"])(payload, 'sysclk', value);
        }
      });

      // MCU is a required field
      if (!payload.mcu) {
        return null;
      }
      return {
        type: SmoothieLineParserResultVersion,
        payload: payload
      };
    }
  }]);
  return SmoothieLineParserResultVersion;
}();
var _default = SmoothieLineParserResultVersion;
exports["default"] = _default;