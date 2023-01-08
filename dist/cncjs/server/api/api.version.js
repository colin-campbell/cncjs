"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLatestVersion = void 0;
var _url = _interopRequireDefault(require("url"));
var _registryUrl = _interopRequireDefault(require("registry-url"));
var _registryAuthToken = _interopRequireDefault(require("registry-auth-token"));
var _superagent = _interopRequireDefault(require("superagent"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var pkgName = 'cncjs';
var getLatestVersion = function getLatestVersion(req, res) {
  var scope = pkgName.split('/')[0];
  var regUrl = (0, _registryUrl["default"])(scope);
  var pkgUrl = _url["default"].resolve(regUrl, encodeURIComponent(pkgName).replace(/^%40/, '@'));
  var authInfo = (0, _registryAuthToken["default"])(regUrl);
  var headers = {};
  if (authInfo) {
    headers.Authorization = "".concat(authInfo.type, " ").concat(authInfo.token);
  }
  _superagent["default"].get(pkgUrl).set(headers).end(function (err, _res) {
    if (err) {
      res.status(_constants.ERR_INTERNAL_SERVER_ERROR).send({
        msg: "Failed to connect to ".concat(pkgUrl, ": code=").concat(err.code)
      });
      return;
    }
    var _res2 = _objectSpread({}, _res),
      _res2$body = _res2.body,
      data = _res2$body === void 0 ? {} : _res2$body;
    data.time = data.time || {};
    data['dist-tags'] = data['dist-tags'] || {};
    data.versions = data.versions || {};
    var time = data.time[latest];
    var latest = data['dist-tags'].latest;
    var _data$versions$latest = _objectSpread({}, data.versions[latest]),
      name = _data$versions$latest.name,
      version = _data$versions$latest.version,
      description = _data$versions$latest.description,
      homepage = _data$versions$latest.homepage;
    res.send({
      time: time,
      name: name,
      version: version,
      description: description,
      homepage: homepage
    });
  });
};
exports.getLatestVersion = getLatestVersion;