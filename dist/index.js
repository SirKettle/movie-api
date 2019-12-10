"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _package = _interopRequireDefault(require("../package.json"));

var movieResolver = _interopRequireWildcard(require("./domain/movie/resolver"));

var movieTypeDefs = _interopRequireWildcard(require("./domain/movie/typeDefs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  # Import types from domains\n  ", "\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  type Query {\n    ", "\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = (0, _express["default"])();
var port = process.env.PORT || 4000;
var mode = process.env.NODE_ENV || 'development';
var isDebugMode = mode === 'development';
var domains = {
  resolvers: [movieResolver],
  typeDefs: [movieTypeDefs]
};

var resolvers = _objectSpread({}, domains.resolvers.map(function (r) {
  return r.fields;
}).reduce(function (acc, res) {
  return _objectSpread({}, acc, {}, res);
}, {}), {
  Query: domains.resolvers.map(function (r) {
    return r.queries;
  }).reduce(function (acc, res) {
    return _objectSpread({}, acc, {}, res);
  }, {})
}); // TODO: Is there a more GraphQL way of extending this schema?


var typeDefs = (0, _apolloServerExpress.gql)(_templateObject(), domains.typeDefs.map(function (t) {
  return t.types;
}), domains.typeDefs.map(function (t) {
  return t.queries;
}));

if (!process.env.TMDB_API_KEY) {
  throw new Error('API key missing for The Movie Database');
}

if (!process.env.UTELLY_API_KEY) {
  throw new Error('API key missing for Utelly');
}

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: function context() {
    return {
      tmdbApiKey: process.env.TMDB_API_KEY,
      utellyApiKey: process.env.UTELLY_API_KEY,
      amazonAssociateId: 'thirkettle-21'
    };
  },
  introspection: true,
  playground: true
});
server.applyMiddleware({
  app: app
});
app.get('/', function (req, res) {
  return res.send("Movie GraphQL API - go to ".concat(server.graphqlPath, " to explore API"));
});
app.listen(port, function () {
  if (isDebugMode) {
    console.log("\n                                   O~                                   O~\nO~~~ O~~ O~~    O~~    O~~     O~~      O~~             O~~    O~ O~~     \n O~~  O~  O~~ O~~  O~~  O~~   O~~ O~~ O~   O~~ O~~~~~ O~~  O~~ O~  O~~ O~~\n O~~  O~  O~~O~~    O~~  O~~ O~~  O~~O~~~~~ O~~      O~~   O~~ O~   O~~O~~\n O~~  O~  O~~ O~~  O~~    O~O~~   O~~O~              O~~   O~~ O~~ O~~ O~~\nO~~~  O~  O~~   O~~        O~~    O~~  O~~~~           O~~ O~~~O~~     O~~\n                                                               O~~\n                 ");
    console.log("\uD83D\uDE80 ".concat(_package["default"].name, " v").concat(_package["default"].version, " - by ").concat(_package["default"].author.name));
    console.log(_package["default"].description);
    console.log("- - - - - - - - - - - - - - - - - ");
    console.log("Ready at http://localhost:".concat(port).concat(server.graphqlPath));
  } else {
    console.log("API (".concat(mode, ") ready - port assigned by Heroku: ").concat(port));
  }
});
var _default = app;
exports["default"] = _default;