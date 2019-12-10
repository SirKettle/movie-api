"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStreamingServices = exports.mapResultLocation = void 0;

var _utils = require("../itunes/utils");

var mapResultLocation = function mapResultLocation(_ref) {
  var movie = _ref.movie,
      amazonAssociateId = _ref.amazonAssociateId;
  return function (_ref2) {
    var icon = _ref2.icon,
        name = _ref2.name,
        url = _ref2.url;
    var service = {
      icon: icon,
      name: name,
      url: url.replace(/tag=utellycom00-21/gi, "tag=".concat(amazonAssociateId))
    };

    switch (name) {
      case 'ITunes':
        return {
          icon: icon,
          name: name,
          url: (0, _utils.convertItunesUrl)(url, movie)
        };

      default:
        return service;
    }
  };
};

exports.mapResultLocation = mapResultLocation;

var getStreamingServices = function getStreamingServices() {
  var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
      movie = _ref3.movie,
      amazonAssociateId = _ref3.amazonAssociateId;

  var bestMatch = results[0];

  if (bestMatch) {
    return bestMatch.locations.filter(function (res) {
      return Boolean(res && res.name && res.url);
    }).map(mapResultLocation({
      movie: movie,
      amazonAssociateId: amazonAssociateId
    }));
  }

  return void 0;
};

exports.getStreamingServices = getStreamingServices;