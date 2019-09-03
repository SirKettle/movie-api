import { getUriSafe } from '../../util/api';

const AFFILIATE_TOKEN = '1001lybQ';
const CAMPAIGN_TOKEN = 'choosymovietv';

// iTunes search API returns tvShows with collectionIds, movies with trackIds
export const getId = iTunesTrack => iTunesTrack.trackId || iTunesTrack.collectionId;

// use geo prefix - this redirects to clients local itunes store - so safe to use 'us' as default
export const getAffiliateLink = ({
  trackId,
  title,
  affiliateToken = AFFILIATE_TOKEN,
  campaignToken = CAMPAIGN_TOKEN,
  isTV = false,
}) =>
  `https://geo.itunes.apple.com/us/${isTV ? 'tv-season' : 'movie'}/${getUriSafe(
    title,
  )}/id${trackId}?at=${affiliateToken}&ct=${campaignToken}`;

const getIsMatch = (result, movie) => {
  const trackName = result.trackName || result.artistName;
  if (trackName && trackName.indexOf(movie.name) !== -1) {
    return Boolean(result.releaseDate && result.releaseDate.slice(0, 4) === movie.releaseDate.slice(0, 4));
  }

  return false;
};

const getIsPossibleMatch = (result, movie) => Boolean(result.trackName === movie.name);

export const getBestMovieMatch = (results, movie) => {
  const matches = results.filter(result => getIsMatch(result, movie));

  if (matches[0]) {
    return matches[0];
  }

  const possibleMatches = results.filter(result => getIsPossibleMatch(result, movie));
  return possibleMatches[0] || null;
};

export const getBestMovieMatchAffiliateLink = (results, movie) => {
  const match = getBestMovieMatch(results, movie);
  return match ? getAffiliateLink({ trackId: getId(match), title: movie.name }) : void 0;
};
