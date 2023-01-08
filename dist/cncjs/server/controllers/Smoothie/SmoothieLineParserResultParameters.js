"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var SmoothieLineParserResultParameters = /*#__PURE__*/function () {
  function SmoothieLineParserResultParameters() {
    _classCallCheck(this, SmoothieLineParserResultParameters);
  }
  _createClass(SmoothieLineParserResultParameters, null, [{
    key: "parse",
    value: function parse(line) {
      var r = line.match(/^\[(G54|G55|G56|G57|G58|G59|G59.1|G59.2|G59.3|G28|G30|G92|TLO|PRB):(.+)\]$/);
      if (!r) {
        return null;
      }
      var name = r[1];
      var value = r[2];
      var payload = {
        name: name,
        value: ''
      };

      // [G59:0.0000] or [G59.1:0.0000]
      var re = /^G\d+(\.\d+)?$/i;
      if (re.test(name)) {
        var axes = ['x', 'y', 'z', 'a', 'b', 'c'];
        var list = value.split(',');
        payload.value = {};
        for (var i = 0; i < list.length; ++i) {
          payload.value[axes[i]] = list[i];
        }
      }

      // [TLO:0.0000]
      if (name === 'TLO') {
        payload.value = value;
      }

      // [PRB:0.0000,0.0000,0.0000:0]
      if (name === 'PRB') {
        var _axes = ['x', 'y', 'z', 'a', 'b', 'c'];
        var _value$split = value.split(':'),
          _value$split2 = _slicedToArray(_value$split, 2),
          str = _value$split2[0],
          result = _value$split2[1];
        var _list = str.split(',');
        payload.value = {};
        payload.value.result = Number(result);
        for (var _i2 = 0; _i2 < _list.length; ++_i2) {
          payload.value[_axes[_i2]] = _list[_i2];
        }
      }
      return {
        type: SmoothieLineParserResultParameters,
        payload: payload
      };
    }
  }]);
  return SmoothieLineParserResultParameters;
}();
var _default = SmoothieLineParserResultParameters;
exports["default"] = _default;