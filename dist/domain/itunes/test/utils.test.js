"use strict";

var _utils = require("../utils");

describe('getAffiliateLink', function () {
  it('should return the correct link with default tokens', function () {
    expect((0, _utils.getAffiliateLink)({
      trackId: 123,
      title: 'Some Movie'
    })).toBe('https://geo.itunes.apple.com/us/movie/Some-Movie/id123?at=1001lybQ&ct=choosymovietv');
  });
  it('should use custom tokens if passed in', function () {
    expect((0, _utils.getAffiliateLink)({
      trackId: 'GOF456',
      title: 'Game of Thrones',
      campaignToken: 'camp1',
      affiliateToken: 'PAY-ME',
      isTV: true
    })).toBe('https://geo.itunes.apple.com/us/tv-season/Game-of-Thrones/idGOF456?at=PAY-ME&ct=camp1');
  });
});