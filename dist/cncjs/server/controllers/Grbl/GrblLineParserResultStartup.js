"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _trim2 = _interopRequireDefault(require("lodash/trim"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var pattern = new RegExp(/^([a-zA-Z0-9]+)\s+((?:\d+\.){1,2}\d+[a-zA-Z0-9\-\.]*)([^\[]*\[[^\]]+\].*)?/);
var GrblLineParserResultStartup = /*#__PURE__*/function () {
  function GrblLineParserResultStartup() {
    _classCallCheck(this, GrblLineParserResultStartup);
  }
  _createClass(GrblLineParserResultStartup, null, [{
    key: "parse",
    value:
    // Grbl 0.9j ['$' for help]
    // Grbl 1.1d ['$' for help]
    // Grbl 1.1
    // Grbl 1.1h: LongMill build ['$' for help]
    // Grbl 1.1h ['$' for help] LongMill build Feb 25, 2020
    // gCarvin 2.0.0 ['$' for help]
    function parse(line) {
      var r = line.match(pattern);
      if (!r) {
        return null;
      }
      var firmware = r[1];
      var version = r[2];
      var message = (0, _trim2["default"])(r[3]);
      var payload = {
        firmware: firmware,
        version: version,
        message: message
      };
      return {
        type: GrblLineParserResultStartup,
        payload: payload
      };
    }
  }]);
  return GrblLineParserResultStartup;
}();
var _default = GrblLineParserResultStartup;
exports["default"] = _default;