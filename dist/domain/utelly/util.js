"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStreamingServices = exports.mapResultLocation = void 0;

var _ramda = require("ramda");

var _utils = require("../itunes/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapResultLocation = function mapResultLocation(movie) {
  return function (res) {
    switch (res.name) {
      case 'ITunes':
        return _objectSpread({}, (0, _ramda.pick)(['name', 'icon'])(res), {
          url: (0, _utils.convertItunesUrl)(res.url, movie)
        });

      default:
        return (0, _ramda.pick)(['name', 'url', 'icon'])(res);
    }
  };
};

exports.mapResultLocation = mapResultLocation;

var getStreamingServices = function getStreamingServices() {
  var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var movie = arguments.length > 1 ? arguments[1] : undefined;
  var bestMatch = results[0];

  if (bestMatch) {
    console.log(JSON.stringify(bestMatch.locations));
    return bestMatch.locations.map(mapResultLocation(movie));
  }

  return void 0;
};

exports.getStreamingServices = getStreamingServices;