"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _electron = require("electron");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
//import AutoUpdater from './AutoUpdater';
var WindowManager = /*#__PURE__*/function () {
  function WindowManager() {
    var _this = this;
    _classCallCheck(this, WindowManager);
    _defineProperty(this, "windows", []);
    _defineProperty(this, "title", '');
    _defineProperty(this, "url", '');
    // https://github.com/electron/electron/blob/master/docs/api/app.md#event-activate-os-x
    // Emitted when the application is activated, which usually happens
    // when the user clicks on the application's dock icon.
    _electron.app.on('activate', function (e) {
      var window = _this.getWindow();
      if (!window) {
        _this.openWindow({
          title: _this.title,
          url: _this.url
        });
      }
    });

    // https://github.com/electron/electron/blob/master/docs/api/app.md#event-window-all-closed
    // Emitted when all windows have been closed.
    // This event is only emitted when the application is not going to quit.
    // If the user pressed Cmd + Q, or the developer called app.quit(), Electron
    // will first try to close all the windows and then emit the will-quit event,
    // and in this case the window-all-closed event would not be emitted.
    _electron.app.on('window-all-closed', function () {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform === 'darwin') {
        var window = _this.getWindow();
        if (window) {
          // Remember current window attributes that will be used for the next 'activate' event
          _this.title = window.webContents.getTitle();
          _this.url = window.webContents.getURL();
        }
        return;
      }
      _electron.app.quit();
    });
  }
  _createClass(WindowManager, [{
    key: "openWindow",
    value: function openWindow(url, options) {
      var _this2 = this;
      var window = new _electron.BrowserWindow(_objectSpread(_objectSpread({}, options), {}, {
        show: false
      }));
      var webContents = window.webContents;
      window.on('closed', function (event) {
        var index = _this2.windows.indexOf(event.sender);
        console.assert(index >= 0);
        _this2.windows.splice(index, 1);
      });

      // Open every external link in a new window
      // https://github.com/electron/electron/blob/master/docs/api/web-contents.md
      webContents.on('new-window', function (event, url) {
        event.preventDefault();
        _electron.shell.openExternal(url);
      });
      webContents.once('dom-ready', function () {
        window.show();
      });

      // Call `ses.setProxy` to ignore proxy settings
      // http://electron.atom.io/docs/latest/api/session/#sessetproxyconfig-callback
      var ses = webContents.session;
      ses.setProxy({
        proxyRules: 'direct://'
      }, function () {
        window.loadURL(url);
      });
      this.windows.push(window);

      // Disable AutoUpdater until an update server is available
      //new AutoUpdater(window);

      return window;
    }
  }, {
    key: "getWindow",
    value: function getWindow() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this.windows.length === 0) {
        return null;
      }
      return this.windows[index] || null;
    }
  }]);
  return WindowManager;
}();
var _default = WindowManager;
exports["default"] = _default;