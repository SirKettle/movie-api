"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBestMovieMatchAffiliateLink = exports.getBestMovieMatch = exports.convertItunesUrl = exports.getAffiliateLink = exports.getId = void 0;

var _api = require("../../util/api");

var AFFILIATE_TOKEN = '1001lybQ';
var CAMPAIGN_TOKEN = 'choosymovietv'; // iTunes search API returns tvShows with collectionIds, movies with trackIds

var getId = function getId(iTunesTrack) {
  return iTunesTrack.trackId || iTunesTrack.collectionId;
}; // use geo prefix - this redirects to clients local itunes store - so safe to use 'us' as default


exports.getId = getId;

var getAffiliateLink = function getAffiliateLink(_ref) {
  var trackId = _ref.trackId,
      title = _ref.title,
      _ref$affiliateToken = _ref.affiliateToken,
      affiliateToken = _ref$affiliateToken === void 0 ? AFFILIATE_TOKEN : _ref$affiliateToken,
      _ref$campaignToken = _ref.campaignToken,
      campaignToken = _ref$campaignToken === void 0 ? CAMPAIGN_TOKEN : _ref$campaignToken,
      _ref$isTV = _ref.isTV,
      isTV = _ref$isTV === void 0 ? false : _ref$isTV;
  return "https://geo.itunes.apple.com/us/".concat(isTV ? 'tv-season' : 'movie', "/").concat((0, _api.getUriSafe)(title), "/id").concat(trackId, "?at=").concat(affiliateToken, "&ct=").concat(campaignToken);
};

exports.getAffiliateLink = getAffiliateLink;

var convertItunesUrl = function convertItunesUrl(originalUrl, movie) {
  var trackId = originalUrl.split('?')[0].split('/').pop().replace(/id/, '');
  return getAffiliateLink({
    trackId: trackId,
    title: movie.name
  });
};

exports.convertItunesUrl = convertItunesUrl;

var getIsMatch = function getIsMatch(result, movie) {
  var trackName = result.trackName || result.artistName;

  if (trackName && trackName.indexOf(movie.name) !== -1) {
    return Boolean(result.releaseDate && result.releaseDate.slice(0, 4) === movie.releaseDate.slice(0, 4));
  }

  return false;
};

var getIsPossibleMatch = function getIsPossibleMatch(result, movie) {
  return Boolean(result.trackName === movie.name);
};

var getBestMovieMatch = function getBestMovieMatch(results, movie) {
  var matches = results.filter(function (result) {
    return getIsMatch(result, movie);
  });

  if (matches[0]) {
    return matches[0];
  }

  var possibleMatches = results.filter(function (result) {
    return getIsPossibleMatch(result, movie);
  });
  return possibleMatches[0] || null;
};

exports.getBestMovieMatch = getBestMovieMatch;

var getBestMovieMatchAffiliateLink = function getBestMovieMatchAffiliateLink(results, movie) {
  var match = getBestMovieMatch(results, movie);
  return match ? getAffiliateLink({
    trackId: getId(match),
    title: movie.name
  }) : void 0;
};

exports.getBestMovieMatchAffiliateLink = getBestMovieMatchAffiliateLink;