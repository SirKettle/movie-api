import * as R from 'ramda';
import { moods, GENRES, MIN_VOTES, SORT_BY } from './constants';

import { createAxiosApi, logApiRequests } from '../../util/api';
import { uniqueCartesianProduct } from '../../util/cartesianProduct';

const api = createAxiosApi('https://api.themoviedb.org/3');

const ENDPOINTS = {
  CONFIGURATION: '/configuration',
  DISCOVER_MOVIES: '/discover/movie',
  DISCOVER_TV: '/discover/tv',
  MOVIE: id => `/movie/${id}`,
  MOVIE_CREDITS: id => `/movie/${id}/credits`,
  TV: id => `/tv/${id}`,
  SEARCH: '/search/multi',
};

const genreCodesByMoods = R.map(key => moods[key].genres);
const genreCodesByKeys = R.map(key => GENRES[key]);

const getDiscoverMovieParams = ({ genreQuery, sortBy, personId, allLanguages = false, page = 1 }) => ({
  page: page,
  include_video: false,
  include_adult: false,
  'vote_count.gte': MIN_VOTES,
  'primary_release_date.gte': 1945,
  with_original_language: allLanguages ? void 0 : 'en',
  with_people: personId || void 0,
  sort_by: SORT_BY[sortBy] || SORT_BY.HIGHEST_RATED,
  with_genres: genreQuery,
});

const logResults = res => {
  console.log(res.length);
  return res;
};

const sd = {};

const combineResponsesResults = R.compose(
  logResults,
  R.uniq,
  R.flatten,
  R.map(R.path(['data', 'results'])),
);

const getGenreQueries = (moods = [], genres = []) =>
  uniqueCartesianProduct(genreCodesByMoods(moods))
    .concat(genreCodesByKeys(genres).map(g => [g]))
    .map(codes => codes.join(','));

export const apiService = ({ tmdbApiKey }) => {
  const withBaseParams = { api_key: tmdbApiKey, language: 'en-US' };

  return {
    config: () => api.get(ENDPOINTS.CONFIGURATION, { params: { ...withBaseParams } }).then(R.prop('data')),

    getMovie: id => api.get(ENDPOINTS.MOVIE(id), { params: { ...withBaseParams } }).then(R.prop('data')),

    getMovieCredits: id => api.get(ENDPOINTS.MOVIE_CREDITS(id), { params: { ...withBaseParams } }).then(R.prop('data')),

    getMovies: ({ moods = [], genres = [], ...rest }) => {
      const genreQueries = getGenreQueries(moods, genres);

      logApiRequests(ENDPOINTS.DISCOVER_MOVIES, { count: genreQueries.length });

      return Promise.all(
        genreQueries.map(genreQuery =>
          api.get(ENDPOINTS.DISCOVER_MOVIES, {
            params: {
              ...withBaseParams,
              ...getDiscoverMovieParams({ genreQuery, ...rest }),
            },
          }),
        ),
      ).then(([...responses]) => combineResponsesResults(responses));
    },

    getSearchResults: query =>
      api.get(ENDPOINTS.SEARCH, { params: { ...withBaseParams, query } }).then(R.path(['data', 'results'])),
  };
};
