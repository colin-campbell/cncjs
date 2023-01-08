"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.read = exports.fetch = exports.create = exports.__delete = void 0;
var _find = _interopRequireDefault(require("lodash/find"));
var _castArray = _interopRequireDefault(require("lodash/castArray"));
var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));
var _uuid = _interopRequireDefault(require("uuid"));
var _settings = _interopRequireDefault(require("../config/settings"));
var _logger = _interopRequireDefault(require("../lib/logger"));
var _configstore = _interopRequireDefault(require("../services/configstore"));
var _paging = require("./paging");
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var log = (0, _logger["default"])('api:macros');
var CONFIG_KEY = 'macros';
var getSanitizedRecords = function getSanitizedRecords() {
  var records = (0, _castArray["default"])(_configstore["default"].get(CONFIG_KEY, []));
  var shouldUpdate = false;
  for (var i = 0; i < records.length; ++i) {
    if (!(0, _isPlainObject["default"])(records[i])) {
      records[i] = {};
    }
    var record = records[i];
    if (!record.id) {
      record.id = _uuid["default"].v4();
      shouldUpdate = true;
    }
  }
  if (shouldUpdate) {
    log.debug("update sanitized records: ".concat(JSON.stringify(records)));

    // Pass `{ silent changes }` will suppress the change event
    _configstore["default"].set(CONFIG_KEY, records, {
      silent: true
    });
  }
  return records;
};
var fetch = function fetch(req, res) {
  var records = getSanitizedRecords();
  var paging = !!req.query.paging;
  if (paging) {
    var _req$query = req.query,
      _req$query$page = _req$query.page,
      page = _req$query$page === void 0 ? 1 : _req$query$page,
      _req$query$pageLength = _req$query.pageLength,
      pageLength = _req$query$pageLength === void 0 ? 10 : _req$query$pageLength;
    var totalRecords = records.length;
    var _getPagingRange = (0, _paging.getPagingRange)({
        page: page,
        pageLength: pageLength,
        totalRecords: totalRecords
      }),
      _getPagingRange2 = _slicedToArray(_getPagingRange, 2),
      begin = _getPagingRange2[0],
      end = _getPagingRange2[1];
    var pagedRecords = records.slice(begin, end);
    res.send({
      pagination: {
        page: Number(page),
        pageLength: Number(pageLength),
        totalRecords: Number(totalRecords)
      },
      records: pagedRecords.map(function (record) {
        var _record = _objectSpread({}, record),
          id = _record.id,
          mtime = _record.mtime,
          name = _record.name,
          content = _record.content;
        return {
          id: id,
          mtime: mtime,
          name: name,
          content: content
        };
      })
    });
  } else {
    res.send({
      records: records.map(function (record) {
        var _record2 = _objectSpread({}, record),
          id = _record2.id,
          mtime = _record2.mtime,
          name = _record2.name,
          content = _record2.content;
        return {
          id: id,
          mtime: mtime,
          name: name,
          content: content
        };
      })
    });
  }
};
exports.fetch = fetch;
var create = function create(req, res) {
  var _req$body = _objectSpread({}, req.body),
    name = _req$body.name,
    content = _req$body.content;
  if (!name) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'The "name" parameter must not be empty'
    });
    return;
  }
  if (!content) {
    res.status(_constants.ERR_BAD_REQUEST).send({
      msg: 'The "content" parameter must not be empty'
    });
    return;
  }
  try {
    var records = getSanitizedRecords();
    var record = {
      id: _uuid["default"].v4(),
      mtime: new Date().getTime(),
      name: name,
      content: content
    };
    records.push(record);
    _configstore["default"].set(CONFIG_KEY, records);
    res.send({
      err: null
    });
  } catch (err) {
    res.status(_constants.ERR_INTERNAL_SERVER_ERROR).send({
      msg: 'Failed to save ' + JSON.stringify(_settings["default"].rcfile)
    });
  }
};
exports.create = create;
var read = function read(req, res) {
  var id = req.params.id;
  var records = getSanitizedRecords();
  var record = (0, _find["default"])(records, {
    id: id
  });
  if (!record) {
    res.status(_constants.ERR_NOT_FOUND).send({
      msg: 'Not found'
    });
    return;
  }
  var _record3 = _objectSpread({}, record),
    mtime = _record3.mtime,
    name = _record3.name,
    content = _record3.content;
  res.send({
    id: id,
    mtime: mtime,
    name: name,
    content: content
  });
};
exports.read = read;
var update = function update(req, res) {
  var id = req.params.id;
  var records = getSanitizedRecords();
  var record = (0, _find["default"])(records, {
    id: id
  });
  if (!record) {
    res.status(_constants.ERR_NOT_FOUND).send({
      msg: 'Not found'
    });
    return;
  }
  var _req$body2 = _objectSpread({}, req.body),
    _req$body2$name = _req$body2.name,
    name = _req$body2$name === void 0 ? record.name : _req$body2$name,
    _req$body2$content = _req$body2.content,
    content = _req$body2$content === void 0 ? record.content : _req$body2$content;

  /*
  if (!name) {
      res.status(ERR_BAD_REQUEST).send({
          msg: 'The "name" parameter must not be empty'
      });
      return;
  }
   if (!content) {
      res.status(ERR_BAD_REQUEST).send({
          msg: 'The "content" parameter must not be empty'
      });
      return;
  }
  */

  try {
    record.mtime = new Date().getTime();
    record.name = String(name || '');
    record.content = String(content || '');
    _configstore["default"].set(CONFIG_KEY, records);
    res.send({
      err: null
    });
  } catch (err) {
    res.status(_constants.ERR_INTERNAL_SERVER_ERROR).send({
      msg: 'Failed to save ' + JSON.stringify(_settings["default"].rcfile)
    });
  }
};
exports.update = update;
var __delete = function __delete(req, res) {
  var id = req.params.id;
  var records = getSanitizedRecords();
  var record = (0, _find["default"])(records, {
    id: id
  });
  if (!record) {
    res.status(_constants.ERR_NOT_FOUND).send({
      msg: 'Not found'
    });
    return;
  }
  try {
    var filteredRecords = records.filter(function (record) {
      return record.id !== id;
    });
    _configstore["default"].set(CONFIG_KEY, filteredRecords);
    res.send({
      err: null
    });
  } catch (err) {
    res.status(_constants.ERR_INTERNAL_SERVER_ERROR).send({
      msg: 'Failed to save ' + JSON.stringify(_settings["default"].rcfile)
    });
  }
};
exports.__delete = __delete;