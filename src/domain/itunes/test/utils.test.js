import { getAffiliateLink, convertItunesUrl } from '../utils';

describe('getAffiliateLink', () => {
  it('should return the correct link with default tokens', () => {
    expect(getAffiliateLink({ trackId: 123, title: 'Some Movie' })).toBe(
      'https://geo.itunes.apple.com/us/movie/Some-Movie/id123?at=1001lybQ&ct=choosymovietv',
    );
  });

  it('should use custom tokens if passed in', () => {
    expect(
      getAffiliateLink({
        trackId: 'GOF456',
        title: 'Game of Thrones',
        campaignToken: 'camp1',
        affiliateToken: 'PAY-ME',
        isTV: true,
      }),
    ).toBe('https://geo.itunes.apple.com/us/tv-season/Game-of-Thrones/idGOF456?at=PAY-ME&ct=camp1');
  });
});

describe('convertItunesUrl', () => {
  it('should convert the url', () => {
    expect(
      convertItunesUrl(
        'https://itunes.apple.com/gb/movie/the-lord-of-the-rings-the-return-of-the-king/id534905747?uo=5&at=1l3v7yf',
        { name: 'The Lord Of The Rings' },
      ),
    ).toBe('https://geo.itunes.apple.com/us/movie/The-Lord-Of-The-Rings/id534905747?at=1001lybQ&ct=choosymovietv');
  });
});
