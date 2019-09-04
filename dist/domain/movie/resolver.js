"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;

var _graphqlFields = _interopRequireDefault(require("graphql-fields"));

var _api = require("./api");

var _api2 = require("../utelly/api");

var _util = require("../utelly/util");

var _api3 = require("../itunes/api");

var _utils = require("../itunes/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getRequestedFields = function getRequestedFields(info) {
  return Object.keys((0, _graphqlFields["default"])(info));
};

var includesRequestedField = function includesRequestedField(field, info) {
  return getRequestedFields(info).includes(field);
};

var mapMovieResult = function mapMovieResult(result) {
  return {
    id: result.id,
    name: result.original_title,
    summary: result.overview,
    releaseDate: result.release_date,
    posterImage: result.poster_path,
    backgroundImage: result.backdrop_path,
    itunesUrl: null,
    streamingServices: null
  };
};

var queries = {
  movies: function movies(_) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var context = arguments.length > 2 ? arguments[2] : undefined;
    var info = arguments.length > 3 ? arguments[3] : undefined;
    return (0, _api.apiService)(context).getMovies(params).then(function (json) {
      return json.map(mapMovieResult);
    });
  },
  movie: function movie(_, _ref, context, info) {
    var id = _ref.id;
    return (0, _api.apiService)(context).getMovie(id).then(function (result) {
      var movie = mapMovieResult(result);

      if (includesRequestedField('streamingServices', info)) {
        return (0, _api2.apiService)(context).getStreamingAvailability(movie.name).then(function (results) {
          return _objectSpread({}, movie, {
            streamingServices: (0, _util.getStreamingServices)(results, movie)
          });
        });
      }

      if (includesRequestedField('itunesUrl', info)) {
        return (0, _api3.apiService)().getMovieResults(movie.name).then(function (itunesResults) {
          return _objectSpread({}, movie, {
            itunesUrl: (0, _utils.getBestMovieMatchAffiliateLink)(itunesResults, movie) || null
          });
        });
      }

      return movie;
    });
  }
};
exports.queries = queries;