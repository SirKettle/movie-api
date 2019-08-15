"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fields = exports.queries = exports.getDog = exports.getDogs = void 0;
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

var getDog = function getDog(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var dog = dogs.find(function (dog) {
        return dog.id === id;
      });

      if (dog) {
        resolve(dog);
      } else {
        reject("404 - dog not found with id '".concat(id, "'"));
      }
    }, 200);
  });
}; // Technique to use individual reslovers per field taken from: “GraphQL Resolvers: Best Practices”
// https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55


exports.getDog = getDog;
var queries = {
  dogs: function dogs() {
    return getDogs();
  },
  dog: function dog(_, _ref) {
    var id = _ref.id;
    return {
      id: id
    };
  }
};
exports.queries = queries;
var fields = {
  Dog: {
    name: function name(_ref2) {
      var id = _ref2.id;
      return getDog(id).then(function (dog) {
        return "My name is ".concat(dog.name);
      });
    },
    habits: function habits(_ref3) {
      var id = _ref3.id;
      return getDog(id).then(function (dog) {
        return dog.habits;
      });
    },
    breed: function breed(_ref4) {
      var id = _ref4.id;
      return getDog(id).then(function (dog) {
        return dog.breed;
      });
    }
  }
};
exports.fields = fields;