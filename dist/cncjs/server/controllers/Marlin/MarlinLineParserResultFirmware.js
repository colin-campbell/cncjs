"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MarlinLineParserResultFirmware = /*#__PURE__*/function () {
  function MarlinLineParserResultFirmware() {
    _classCallCheck(this, MarlinLineParserResultFirmware);
  }
  _createClass(MarlinLineParserResultFirmware, null, [{
    key: "parse",
    value:
    // FIRMWARE_NAME:Marlin 1.1.0 (Github) SOURCE_CODE_URL:https://github.com/MarlinFirmware/Marlin PROTOCOL_VERSION:1.0 MACHINE_TYPE:RepRap EXTRUDER_COUNT:1 UUID:cede2a2f-41a2-4748-9b12-c55c62f367ff
    function parse(line) {
      var r = line.match(/^FIRMWARE_NAME:.*/i);
      if (!r) {
        return null;
      }
      var payload = {};
      {
        // FIRMWARE_NAME
        var _r = line.match(/FIRMWARE_NAME:([a-zA-Z\_\-]+(\s+[\d\.]+)?)/);
        if (_r) {
          payload.firmwareName = _r[1];
        }
      }
      {
        // PROTOCOL_VERSION
        var _r2 = line.match(/PROTOCOL_VERSION:([\d\.]+)/);
        if (_r2) {
          payload.protocolVersion = _r2[1];
        }
      }
      {
        // MACHINE_TYPE
        var _r3 = line.match(/MACHINE_TYPE:(\w+)/);
        if (_r3) {
          payload.machineType = _r3[1];
        }
      }
      {
        // EXTRUDER_COUNT
        var _r4 = line.match(/EXTRUDER_COUNT:(\d+)/);
        if (_r4) {
          payload.extruderCount = Number(_r4[1]);
        }
      }
      {
        // UUID
        var _r5 = line.match(/UUID:([a-zA-Z0-9\-]+)/);
        if (_r5) {
          payload.uuid = _r5[1];
        }
      }
      return {
        type: MarlinLineParserResultFirmware,
        payload: payload
      };
    }
  }]);
  return MarlinLineParserResultFirmware;
}();
var _default = MarlinLineParserResultFirmware;
exports["default"] = _default;