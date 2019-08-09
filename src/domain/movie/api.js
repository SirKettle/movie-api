const R = require('ramda');
const constants = require('./constants');
const apiUtil = require('../../util/api');

const { buildUrlWithQueryParams, createAxiosApi } = apiUtil;
const { moods, GENRES, MIN_VOTES, SORT_BY } = constants;

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

module.exports = {
  getMovies: ({ sortBy, page = 1, genres, moods, personId, allLanguages = false }) => {
    const queryParams = {
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
      with_genres: getGenresQuery(genres, moods),
    };

    const url = buildUrlWithQueryParams(ENDPOINTS.DISCOVER_MOVIES, queryParams);

    return api.get(url).then(response => response.data);
  },
};
