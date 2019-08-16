"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDogs = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    type Dog {\n      id: ID!\n      name: String!\n      breed: String\n      habits: [String]!\n    }\n\n    type Query {\n      dogs: [Dog]!\n    }\n  "]);

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
var server = new _apolloServer.ApolloServer({
  typeDefs: (0, _apolloServer.gql)(_templateObject()),
  resolvers: {
    Query: {
      dogs: function dogs() {
        return getDogs();
      }
    }
  }
});
server.listen({
  port: process.env.PORT || 4000
}).then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80 Doggies API ready at ".concat(url));
})["catch"](function (err) {
  return console.error(err);
});