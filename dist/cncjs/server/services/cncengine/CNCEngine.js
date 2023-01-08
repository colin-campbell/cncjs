"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ensureArray = _interopRequireDefault(require("ensure-array"));
var _noop = _interopRequireDefault(require("lodash/noop"));
var _serialport = _interopRequireDefault(require("serialport"));
var _socket = _interopRequireDefault(require("socket.io"));
var _socketioJwt = _interopRequireDefault(require("socketio-jwt"));
var _EventTrigger = _interopRequireDefault(require("../../lib/EventTrigger"));
var _logger = _interopRequireDefault(require("../../lib/logger"));
var _settings = _interopRequireDefault(require("../../config/settings"));
var _store = _interopRequireDefault(require("../../store"));
var _configstore = _interopRequireDefault(require("../configstore"));
var _taskrunner = _interopRequireDefault(require("../taskrunner"));
var _controllers = require("../../controllers");
var _constants = require("../../controllers/Grbl/constants");
var _constants2 = require("../../controllers/Marlin/constants");
var _constants3 = require("../../controllers/Smoothie/constants");
var _constants4 = require("../../controllers/TinyG/constants");
var _accessControl = require("../../access-control");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var log = (0, _logger["default"])('service:cncengine');

// Case-insensitive equality checker.
// @param {string} str1 First string to check.
// @param {string} str2 Second string to check.
// @return {boolean} True if str1 and str2 are the same string, ignoring case.
var caseInsensitiveEquals = function caseInsensitiveEquals(str1, str2) {
  str1 = str1 ? (str1 + '').toUpperCase() : '';
  str2 = str2 ? (str2 + '').toUpperCase() : '';
  return str1 === str2;
};
var isValidController = function isValidController(controller) {
  return (
    // Grbl
    caseInsensitiveEquals(_constants.GRBL, controller) ||
    // Marlin
    caseInsensitiveEquals(_constants2.MARLIN, controller) ||
    // Smoothie
    caseInsensitiveEquals(_constants3.SMOOTHIE, controller) ||
    // g2core
    caseInsensitiveEquals(_constants4.G2CORE, controller) ||
    // TinyG
    caseInsensitiveEquals(_constants4.TINYG, controller)
  );
};
var CNCEngine = /*#__PURE__*/function () {
  function CNCEngine() {
    var _this = this;
    _classCallCheck(this, CNCEngine);
    _defineProperty(this, "controllerClass", {});
    _defineProperty(this, "listener", {
      taskStart: function taskStart() {
        if (_this.io) {
          var _this$io;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          (_this$io = _this.io).emit.apply(_this$io, ['task:start'].concat(args));
        }
      },
      taskFinish: function taskFinish() {
        if (_this.io) {
          var _this$io2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          (_this$io2 = _this.io).emit.apply(_this$io2, ['task:finish'].concat(args));
        }
      },
      taskError: function taskError() {
        if (_this.io) {
          var _this$io3;
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          (_this$io3 = _this.io).emit.apply(_this$io3, ['task:error'].concat(args));
        }
      },
      configChange: function configChange() {
        if (_this.io) {
          var _this$io4;
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          (_this$io4 = _this.io).emit.apply(_this$io4, ['config:change'].concat(args));
        }
      }
    });
    _defineProperty(this, "server", null);
    _defineProperty(this, "io", null);
    _defineProperty(this, "sockets", []);
    _defineProperty(this, "event", new _EventTrigger["default"](function (event, trigger, commands) {
      log.debug("EventTrigger: event=\"".concat(event, "\", trigger=\"").concat(trigger, "\", commands=\"").concat(commands, "\""));
      if (trigger === 'system') {
        _taskrunner["default"].run(commands);
      }
    }));
  }
  _createClass(CNCEngine, [{
    key: "start",
    value:
    // @param {object} server The HTTP server instance.
    // @param {string} controller Specify CNC controller.
    function start(server) {
      var _this2 = this;
      var controller = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      // Fallback to an empty string if the controller is not valid
      if (!isValidController(controller)) {
        controller = '';
      }

      // Grbl
      if (!controller || caseInsensitiveEquals(_constants.GRBL, controller)) {
        this.controllerClass[_constants.GRBL] = _controllers.GrblController;
      }
      // Marlin
      if (!controller || caseInsensitiveEquals(_constants2.MARLIN, controller)) {
        this.controllerClass[_constants2.MARLIN] = _controllers.MarlinController;
      }
      // Smoothie
      if (!controller || caseInsensitiveEquals(_constants3.SMOOTHIE, controller)) {
        this.controllerClass[_constants3.SMOOTHIE] = _controllers.SmoothieController;
      }
      // TinyG / G2core
      if (!controller || caseInsensitiveEquals(_constants4.G2CORE, controller) || caseInsensitiveEquals(_constants4.TINYG, controller)) {
        this.controllerClass[_constants4.TINYG] = _controllers.TinyGController;
      }
      if (Object.keys(this.controllerClass).length === 0) {
        throw new Error("No valid CNC controller specified (".concat(controller, ")"));
      }
      var loadedControllers = Object.keys(this.controllerClass);
      log.debug("Loaded controllers: ".concat(loadedControllers));
      this.stop();
      _taskrunner["default"].on('start', this.listener.taskStart);
      _taskrunner["default"].on('finish', this.listener.taskFinish);
      _taskrunner["default"].on('error', this.listener.taskError);
      _configstore["default"].on('change', this.listener.configChange);

      // System Trigger: Startup
      this.event.trigger('startup');
      this.server = server;
      this.io = (0, _socket["default"])(this.server, {
        serveClient: true,
        path: '/socket.io'
      });
      this.io.use(_socketioJwt["default"].authorize({
        secret: _settings["default"].secret,
        handshake: true
      }));
      this.io.use( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(socket, next) {
          var ipaddr, user;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // IP Address Access Control
                ipaddr = socket.handshake.address;
                _context.next = 4;
                return (0, _accessControl.authorizeIPAddress)(ipaddr);
              case 4:
                // User Validation
                user = socket.decoded_token || {};
                _context.next = 7;
                return (0, _accessControl.validateUser)(user);
              case 7:
                _context.next = 14;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                log.warn(_context.t0);
                next(_context.t0);
                return _context.abrupt("return");
              case 14:
                next();
              case 15:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[0, 9]]);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
      this.io.on('connection', function (socket) {
        var address = socket.handshake.address;
        var user = socket.decoded_token || {};
        log.debug("New connection from ".concat(address, ": id=").concat(socket.id, ", user.id=").concat(user.id, ", user.name=").concat(user.name));

        // Add to the socket pool
        _this2.sockets.push(socket);
        socket.emit('startup', {
          loadedControllers: Object.keys(_this2.controllerClass),
          // User-defined baud rates and ports
          baudrates: (0, _ensureArray["default"])(_configstore["default"].get('baudrates', [])),
          ports: (0, _ensureArray["default"])(_configstore["default"].get('ports', []))
        });
        socket.on('disconnect', function () {
          log.debug("Disconnected from ".concat(address, ": id=").concat(socket.id, ", user.id=").concat(user.id, ", user.name=").concat(user.name));
          var controllers = _store["default"].get('controllers', {});
          Object.keys(controllers).forEach(function (port) {
            var controller = controllers[port];
            if (!controller) {
              return;
            }
            controller.removeConnection(socket);
          });

          // Remove from socket pool
          _this2.sockets.splice(_this2.sockets.indexOf(socket), 1);
        });

        // List the available serial ports
        socket.on('list', function () {
          log.debug("socket.list(): id=".concat(socket.id));
          _serialport["default"].list().then(function (ports) {
            ports = ports.concat((0, _ensureArray["default"])(_configstore["default"].get('ports', [])));
            var controllers = _store["default"].get('controllers', {});
            var portsInUse = Object.keys(controllers).filter(function (port) {
              var controller = controllers[port];
              return controller && controller.isOpen();
            });
            ports = ports.map(function (port) {
              return {
                port: port.path,
                manufacturer: port.manufacturer,
                inuse: portsInUse.indexOf(port.path) >= 0
              };
            });
            socket.emit('serialport:list', ports);
          })["catch"](function (err) {
            log.error(err);
          });
        });

        // Open serial port
        socket.on('open', function (port, options) {
          var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _noop["default"];
          if (typeof callback !== 'function') {
            callback = _noop["default"];
          }
          log.debug("socket.open(\"".concat(port, "\", ").concat(JSON.stringify(options), "): id=").concat(socket.id));
          var controller = _store["default"].get("controllers[\"".concat(port, "\"]"));
          if (!controller) {
            var _options = _objectSpread({}, options),
              _options$controllerTy = _options.controllerType,
              controllerType = _options$controllerTy === void 0 ? _constants.GRBL : _options$controllerTy,
              baudrate = _options.baudrate,
              rtscts = _options.rtscts;
            if (controllerType === 'TinyG2') {
              // TinyG2 is deprecated and will be removed in a future release
              controllerType = _constants4.TINYG;
            }
            var Controller = _this2.controllerClass[controllerType];
            if (!Controller) {
              var err = "Not supported controller: ".concat(controllerType);
              log.error(err);
              callback(new Error(err));
              return;
            }
            var engine = _this2;
            controller = new Controller(engine, {
              port: port,
              baudrate: baudrate,
              rtscts: !!rtscts
            });
          }
          controller.addConnection(socket);
          if (controller.isOpen()) {
            // Join the room
            socket.join(port);
            callback(null);
            return;
          }
          controller.open(function () {
            var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            if (err) {
              callback(err);
              return;
            }

            // System Trigger: Open a serial port
            _this2.event.trigger('port:open');
            if (_store["default"].get("controllers[\"".concat(port, "\"]"))) {
              log.error("Serial port \"".concat(port, "\" was not properly closed"));
            }
            _store["default"].set("controllers[".concat(JSON.stringify(port), "]"), controller);

            // Join the room
            socket.join(port);
            callback(null);
          });
        });

        // Close serial port
        socket.on('close', function (port) {
          var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _noop["default"];
          if (typeof callback !== 'function') {
            callback = _noop["default"];
          }
          log.debug("socket.close(\"".concat(port, "\"): id=").concat(socket.id));
          var controller = _store["default"].get("controllers[\"".concat(port, "\"]"));
          if (!controller) {
            var err = "Serial port \"".concat(port, "\" not accessible");
            log.error(err);
            callback(new Error(err));
            return;
          }

          // System Trigger: Close a serial port
          _this2.event.trigger('port:close');

          // Leave the room
          socket.leave(port);
          controller.close(function (err) {
            // Remove controller from store
            _store["default"].unset("controllers[".concat(JSON.stringify(port), "]"));

            // Destroy controller
            controller.destroy();
            callback(null);
          });
        });
        socket.on('command', function (port, cmd) {
          log.debug("socket.command(\"".concat(port, "\", \"").concat(cmd, "\"): id=").concat(socket.id));
          var controller = _store["default"].get("controllers[\"".concat(port, "\"]"));
          if (!controller || controller.isClose()) {
            log.error("Serial port \"".concat(port, "\" not accessible"));
            return;
          }
          for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
            args[_key5 - 2] = arguments[_key5];
          }
          controller.command.apply(controller, [cmd].concat(args));
        });
        socket.on('write', function (port, data) {
          var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          log.debug("socket.write(\"".concat(port, "\", \"").concat(data, "\", ").concat(JSON.stringify(context), "): id=").concat(socket.id));
          var controller = _store["default"].get("controllers[\"".concat(port, "\"]"));
          if (!controller || controller.isClose()) {
            log.error("Serial port \"".concat(port, "\" not accessible"));
            return;
          }
          controller.write(data, context);
        });
        socket.on('writeln', function (port, data) {
          var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          log.debug("socket.writeln(\"".concat(port, "\", \"").concat(data, "\", ").concat(JSON.stringify(context), "): id=").concat(socket.id));
          var controller = _store["default"].get("controllers[\"".concat(port, "\"]"));
          if (!controller || controller.isClose()) {
            log.error("Serial port \"".concat(port, "\" not accessible"));
            return;
          }
          controller.writeln(data, context);
        });
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.io) {
        this.io.close();
        this.io = null;
      }
      this.sockets = [];
      this.server = null;
      _taskrunner["default"].removeListener('start', this.listener.taskStart);
      _taskrunner["default"].removeListener('finish', this.listener.taskFinish);
      _taskrunner["default"].removeListener('error', this.listener.taskError);
      _configstore["default"].removeListener('change', this.listener.configChange);
    }
  }]);
  return CNCEngine;
}();
var _default = CNCEngine;
exports["default"] = _default;