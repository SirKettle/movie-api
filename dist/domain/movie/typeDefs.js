"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = exports.types = void 0;
var types = "\n\n  type StreamingService {\n    name: String!\n    url: String!\n    icon: String\n  }\n\n  type Movie {\n    id: ID!\n    name: String!\n    posterImage: String\n    backgroundImage: String\n    summary: String\n    releaseDate: String!\n    itunesUrl: String,\n    streamingServices: [StreamingService]\n  }\n"; // TODO: typeDefs - enums? build  dynamically using js? nullable/optional?

exports.types = types;
var queries = "\n  movies(\n    sortBy: String\n    personId: Int\n    allLanguages: Boolean\n    genres: [String]\n    moods: [String]\n  ): [Movie]!\n  movie(id: ID): Movie\n";
exports.queries = queries;