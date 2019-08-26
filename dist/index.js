"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDogs = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      type Dog {\n        id: ID!\n        name: String!\n        breed: String\n        habits: [String]!\n      }\n\n      type Query {\n        dogs: [Dog]!\n      }\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var dogs = [{
  id: 'hattie',
  habits: ['sleeping', 'tennis balls'],
  name: 'Hattie',
  breed: 'Cocker spaniel'
}, {
  id: 'buddy',
  habits: ['barking', 'tennis balls', 'cuddles'],
  name: 'Buddy',
  breed: 'Boston Hua Hua'
}, {
  id: 'harvey',
  habits: ['footballs', 'eating', 'cuddles'],
  name: 'Harvey',
  breed: 'Labrador Retriever cross'
}, {
  id: 'beau',
  habits: ['footballs', 'eating', 'cuddles'],
  name: 'Beau',
  breed: 'Labrador Alsation cross'
}];

var getDogs = function getDogs() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(dogs);
    }, 400);
  });
};

exports.getDogs = getDogs;
var PORT = process.env.PORT || 4000;

var startServer = function startServer() {
  var app = (0, _express["default"])();
  var server = new _apolloServerExpress.ApolloServer({
    typeDefs: (0, _apolloServerExpress.gql)(_templateObject()),
    resolvers: {
      Query: {
        dogs: function dogs() {
          return getDogs();
        }
      }
    }
  });
  server.applyMiddleware({
    app: app
  });
  app.listen({
    port: PORT
  }, function () {
    return console.log("\uD83D\uDE80 Server (powered by apollo-server-express) ready at http://localhost:4000".concat(server.graphqlPath));
  });
};

startServer();