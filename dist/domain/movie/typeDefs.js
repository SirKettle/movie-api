"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = exports.types = void 0;

var _constants = require("./constants");

var types = "\n  enum MediaType {\n    ".concat(Object.keys(_constants.MEDIA_TYPE).join('\n'), "\n  }\n  \n  enum Genres {\n    ").concat(Object.keys(_constants.GENRES).join('\n'), "\n  }\n  \n  enum Moods {\n    ").concat(Object.keys(_constants.moods).join('\n'), "\n  }\n  \n  enum SortBy {\n    ").concat(Object.keys(_constants.SORT_BY).join('\n'), "\n  }\n\n  type StreamingService {\n    name: String!\n    url: String!\n    icon: String\n  }\n  \n  interface Media {\n    id: ID!\n    mediaType: MediaType!\n    name: String!\n    posterImage: String\n  }\n  \n  type Movie implements Media {\n    id: ID!\n    mediaType: MediaType!\n    name: String!\n    posterImage: String\n    summary: String\n    releaseDate: String!\n    backgroundImage: String\n    itunesUrl: String,\n    streamingServices: [StreamingService]\n  }\n\n  type TV implements Media {\n    id: ID!\n    mediaType: MediaType!\n    name: String!\n    posterImage: String\n    summary: String\n    releaseDate: String!\n    backgroundImage: String\n    itunesUrl: String,\n    streamingServices: [StreamingService]\n  }\n  \n  type Person implements Media {\n    id: ID!\n    mediaType: MediaType!\n    name: String!\n    posterImage: String\n  }\n  \n");
exports.types = types;
var queries = "\n  movies(\n    sortBy: String\n    personId: Int\n    allLanguages: Boolean\n    genres: [Genres]\n    moods: [Moods]\n  ): [Movie]!\n  \n  movie(id: ID): Movie\n  \n  search(query: String!): [Media!]!\n";
exports.queries = queries;