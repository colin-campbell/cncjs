"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _set2 = _interopRequireDefault(require("lodash/set"));
var _SmoothieLineParserResultStatus = _interopRequireDefault(require("./SmoothieLineParserResultStatus"));
var _SmoothieLineParserResultOk = _interopRequireDefault(require("./SmoothieLineParserResultOk"));
var _SmoothieLineParserResultError = _interopRequireDefault(require("./SmoothieLineParserResultError"));
var _SmoothieLineParserResultAction = _interopRequireDefault(require("./SmoothieLineParserResultAction"));
var _SmoothieLineParserResultAlarm = _interopRequireDefault(require("./SmoothieLineParserResultAlarm"));
var _SmoothieLineParserResultParserState = _interopRequireDefault(require("./SmoothieLineParserResultParserState"));
var _SmoothieLineParserResultParameters = _interopRequireDefault(require("./SmoothieLineParserResultParameters"));
var _SmoothieLineParserResultVersion = _interopRequireDefault(require("./SmoothieLineParserResultVersion"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SmoothieLineParser = /*#__PURE__*/function () {
  function SmoothieLineParser() {
    _classCallCheck(this, SmoothieLineParser);
  }
  _createClass(SmoothieLineParser, [{
    key: "parse",
    value: function parse(line) {
      var parsers = [
      // <>
      _SmoothieLineParserResultStatus["default"],
      // ok
      _SmoothieLineParserResultOk["default"],
      // error:x
      _SmoothieLineParserResultError["default"],
      // action:<command>
      _SmoothieLineParserResultAction["default"],
      // ALARM:
      _SmoothieLineParserResultAlarm["default"],
      // [G38.2 G54 G17 G21 G91 G94 M0 M5 M9 T0 F20. S0.]
      _SmoothieLineParserResultParserState["default"],
      // [G54:0.000,0.000,0.000]
      // [G55:0.000,0.000,0.000]
      // [G56:0.000,0.000,0.000]
      // [G57:0.000,0.000,0.000]
      // [G58:0.000,0.000,0.000]
      // [G59:0.000,0.000,0.000]
      // [G28:0.000,0.000,0.000]
      // [G30:0.000,0.000,0.000]
      // [G92:0.000,0.000,0.000]
      // [TLO:0.000]
      // [PRB:0.000,0.000,0.000:0]
      _SmoothieLineParserResultParameters["default"],
      // Build version: edge-3332442, Build date: xxx, MCU: LPC1769, System Clock: 120MHz
      _SmoothieLineParserResultVersion["default"]];
      for (var _i = 0, _parsers = parsers; _i < _parsers.length; _i++) {
        var parser = _parsers[_i];
        var result = parser.parse(line);
        if (result) {
          (0, _set2["default"])(result, 'payload.raw', line);
          return result;
        }
      }
      return {
        type: null,
        payload: {
          raw: line
        }
      };
    }
  }]);
  return SmoothieLineParser;
}();
var _default = SmoothieLineParser;
exports["default"] = _default;