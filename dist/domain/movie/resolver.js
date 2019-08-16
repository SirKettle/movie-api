"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;

var _api = require("./api");

var queries = {
  movies: function movies(_) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var context = arguments.length > 2 ? arguments[2] : undefined;
    return (0, _api.apiService)(context).getMovies(params).then(function (json) {
      return json.map(function (result) {
        return {
          id: result.id,
          name: result.original_title,
          summary: result.overview,
          releaseDate: result.release_date,
          posterImage: result.poster_path,
          backgroundImage: result.backdrop_path
        };
      });
    });
  },
  movie: function movie(_, _ref, context) {
    var id = _ref.id;
    return (0, _api.apiService)(context).getMovie(id).then(function (result) {
      return {
        id: result.id,
        name: result.original_title,
        summary: result.overview,
        releaseDate: result.release_date,
        posterImage: result.poster_path,
        backgroundImage: result.backdrop_path
      };
    });
  }
};
exports.queries = queries;