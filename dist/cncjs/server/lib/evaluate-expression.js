"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _escodegen = require("escodegen");
var _esprima = require("esprima");
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var log = (0, _logger["default"])('evaluate-expression');
var UNRESOLVED = Symbol('unresolved');
var evaluateExpression = function evaluateExpression(src, vars) {
  if (!vars || _typeof(vars) !== 'object') {
    vars = _objectSpread({}, vars);
  }
  var walk = function walk(node) {
    if (node.type === 'Literal') {
      return node.value;
    }
    if (node.type === 'UnaryExpression') {
      var val = walk(node.argument);
      if (node.operator === '+') {
        return +val;
      }
      if (node.operator === '-') {
        return -val;
      }
      if (node.operator === '~') {
        return ~val;
      }
      if (node.operator === '!') {
        return !val;
      }
      return UNRESOLVED;
    }
    if (node.type === 'ArrayExpression') {
      var xs = [];
      for (var i = 0, l = node.elements.length; i < l; i++) {
        var x = walk(node.elements[i]);
        if (x === UNRESOLVED) {
          return UNRESOLVED;
        }
        xs.push(x);
      }
      return xs;
    }
    if (node.type === 'ObjectExpression') {
      var obj = {};
      for (var _i = 0; _i < node.properties.length; _i++) {
        var prop = node.properties[_i];
        var value = prop.value === null ? prop.value : walk(prop.value);
        if (value === UNRESOLVED) {
          return UNRESOLVED;
        }
        obj[prop.key.value || prop.key.name] = value;
      }
      return obj;
    }
    if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
      var _l = walk(node.left);
      if (_l === UNRESOLVED) {
        return UNRESOLVED;
      }
      var r = walk(node.right);
      if (r === UNRESOLVED) {
        return UNRESOLVED;
      }
      var op = node.operator;
      if (op === '==') {
        return _l == r; // eslint-disable-line eqeqeq
      }

      if (op === '===') {
        return _l === r;
      }
      if (op === '!=') {
        return _l != r; // eslint-disable-line eqeqeq
      }

      if (op === '!==') {
        return _l !== r;
      }
      if (op === '+') {
        return _l + r;
      }
      if (op === '-') {
        return _l - r;
      }
      if (op === '*') {
        return _l * r;
      }
      if (op === '/') {
        return _l / r;
      }
      if (op === '%') {
        return _l % r;
      }
      if (op === '<') {
        return _l < r;
      }
      if (op === '<=') {
        return _l <= r;
      }
      if (op === '>') {
        return _l > r;
      }
      if (op === '>=') {
        return _l >= r;
      }
      if (op === '|') {
        return _l | r;
      }
      if (op === '&') {
        return _l & r;
      }
      if (op === '^') {
        return _l ^ r;
      }
      if (op === '&&') {
        return _l && r;
      }
      if (op === '||') {
        return _l || r;
      }
      return UNRESOLVED;
    }
    if (node.type === 'Identifier') {
      if (Object.hasOwnProperty.call(vars, node.name)) {
        return vars[node.name];
      }
      return UNRESOLVED;
    }
    if (node.type === 'ThisExpression') {
      if (Object.hasOwnProperty.call(vars, 'this')) {
        return vars['this']; // eslint-disable-line dot-notation
      }

      return UNRESOLVED;
    }
    if (node.type === 'CallExpression') {
      var callee = walk(node.callee);
      if (callee === UNRESOLVED) {
        return UNRESOLVED;
      }
      if (typeof callee !== 'function') {
        return UNRESOLVED;
      }
      var ctx = node.callee.object ? walk(node.callee.object) : UNRESOLVED;
      if (ctx === UNRESOLVED) {
        ctx = null;
      }
      var args = [];
      for (var _i2 = 0, _l2 = node.arguments.length; _i2 < _l2; _i2++) {
        var _x = walk(node.arguments[_i2]);
        if (_x === UNRESOLVED) {
          return UNRESOLVED;
        }
        args.push(_x);
      }
      return callee.apply(ctx, args);
    }
    if (node.type === 'MemberExpression') {
      var _obj = walk(node.object);
      if (_obj === UNRESOLVED) {
        return UNRESOLVED;
      }
      if (node.property.type === 'Identifier') {
        return _obj[node.property.name];
      }
      var _prop = walk(node.property);
      if (_prop === UNRESOLVED) {
        return UNRESOLVED;
      }
      return _obj[_prop];
    }
    if (node.type === 'ConditionalExpression') {
      var _val = walk(node.test);
      if (_val === UNRESOLVED) {
        return UNRESOLVED;
      }
      return _val ? walk(node.consequent) : walk(node.alternate);
    }
    if (node.type === 'ExpressionStatement') {
      var _val2 = walk(node.expression);
      if (_val2 === UNRESOLVED) {
        return UNRESOLVED;
      }
      return _val2;
    }
    if (node.type === 'ReturnStatement') {
      return walk(node.argument);
    }
    if (node.type === 'FunctionExpression') {
      var bodies = node.body.body;

      // Create a "scope" for our arguments
      var oldVars = {};
      Object.keys(vars).forEach(function (element) {
        oldVars[element] = vars[element];
      });
      for (var _i3 = 0; _i3 < node.params.length; _i3++) {
        var key = node.params[_i3];
        if (key.type !== 'Identifier') {
          return UNRESOLVED;
        }
        vars[key.name] = null;
      }
      for (var _i4 in bodies) {
        if (walk(bodies[_i4]) === UNRESOLVED) {
          return UNRESOLVED;
        }
      }

      // restore the vars and scope after walk
      vars = oldVars;
      var keys = Object.keys(vars);
      var vals = keys.map(function (key) {
        return vars[key];
      });
      return Function(keys.join(', '), 'return ' + (0, _escodegen.generate)(node)).apply(null, vals); // eslint-disable-line no-new-func
    }

    if (node.type === 'TemplateLiteral') {
      var str = '';
      var _i5 = 0;
      for (_i5 = 0; _i5 < node.expressions.length; _i5++) {
        str += walk(node.quasis[_i5]);
        str += walk(node.expressions[_i5]);
      }
      str += walk(node.quasis[_i5]);
      return str;
    }
    if (node.type === 'TaggedTemplateExpression') {
      var tag = walk(node.tag);
      var quasi = node.quasi;
      var strings = quasi.quasis.map(walk);
      var values = quasi.expressions.map(walk);
      return tag.apply(null, [strings].concat(values));
    }
    if (node.type === 'TemplateElement') {
      return node.value.cooked;
    }
    return UNRESOLVED;
  };
  var result = UNRESOLVED;
  try {
    var ast;
    if (typeof src === 'string') {
      ast = (0, _esprima.parse)(src).body[0].expression;
    } else {
      ast = src;
    }
    result = walk(ast);
  } catch (e) {
    log.error("src=\"".concat(src, "\", vars=").concat(JSON.stringify(vars)));
    log.error(e);
  }
  return result === UNRESOLVED ? undefined : result;
};
var _default = evaluateExpression;
exports["default"] = _default;