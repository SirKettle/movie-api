"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = exports.fields = void 0;

var _graphqlFields = _interopRequireDefault(require("graphql-fields"));

var _ramda = require("ramda");

var _api = require("./api");

var _api2 = require("../utelly/api");

var _util = require("../utelly/util");

var _api3 = require("../itunes/api");

var _utils = require("../itunes/utils");

var _constants = require("./constants");

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
    mediaType: _constants.MEDIA_TYPE.MOVIE,
    name: result.original_title,
    summary: result.overview,
    releaseDate: result.release_date,
    posterImage: result.poster_path,
    backgroundImage: result.backdrop_path,
    itunesUrl: null,
    streamingServices: null
  };
};

var mapTvResult = function mapTvResult(result) {
  return {
    id: result.id,
    mediaType: _constants.MEDIA_TYPE.TV,
    name: result.original_name,
    summary: result.overview,
    releaseDate: result.first_air_date,
    posterImage: result.poster_path,
    backgroundImage: result.backdrop_path,
    itunesUrl: null,
    streamingServices: null
  };
};

var mapPersonResult = function mapPersonResult(result) {
  return {
    id: result.id,
    mediaType: _constants.MEDIA_TYPE.PERSON,
    name: result.name,
    posterImage: result.profile_path
  };
};

var normaliseResult = function normaliseResult(result) {
  switch (result.media_type) {
    case _constants.tmdbMediaTypes.MOVIE:
      return mapMovieResult(result);

    case _constants.tmdbMediaTypes.TV:
      return mapTvResult(result);

    case _constants.tmdbMediaTypes.PERSON:
      return mapPersonResult(result);

    default:
      return;
  }
};

var fields = {
  Media: {
    __resolveType: function __resolveType(_ref, _context, _info) {
      var mediaType = _ref.mediaType;

      // return type as a string
      switch (mediaType) {
        case _constants.MEDIA_TYPE.MOVIE:
          return 'Movie';

        case _constants.MEDIA_TYPE.TV:
          return 'TV';

        case _constants.MEDIA_TYPE.PERSON:
          return 'Person';

        default:
          return null;
      }
    }
  }
};
exports.fields = fields;
var queries = {
  movies: function movies(_) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var context = arguments.length > 2 ? arguments[2] : undefined;

    var _info = arguments.length > 3 ? arguments[3] : undefined;

    return (0, _api.apiService)(context).getMovies(params).then((0, _ramda.map)(mapMovieResult));
  },
  movie: function movie(_, _ref2, context, info) {
    var id = _ref2.id;
    return (0, _api.apiService)(context).getMovie(id).then(function (result) {
      var movie = mapMovieResult(result);

      if (includesRequestedField('streamingServices', info)) {
        return (0, _api2.apiService)(context).getStreamingAvailability(movie.name).then(function (results) {
          return _objectSpread({}, movie, {
            streamingServices: (0, _util.getStreamingServices)(results, _objectSpread({
              movie: movie
            }, context))
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
  },
  search: function search(_, _ref3, context, _info) {
    var query = _ref3.query;
    return (0, _api.apiService)(context).getSearchResults(query).then((0, _ramda.map)(normaliseResult));
  }
};
exports.queries = queries;