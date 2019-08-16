"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = exports.types = void 0;
var types = "\n  type Dog {\n    id: ID!\n    name: String!\n    breed: String\n    habits: [String]!\n  }\n";
exports.types = types;
var queries = "\n  dog(id: ID): Dog\n  dogs: [Dog]!\n";
exports.queries = queries;