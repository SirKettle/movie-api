"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logApiRequests = exports.createAxiosApi = exports.getUriSafe = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-control': 'no-cache, must-revalidate, no-store'
};

var getUriSafe = function getUriSafe(str) {
  return str.replace(/ /gi, '-').replace(/[^A-Za-z0-9_-]/gi, '');
};

exports.getUriSafe = getUriSafe;

var createAxiosApi = function createAxiosApi(baseURL) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var api = _axios["default"].create(_objectSpread({}, config, {
    baseURL: baseURL,
    headers: _objectSpread({}, defaultHeaders, {}, config.headers)
  }));

  if (log) {
    api.interceptors.request.use(function (request) {
      console.log("".concat(request.method.toUpperCase(), " ").concat(request.baseURL).concat(request.url));
      return request;
    });
  }

  return api;
};

exports.createAxiosApi = createAxiosApi;

var logApiRequests = function logApiRequests(url, _ref) {
  var _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? 1 : _ref$count;
  console.log("HTTP Request: ".concat(method, " '").concat(url, "'").concat(count > 1 ? " (".concat(count, " requests)") : ''));
};

exports.logApiRequests = logApiRequests;