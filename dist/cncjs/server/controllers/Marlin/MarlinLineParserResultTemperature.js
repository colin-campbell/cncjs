"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ensureType = require("ensure-type");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MarlinLineParserResultTemperature = /*#__PURE__*/function () {
  function MarlinLineParserResultTemperature() {
    _classCallCheck(this, MarlinLineParserResultTemperature);
  }
  _createClass(MarlinLineParserResultTemperature, null, [{
    key: "parse",
    value:
    // ok T:0
    // ok T:293.0 /0.0 B:25.9 /0.0 @:0 B@:0
    // ok T:293.0 /0.0 B:25.9 /0.0 T0:293.0 /0.0 T1:100.0 /0.0 @:0 B@:0 @0:0 @1:0
    // ok T:293.0 /0.0 (0.0) B:25.9 /0.0 T0:293.0 /0.0 (0.0) T1:100.0 /0.0 (0.0) @:0 B@:0 @0:0 @1:0
    // ok T:293.0 /0.0 (0.0) B:25.9 /0.0 T0:293.0 /0.0 (0.0) T1:100.0 /0.0 (0.0) @:0 B@:0 @0:0 @1:0 W:?
    // ok T:293.0 /0.0 (0.0) B:25.9 /0.0 T0:293.0 /0.0 (0.0) T1:100.0 /0.0 (0.0) @:0 B@:0 @0:0 @1:0 W:0
    // ok T0:27.58 /0.00 B:28.27 /0.00 T0:27.58 /0.00 T1:27.37 /0.00 @:0 B@:0 @0:0 @1:0
    //  T:293.0 /0.0 B:25.9 /0.0 @:0 B@:0
    //  T:293.0 /0.0 B:25.9 /0.0 T0:293.0 /0.0 T1:100.0 /0.0 @:0 B@:0 @0:0 @1:0
    //  T:293.0 /0.0 (0.0) B:25.9 /0.0 T0:293.0 /0.0 (0.0) T1:100.0 /0.0 (0.0) @:0 B@:0 @0:0 @1:0
    //  T0:27.37 /0.00 B:28.27 /0.00 T0:27.58 /0.00 T1:27.37 /0.00 @:0 B@:0 @0:0 @1:0
    //
    // Example: When the active hot end is set to T0
    //  T:293.0 /0.0 B:25.9 /0.0 T0:293.0 /0.0 T1:100.0 /0.0 @:0 B@:0 @0:0 @1:0
    //  T0:293.0 /0.0 B:25.9 /0.0 T0:293.0 /0.0 T1:100.0 /0.0 @:0 B@:0 @0:0 @1:0
    //
    // Example: When the active hot end is set to T1
    //  T:100.0 /0.0 B:25.9 /0.0 T0:293.0 /0.0 T1:100.0 /0.0 @:0 B@:0 @0:0 @1:0
    //  T0:100.0 /0.0 B:25.9 /0.0 T0:293.0 /0.0 T1:100.0 /0.0 @:0 B@:0 @0:0 @1:0
    function parse(line) {
      var r = line.match(/^(ok)?\s+(T|T\d+):[0-9\.\-]+/i);
      if (!r) {
        return null;
      }
      var payload = {
        ok: line.startsWith('ok'),
        extruder: {},
        // active hotend
        heatedBed: {},
        hotend: {}
      };
      var re = /(?:(?:(T|B|T\d+):([0-9\.\-]+)\s+\/([0-9\.\-]+)(?:\s+\((?:[0-9\.\-]+)\))?)|(?:(@|B@|@\d+):([0-9\.\-]+))|(?:(W):(\?|[0-9]+)))/ig;
      while (r = re.exec(line)) {
        // r[1] = T, B, T0, T1
        // r[4] = @, B@, @0, @1
        // r[6] = W
        var key = r[1] || r[4] || r[6];
        {
          // Hotend temperature (T0:293.0 /0.0)
          var found = (0, _ensureType.ensureString)(key).match(/^T(\d+)$/);
          if (found) {
            var hotendIndex = parseInt(found[1], 10);
            var hotendKey = "T".concat(hotendIndex);
            payload.hotend[hotendKey] = _objectSpread(_objectSpread({}, payload.hotend[hotendKey]), {}, {
              deg: r[2],
              degTarget: r[3]
            });
            // Try to update the active hot end if the hot end index is 0.
            // Note: The active hot end might be reported as T0 before B.
            if (hotendIndex === 0) {
              var _payload$extruder$deg, _payload$extruder$deg2;
              // T0:27.37 /0.00
              payload.extruder.deg = (_payload$extruder$deg = payload.extruder.deg) !== null && _payload$extruder$deg !== void 0 ? _payload$extruder$deg : r[2];
              payload.extruder.degTarget = (_payload$extruder$deg2 = payload.extruder.degTarget) !== null && _payload$extruder$deg2 !== void 0 ? _payload$extruder$deg2 : r[3];
            }
            continue;
          }
        }
        if (key === 'T') {
          var _payload$extruder$deg3, _payload$extruder$deg4;
          // T:293.0 /0.0
          payload.extruder.deg = (_payload$extruder$deg3 = payload.extruder.deg) !== null && _payload$extruder$deg3 !== void 0 ? _payload$extruder$deg3 : r[2];
          payload.extruder.degTarget = (_payload$extruder$deg4 = payload.extruder.degTarget) !== null && _payload$extruder$deg4 !== void 0 ? _payload$extruder$deg4 : r[3];
          continue;
        }
        if (key === 'B') {
          // B:60.0 /0.0
          payload.heatedBed.deg = r[2];
          payload.heatedBed.degTarget = r[3];
          continue;
        }
        if (key === '@') {
          // @:127
          payload.extruder.power = r[5];
          continue;
        }
        if (key === 'B@') {
          // B@:127
          payload.heatedBed.power = r[5];
          continue;
        }
        {
          // Hotend power (@0:0)
          var _found = (0, _ensureType.ensureString)(key).match(/^@(\d+)$/);
          if (_found) {
            var _hotendIndex = parseInt(_found[1], 10);
            var _hotendKey = "T".concat(_hotendIndex);
            payload.hotend[_hotendKey] = _objectSpread(_objectSpread({}, payload.hotend[_hotendKey]), {}, {
              power: r[5]
            });
            continue;
          }
        }

        // M109, M190: Print temp & remaining time every 1s while waiting
        if (key === 'W') {
          // W:?, W:9, ..., W:0
          payload.wait = r[7];
          continue;
        }
      }
      return {
        type: MarlinLineParserResultTemperature,
        payload: payload
      };
    }
  }]);
  return MarlinLineParserResultTemperature;
}();
var _default = MarlinLineParserResultTemperature;
exports["default"] = _default;