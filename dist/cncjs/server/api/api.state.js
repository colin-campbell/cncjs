"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unset = exports.set = exports.get = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _deepKeys = _interopRequireDefault(require("deep-keys"));
var _configstore = _interopRequireDefault(require("../services/configstore"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var get = function get(req, res) {
  var query = req.query || {};
  if (!query.key) {
    res.send(_configstore["default"].get('state'));
    return;
  }
  var key = "state.".concat(query.key);
  if (!_configstore["default"].has(key)) {
    res.status(_constants.ERR_NOT_FOUND).send({
      msg: 'Not found'
    });
    return;
  }
  var value = _configstore["default"].get(key);
  res.send(value);
};
exports.get = get;
var unset = function unset(req, res) {
  var query = req.query || {};
  if (!query.key) {
    res.send(_configstore["default"].get('state'));
    return;
  }
  var key = "state.".concat(query.key);
  if (!_configstore["default"].has(key)) {
    res.status(_constants.ERR_NOT_FOUND).send({
      msg: 'Not found'
    });
    return;
  }
  _configstore["default"].unset(key);
  res.send({
    err: false
  });
};
exports.unset = unset;
var set = function set(req, res) {
  var query = req.query || {};
  var data = _objectSpread({}, req.body);
  if (query.key) {
    _configstore["default"].set("state.".concat(query.key), data);
    res.send({
      err: false
    });
    return;
  }
  (0, _deepKeys["default"])(data).forEach(function (key) {
    var oldValue = _configstore["default"].get("state.".concat(key));
    var newValue = (0, _get2["default"])(data, key);
    if (_typeof(oldValue) === 'object' && _typeof(newValue) === 'object') {
      _configstore["default"].set("state.".concat(key), _objectSpread(_objectSpread({}, oldValue), newValue));
    } else {
      _configstore["default"].set("state.".concat(key), newValue);
    }
  });
  res.send({
    err: false
  });
};
exports.set = set;