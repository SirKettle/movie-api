"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiService = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _api = require("../../util/api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var api = (0, _api.createAxiosApi)('https://itunes.apple.com');
var ENDPOINTS = {
  SEARCH: "/search"
};
var ENTITY = {
  MOVIE: "movie"
};

var apiService = function apiService() {
  return {
    getMovieResults: function getMovieResults(title) {
      return api.get(ENDPOINTS.SEARCH, {
        params: {
          term: title,
          entity: ENTITY.MOVIE
        }
      }).then(R.path(['data', 'results']));
    }
  };
};

exports.apiService = apiService;