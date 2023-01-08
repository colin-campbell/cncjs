"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.fetch = exports.download = void 0;
var _get = _interopRequireDefault(require("lodash/get"));
var _store = _interopRequireDefault(require("../store"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var upload = function upload(req, res) {
  var _req$body = req.body,
    port = _req$body.port,
    name = _req$body.name,
    gcode = _req$body.gcode,
    _req$body$context = _req$body.context,
    context = _req$body$context === void 0 ? {} : _req$body$context;
  if (!port) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'No port specified'
    });
    return;
  }
  if (!gcode) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'Empty G-code'
    });
    return;
  }
  var controller = _store["default"].get('controllers["' + port + '"]');
  if (!controller) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'Controller not found'
    });
    return;
  }

  // Load G-code
  controller.command('gcode:load', name, gcode, context, function (err, state) {
    if (err) {
      res.status(_constants.ERR_INTERNAL_SERVER_ERROR).send({
        msg: 'Failed to load G-code: ' + err
      });
      return;
    }
    res.send(_objectSpread({}, state));
  });
};
exports.upload = upload;
var fetch = function fetch(req, res) {
  var port = req.query.port;
  if (!port) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'No port specified'
    });
    return;
  }
  var controller = _store["default"].get('controllers["' + port + '"]');
  if (!controller) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'Controller not found'
    });
    return;
  }
  var sender = controller.sender;
  res.send(_objectSpread(_objectSpread({}, sender.toJSON()), {}, {
    data: sender.state.gcode
  }));
};
exports.fetch = fetch;
var download = function download(req, res) {
  var port = (0, _get["default"])(req, 'query.port') || (0, _get["default"])(req, 'body.port');
  if (!port) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'No port specified'
    });
    return;
  }
  var controller = _store["default"].get('controllers["' + port + '"]');
  if (!controller) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'Controller not found'
    });
    return;
  }
  var sender = controller.sender;
  var filename = sender.state.name || 'noname.txt';
  var content = sender.state.gcode || '';
  res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(filename));
  res.setHeader('Connection', 'close');
  res.write(content);
  res.end();
};
exports.download = download;