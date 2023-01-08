"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path2 = _interopRequireDefault(require("path"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _compression = _interopRequireDefault(require("compression"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _connectMultiparty = _interopRequireDefault(require("connect-multiparty"));
var _connectRestreamer = _interopRequireDefault(require("connect-restreamer"));
var _consolidate = _interopRequireDefault(require("consolidate"));
var _errorhandler = _interopRequireDefault(require("errorhandler"));
var _express = _interopRequireDefault(require("express"));
var _expressJwt = _interopRequireDefault(require("express-jwt"));
var _expressSession = _interopRequireDefault(require("express-session"));
require("hogan.js");
var _i18next = _interopRequireDefault(require("i18next"));
var _i18nextNodeFsBackend = _interopRequireDefault(require("i18next-node-fs-backend"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _methodOverride = _interopRequireDefault(require("method-override"));
var _morgan = _interopRequireDefault(require("morgan"));
var _serveFavicon = _interopRequireDefault(require("serve-favicon"));
var _serveStatic = _interopRequireDefault(require("serve-static"));
var _sessionFileStore = _interopRequireDefault(require("session-file-store"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _rimraf = _interopRequireDefault(require("rimraf"));
var _i18nextExpressMiddleware = require("i18next-express-middleware");
var _urljoin = _interopRequireDefault(require("./lib/urljoin"));
var _logger = _interopRequireDefault(require("./lib/logger"));
var _settings = _interopRequireDefault(require("./config/settings"));
var api = _interopRequireWildcard(require("./api"));
var _errclient = _interopRequireDefault(require("./lib/middleware/errclient"));
var _errlog = _interopRequireDefault(require("./lib/middleware/errlog"));
var _errnotfound = _interopRequireDefault(require("./lib/middleware/errnotfound"));
var _errserver = _interopRequireDefault(require("./lib/middleware/errserver"));
var _configstore = _interopRequireDefault(require("./services/configstore"));
var _accessControl = require("./access-control");
var _constants = require("./constants");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var log = (0, _logger["default"])('app');
var renderPage = function renderPage() {
  var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index';
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _noop2["default"];
  return function (req, res, next) {
    // Override IE's Compatibility View Settings
    // http://stackoverflow.com/questions/6156639/x-ua-compatible-is-set-to-ie-edge-but-it-still-doesnt-stop-compatibility-mode
    res.set({
      'X-UA-Compatible': 'IE=edge'
    });
    var locals = _objectSpread({}, cb(req, res));
    res.render(view, locals);
  };
};
var appMain = function appMain() {
  var app = (0, _express["default"])();
  {
    // Settings
    if (process.env.NODE_ENV === 'development') {
      // Error handler - https://github.com/expressjs/errorhandler
      // Development error handler, providing stack traces and error message responses
      // for requests accepting text, html, or json.
      app.use((0, _errorhandler["default"])());

      // a custom "verbose errors" setting which can be used in the templates via settings['verbose errors']
      app.enable('verbose errors'); // Enables verbose errors in development
      app.disable('view cache'); // Disables view template compilation caching in development
    } else {
      // a custom "verbose errors" setting which can be used in the templates via settings['verbose errors']
      app.disable('verbose errors'); // Disables verbose errors in production
      app.enable('view cache'); // Enables view template compilation caching in production
    }

    app.enable('trust proxy'); // Enables reverse proxy support, disabled by default
    app.enable('case sensitive routing'); // Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
    app.disable('strict routing'); // Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
    app.disable('x-powered-by'); // Enables the X-Powered-By: Express HTTP header, enabled by default

    for (var i = 0; i < _settings["default"].view.engines.length; ++i) {
      var extension = _settings["default"].view.engines[i].extension;
      var template = _settings["default"].view.engines[i].template;
      app.engine(extension, _consolidate["default"][template]);
    }
    app.set('view engine', _settings["default"].view.defaultExtension); // The default engine extension to use when omitted
    app.set('views', [_path2["default"].resolve(__dirname, '../app'), _path2["default"].resolve(__dirname, 'views')]); // The view directory path

    log.debug('app.settings: %j', app.settings);
  }

  // Setup i18n (i18next)
  _i18next["default"].use(_i18nextNodeFsBackend["default"]).use(_i18nextExpressMiddleware.LanguageDetector).init(_settings["default"].i18next);
  app.use( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
      var ipaddr;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // IP Address Access Control
            ipaddr = req.ip || req.connection.remoteAddress;
            _context.next = 4;
            return (0, _accessControl.authorizeIPAddress)(ipaddr);
          case 4:
            _context.next = 11;
            break;
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            log.warn(_context.t0);
            res.status(_constants.ERR_FORBIDDEN).end('Forbidden Access');
            return _context.abrupt("return");
          case 11:
            next();
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());

  // Removes the 'X-Powered-By' header in earlier versions of Express
  app.use(function (req, res, next) {
    res.removeHeader('X-Powered-By');
    next();
  });

  // Middleware
  // https://github.com/senchalabs/connect

  try {
    // https://github.com/valery-barysok/session-file-store
    var _path = _settings["default"].middleware.session.path; // Defaults to './cncjs-sessions'

    _rimraf["default"].sync(_path);
    _fs["default"].mkdirSync(_path);
    var FileStore = (0, _sessionFileStore["default"])(_expressSession["default"]);
    app.use((0, _expressSession["default"])({
      // https://github.com/expressjs/session#secret
      secret: _settings["default"].secret,
      // https://github.com/expressjs/session#resave
      resave: true,
      // https://github.com/expressjs/session#saveuninitialized
      saveUninitialized: true,
      store: new FileStore({
        path: _path,
        logFn: function logFn() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          log.debug.apply(log, args);
        }
      })
    }));
  } catch (err) {
    log.error(err);
  }
  app.use((0, _serveFavicon["default"])(_path2["default"].join((0, _get2["default"])(_settings["default"], 'assets.app.path', ''), 'favicon.ico')));
  app.use((0, _cookieParser["default"])());

  // Connect's body parsing middleware. This only handles urlencoded and json bodies.
  // https://github.com/expressjs/body-parser
  app.use(_bodyParser["default"].json(_settings["default"].middleware['body-parser'].json));
  app.use(_bodyParser["default"].urlencoded(_settings["default"].middleware['body-parser'].urlencoded));

  // For multipart bodies, please use the following modules:
  // - [busboy](https://github.com/mscdex/busboy) and [connect-busboy](https://github.com/mscdex/connect-busboy)
  // - [multiparty](https://github.com/andrewrk/node-multiparty) and [connect-multiparty](https://github.com/andrewrk/connect-multiparty)
  app.use((0, _connectMultiparty["default"])(_settings["default"].middleware.multiparty));

  // https://github.com/dominictarr/connect-restreamer
  // connect's bodyParser has a problem when using it with a proxy.
  // It gobbles up all the body events, so that the proxy doesn't see anything!
  app.use((0, _connectRestreamer["default"])());

  // https://github.com/expressjs/method-override
  app.use((0, _methodOverride["default"])());
  if (_settings["default"].verbosity > 0) {
    // https://github.com/expressjs/morgan#use-custom-token-formats
    // Add an ID to all requests and displays it using the :id token
    _morgan["default"].token('id', function (req, res) {
      return req.session.id;
    });
    app.use((0, _morgan["default"])(_settings["default"].middleware.morgan.format));
  }
  app.use((0, _compression["default"])(_settings["default"].middleware.compression));
  Object.keys(_settings["default"].assets).forEach(function (name) {
    var asset = _settings["default"].assets[name];
    log.debug('assets: name=%s, asset=%s', name, JSON.stringify(asset));
    if (!asset.path) {
      log.error('asset path is not defined');
      return;
    }
    asset.routes.forEach(function (assetRoute) {
      var route = (0, _urljoin["default"])(_settings["default"].route || '/', assetRoute || '');
      log.debug('> route=%s', name, route);
      app.use(route, (0, _serveStatic["default"])(asset.path, {
        maxAge: asset.maxAge
      }));
    });
  });
  app.use((0, _i18nextExpressMiddleware.handle)(_i18next["default"], {}));
  {
    // Secure API Access
    app.use((0, _urljoin["default"])(_settings["default"].route, 'api'), (0, _expressJwt["default"])({
      secret: _configstore["default"].get('secret'),
      credentialsRequired: true
    }));
    app.use( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(err, req, res, next) {
        var bypass, whitelist, token, user, ipaddr;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              bypass = !(err && err.name === 'UnauthorizedError'); // Check whether the app is running in development mode
              bypass = bypass || process.env.NODE_ENV === 'development';

              // Check whether the request path is not restricted
              whitelist = [
              // Also see "src/app/api/index.js"
              (0, _urljoin["default"])(_settings["default"].route, 'api/signin')];
              bypass = bypass || whitelist.some(function (path) {
                return req.path.indexOf(path) === 0;
              });
              if (bypass) {
                _context2.next = 16;
                break;
              }
              // Check whether the provided credential is correct
              token = (0, _get2["default"])(req, 'query.token') || (0, _get2["default"])(req, 'body.token');
              _context2.prev = 6;
              // User Validation
              user = _jsonwebtoken["default"].verify(token, _settings["default"].secret) || {};
              _context2.next = 10;
              return (0, _accessControl.validateUser)(user);
            case 10:
              bypass = true;
              _context2.next = 16;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](6);
              log.warn(_context2.t0);
            case 16:
              if (bypass) {
                _context2.next = 21;
                break;
              }
              ipaddr = req.ip || req.connection.remoteAddress;
              log.warn("Forbidden: ipaddr=".concat(ipaddr, ", code=\"").concat(err.code, "\", message=\"").concat(err.message, "\""));
              res.status(_constants.ERR_FORBIDDEN).end('Forbidden Access');
              return _context2.abrupt("return");
            case 21:
              next();
            case 22:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[6, 13]]);
      }));
      return function (_x4, _x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
  {
    // Register API routes with public access
    // Also see "src/app/app.js"
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/signin'), api.users.signin);
  }
  {
    // Register API routes with authorized access
    // Version
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/version/latest'), api.version.getLatestVersion);

    // State
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/state'), api.state.get);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/state'), api.state.set);
    app["delete"]((0, _urljoin["default"])(_settings["default"].route, 'api/state'), api.state.unset);

    // G-code
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/gcode'), api.gcode.fetch);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/gcode'), api.gcode.upload);
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/gcode/download'), api.gcode.download);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/gcode/download'), api.gcode.download); // Alias

    // Controllers
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/controllers'), api.controllers.get);

    // Commands
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/commands'), api.commands.fetch);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/commands'), api.commands.create);
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/commands/:id'), api.commands.read);
    app.put((0, _urljoin["default"])(_settings["default"].route, 'api/commands/:id'), api.commands.update);
    app["delete"]((0, _urljoin["default"])(_settings["default"].route, 'api/commands/:id'), api.commands.__delete);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/commands/run/:id'), api.commands.run);

    // Events
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/events'), api.events.fetch);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/events/'), api.events.create);
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/events/:id'), api.events.read);
    app.put((0, _urljoin["default"])(_settings["default"].route, 'api/events/:id'), api.events.update);
    app["delete"]((0, _urljoin["default"])(_settings["default"].route, 'api/events/:id'), api.events.__delete);

    // Machines
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/machines'), api.machines.fetch);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/machines'), api.machines.create);
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/machines/:id'), api.machines.read);
    app.put((0, _urljoin["default"])(_settings["default"].route, 'api/machines/:id'), api.machines.update);
    app["delete"]((0, _urljoin["default"])(_settings["default"].route, 'api/machines/:id'), api.machines.__delete);

    // Macros
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/macros'), api.macros.fetch);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/macros'), api.macros.create);
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/macros/:id'), api.macros.read);
    app.put((0, _urljoin["default"])(_settings["default"].route, 'api/macros/:id'), api.macros.update);
    app["delete"]((0, _urljoin["default"])(_settings["default"].route, 'api/macros/:id'), api.macros.__delete);

    // MDI
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/mdi'), api.mdi.fetch);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/mdi'), api.mdi.create);
    app.put((0, _urljoin["default"])(_settings["default"].route, 'api/mdi'), api.mdi.bulkUpdate);
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/mdi/:id'), api.mdi.read);
    app.put((0, _urljoin["default"])(_settings["default"].route, 'api/mdi/:id'), api.mdi.update);
    app["delete"]((0, _urljoin["default"])(_settings["default"].route, 'api/mdi/:id'), api.mdi.__delete);

    // Users
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/users'), api.users.fetch);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/users/'), api.users.create);
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/users/:id'), api.users.read);
    app.put((0, _urljoin["default"])(_settings["default"].route, 'api/users/:id'), api.users.update);
    app["delete"]((0, _urljoin["default"])(_settings["default"].route, 'api/users/:id'), api.users.__delete);

    // Watch
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/watch/files'), api.watch.getFiles);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/watch/files'), api.watch.getFiles);
    app.get((0, _urljoin["default"])(_settings["default"].route, 'api/watch/file'), api.watch.readFile);
    app.post((0, _urljoin["default"])(_settings["default"].route, 'api/watch/file'), api.watch.readFile);
  }

  // page
  app.get((0, _urljoin["default"])(_settings["default"].route, '/'), renderPage('index.hbs', function (req, res) {
    var webroot = (0, _get2["default"])(_settings["default"], 'assets.app.routes[0]', ''); // with trailing slash
    var lng = req.language;
    var t = req.t;
    return {
      webroot: webroot,
      lang: lng,
      title: "".concat(t('title'), " ").concat(_settings["default"].version),
      loading: t('loading')
    };
  }));
  {
    // Error handling
    app.use((0, _errlog["default"])());
    app.use((0, _errclient["default"])({
      error: 'XHR error'
    }));
    app.use((0, _errnotfound["default"])({
      view: _path2["default"].join('common', '404.hogan'),
      error: 'Not found'
    }));
    app.use((0, _errserver["default"])({
      view: _path2["default"].join('common', '500.hogan'),
      error: 'Internal server error'
    }));
  }
  return app;
};
var _default = appMain;
exports["default"] = _default;