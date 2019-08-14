import * as R from 'ramda';
import { moods, GENRES, MIN_VOTES, SORT_BY } from './constants';

import { buildUrlWithQueryParams, createAxiosApi } from '../../util/api';

const api = createAxiosApi('https://api.themoviedb.org/3');

const ENDPOINTS = {
  CONFIGURATION: `/configuration`,
  DISCOVER_MOVIES: `/discover/movie`,
  DISCOVER_TV: `/discover/tv`,
  MOVIE: id => `/movie/${id}`,
  TV: id => `/tv/${id}`,
};

const getGenresQuery = (genreKeys = [], moodKeys = []) => {
  if (!genreKeys.length && !moodKeys.length) {
    return void 0;
  }

  const genreCodesByKeys = R.map(key => GENRES[key])(genreKeys);

  const genreCodesByMoods = R.compose(
    R.flatten,
    R.map(key => moods[key].genres),
  )(moodKeys);

  const uniqueGenreCodes = R.compose(
    R.uniq,
    R.concat,
  );

  return uniqueGenreCodes(genreCodesByMoods, genreCodesByKeys)
    .filter(code => typeof code === 'number')
    .sort()
    .join(',');
};

const cartesianProduct = R.reduce((acc, list) => (acc.length ? R.map(R.unnest, R.xprod(acc, list)) : list), []);

const removeDupesAndSort = R.map(combo => R.uniq(combo).sort());
const uniqueCombos = R.compose(
  R.uniq,
  removeDupesAndSort,
  cartesianProduct,
);

const getParams = ({ genreQuery, sortBy, personId, allLanguages = false, page = 1 }) => ({
  api_key: process.env.TMDB_API_KEY,
  page: page,
  include_video: false,
  include_adult: false,
  language: 'en-US',
  'vote_count.gte': MIN_VOTES,
  'primary_release_date.gte': 1945,
  with_original_language: allLanguages ? void 0 : 'en',
  with_people: personId || void 0,
  sort_by: SORT_BY[sortBy] || SORT_BY.HIGHEST_RATED,
  with_genres: genreQuery,
});

export const getMovies = args => {
  const genreCombinations = uniqueCombos();

  const url = buildUrlWithQueryParams(
    ENDPOINTS.DISCOVER_MOVIES,
    getParams({
      ...R.omit(['genres', 'moods'], args),
    }),
  );

  return api.get(url).then(response => response.data);
};
