"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiService = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _constants = require("./constants");

var _api = require("../../util/api");

var _cartesianProduct = require("../../util/cartesianProduct");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var api = (0, _api.createAxiosApi)('https://api.themoviedb.org/3');
var ENDPOINTS = {
  CONFIGURATION: "/configuration",
  DISCOVER_MOVIES: "/discover/movie",
  DISCOVER_TV: "/discover/tv",
  MOVIE: function MOVIE(id) {
    return "/movie/".concat(id);
  },
  TV: function TV(id) {
    return "/tv/".concat(id);
  }
};
var genreCodesByMoods = R.map(function (key) {
  return _constants.moods[key].genres;
});
var genreCodesByKeys = R.map(function (key) {
  return _constants.GENRES[key];
});

var getDiscoverMovieParams = function getDiscoverMovieParams(_ref) {
  var genreQuery = _ref.genreQuery,
      sortBy = _ref.sortBy,
      personId = _ref.personId,
      _ref$allLanguages = _ref.allLanguages,
      allLanguages = _ref$allLanguages === void 0 ? false : _ref$allLanguages,
      _ref$page = _ref.page,
      page = _ref$page === void 0 ? 1 : _ref$page;
  return {
    page: page,
    include_video: false,
    include_adult: false,
    'vote_count.gte': _constants.MIN_VOTES,
    'primary_release_date.gte': 1945,
    with_original_language: allLanguages ? void 0 : 'en',
    with_people: personId || void 0,
    sort_by: _constants.SORT_BY[sortBy] || _constants.SORT_BY.HIGHEST_RATED,
    with_genres: genreQuery
  };
};

var logResults = function logResults(res) {
  console.log(res.length);
  return res;
};

var combineResponsesResults = R.compose(logResults, R.uniq, R.flatten, R.map(R.path(['data', 'results'])));

var getGenreQueries = function getGenreQueries() {
  var moods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var genres = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _cartesianProduct.uniqueCartesianProduct)(genreCodesByMoods(moods)).concat(genreCodesByKeys(genres).map(function (g) {
    return [g];
  })).map(function (codes) {
    return codes.join(',');
  });
};

var apiService = function apiService(_ref2) {
  var apiKey = _ref2.apiKey;
  var withBaseParams = {
    api_key: apiKey,
    language: 'en-US'
  };
  return {
    getMovie: function getMovie(id) {
      return api.get(ENDPOINTS.MOVIE(id), {
        params: _objectSpread({}, withBaseParams)
      }).then(R.prop('data'));
    },
    getMovies: function getMovies(_ref3) {
      var _ref3$moods = _ref3.moods,
          moods = _ref3$moods === void 0 ? [] : _ref3$moods,
          _ref3$genres = _ref3.genres,
          genres = _ref3$genres === void 0 ? [] : _ref3$genres,
          rest = _objectWithoutProperties(_ref3, ["moods", "genres"]);

      var genreQueries = getGenreQueries(moods, genres);
      (0, _api.logApiRequests)(ENDPOINTS.DISCOVER_MOVIES, {
        count: genreQueries.length
      });
      return Promise.all(genreQueries.map(function (genreQuery) {
        return api.get(ENDPOINTS.DISCOVER_MOVIES, {
          params: _objectSpread({}, withBaseParams, {}, getDiscoverMovieParams(_objectSpread({
            genreQuery: genreQuery
          }, rest)))
        });
      })).then(function (_ref4) {
        var _ref5 = _toArray(_ref4),
            responses = _ref5.slice(0);

        return combineResponsesResults(responses);
      });
    }
  };
};

exports.apiService = apiService;