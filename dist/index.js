"use strict";

var _apolloServer = require("apollo-server");

var dogResolver = _interopRequireWildcard(require("./domain/dog/resolver"));

var dogTypeDefs = _interopRequireWildcard(require("./domain/dog/typeDefs"));

var movieResolver = _interopRequireWildcard(require("./domain/movie/resolver"));

var movieTypeDefs = _interopRequireWildcard(require("./domain/movie/typeDefs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n  # Import types from domains\n  ", "\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  type Query {\n    ", "\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var domains = {
  resolvers: [dogResolver, movieResolver],
  typeDefs: [dogTypeDefs, movieTypeDefs]
};

var resolvers = _objectSpread({
  Query: domains.resolvers.map(function (r) {
    return r.queries;
  }).reduce(function (acc, res) {
    return _objectSpread({}, acc, {}, res);
  }, {})
}, domains.resolvers.map(function (r) {
  return r.fields;
}).reduce(function (acc, res) {
  return _objectSpread({}, acc, {}, res);
}, {})); // console.log(resolvers.Query);
// TODO: Is there a more GraphQL way of extending this schema?


var typeDefs = (0, _apolloServer.gql)(_templateObject(), domains.typeDefs.map(function (t) {
  return t.types;
}), domains.typeDefs.map(function (t) {
  return t.queries;
}));

if (!process.env.TMDB_API_KEY) {
  throw new Error('API key missing for The Movie Database');
}

var server = new _apolloServer.ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: function context() {
    return {
      apiKey: process.env.TMDB_API_KEY
    };
  }
});
server.listen({
  port: process.env.PORT || 80
}).then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80 Server ready at ".concat(url));
})["catch"](function (err) {
  return console.error(err);
});