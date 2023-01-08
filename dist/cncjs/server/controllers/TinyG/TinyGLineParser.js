"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _set2 = _interopRequireDefault(require("lodash/set"));
var _TinyGLineParserResultMotorTimeout = _interopRequireDefault(require("./TinyGLineParserResultMotorTimeout"));
var _TinyGLineParserResultPowerManagement = _interopRequireDefault(require("./TinyGLineParserResultPowerManagement"));
var _TinyGLineParserResultQueueReports = _interopRequireDefault(require("./TinyGLineParserResultQueueReports"));
var _TinyGLineParserResultStatusReports = _interopRequireDefault(require("./TinyGLineParserResultStatusReports"));
var _TinyGLineParserResultSystemSettings = _interopRequireDefault(require("./TinyGLineParserResultSystemSettings"));
var _TinyGLineParserResultOverrides = _interopRequireDefault(require("./TinyGLineParserResultOverrides"));
var _TinyGLineParserResultReceiveReports = _interopRequireDefault(require("./TinyGLineParserResultReceiveReports"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TinyGLineParser = /*#__PURE__*/function () {
  function TinyGLineParser() {
    _classCallCheck(this, TinyGLineParser);
  }
  _createClass(TinyGLineParser, [{
    key: "parse",
    value: function parse(data) {
      var parsers = [_TinyGLineParserResultMotorTimeout["default"], _TinyGLineParserResultPowerManagement["default"], _TinyGLineParserResultQueueReports["default"], _TinyGLineParserResultStatusReports["default"], _TinyGLineParserResultSystemSettings["default"], _TinyGLineParserResultOverrides["default"], _TinyGLineParserResultReceiveReports["default"]];
      for (var _i = 0, _parsers = parsers; _i < _parsers.length; _i++) {
        var parser = _parsers[_i];
        var result = parser.parse(data);
        if (result) {
          (0, _set2["default"])(result, 'payload.raw', data);
          (0, _set2["default"])(result, 'payload.f', data.f || []); // footer
          return result;
        }
      }
      return {
        type: null,
        payload: {
          raw: data,
          f: data.f || [] // footer
        }
      };
    }
  }]);
  return TinyGLineParser;
}();
var _default = TinyGLineParser;
exports["default"] = _default;