"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiService = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _api = require("../../util/api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var api = (0, _api.createAxiosApi)('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com', {
  headers: {
    'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
  }
});
var ENDPOINTS = {
  LOOKUP: "/lookup"
};
var REGION = {
  UK: 'uk',
  US: 'us'
};

var apiService = function apiService(_ref) {
  var utellyApiKey = _ref.utellyApiKey;
  return {
    getStreamingAvailability: function getStreamingAvailability(title) {
      var country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : REGION.UK;
      return api.get(ENDPOINTS.LOOKUP, {
        params: {
          term: title,
          country: country
        },
        headers: {
          'x-rapidapi-key': utellyApiKey
        }
      }).then(R.path(['data', 'results']));
    }
  };
};

exports.apiService = apiService;