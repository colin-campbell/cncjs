"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUser = exports.authorizeIPAddress = void 0;
var _find2 = _interopRequireDefault(require("lodash/find"));
var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));
var _ensureArray = _interopRequireDefault(require("ensure-array"));
var _range_check = _interopRequireDefault(require("range_check"));
var _settings = _interopRequireDefault(require("./config/settings"));
var _configstore = _interopRequireDefault(require("./services/configstore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var whitelist = [
// IPv4 reserved space
'127.0.0.0/8',
// Used for loopback addresses to the local host
'10.0.0.0/8',
// Used for local communications within a private network
'172.16.0.0/12',
// Used for local communications within a private network
'192.168.0.0/16',
// Used for local communications within a private network
'169.254.0.0/16',
// Link-local address

// IPv4 mapped IPv6 address
'::ffff:10.0.0.0/8', '::ffff:127.0.0.0/8', '::ffff:172.16.0.0/12', '::ffff:192.168.0.0/16',
// IPv6 reserved space
'::1/128',
// loopback address to the local host
'fc00::/7',
// Unique local address
'fe80::/10' // Link-local address
];

var authorizeIPAddress = function authorizeIPAddress(ipaddr) {
  return new Promise(function (resolve, reject) {
    var pass = !!_settings["default"].allowRemoteAccess;
    pass = pass || whitelist.some(function (test) {
      return _range_check["default"].inRange(ipaddr, test);
    });
    if (pass) {
      resolve();
    } else {
      reject(new Error("Unauthorized IP address: ipaddr=".concat(ipaddr)));
    }
  });
};
exports.authorizeIPAddress = authorizeIPAddress;
var validateUser = function validateUser(user) {
  return new Promise(function (resolve, reject) {
    var _user = _objectSpread({}, user),
      _user$id = _user.id,
      id = _user$id === void 0 ? null : _user$id,
      _user$name = _user.name,
      name = _user$name === void 0 ? null : _user$name;
    var users = (0, _ensureArray["default"])(_configstore["default"].get('users')).filter(function (user) {
      return (0, _isPlainObject2["default"])(user);
    }).map(function (user) {
      return _objectSpread(_objectSpread({}, user), {}, {
        // Defaults to true if not explicitly initialized
        enabled: user.enabled !== false
      });
    });
    var enabledUsers = users.filter(function (user) {
      return user.enabled;
    });
    if (enabledUsers.length === 0 || (0, _find2["default"])(enabledUsers, {
      id: id,
      name: name
    })) {
      resolve();
    } else {
      reject(new Error("Unauthorized user: user.id=".concat(id, ", user.name=").concat(name)));
    }
  });
};
exports.validateUser = validateUser;