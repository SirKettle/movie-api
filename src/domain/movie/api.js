const apiUtil = require('../../util/api');

const { buildUrlWithQueryParams, createAxiosApi } = apiUtil;

const api = createAxiosApi('https://api.themoviedb.org/3');

const ENDPOINTS = {
  CONFIGURATION: `/configuration`, // /configuration?api_key=???
  DISCOVER_MOVIES: `/discover/movie`, // /discover/movie?with_genres=35&api_key=???
  DISCOVER_TV: `/discover/tv`, // /discover/tv?with_genres=35&api_key=???
  MOVIE: id => `/movie/${id}`,
  TV: id => `/tv/${id}`,
};

const SORT_BY = {
  VOTE_AVERAGE: 'vote_average.desc',
  POPULARITY: 'popularity.desc',
  REVENUE: 'revenue.desc',
};

const MIN_VOTES = 21;

const getRandomSortBy = () => {
  const values = Object.values(SORT_BY);
  const index = Math.floor(Math.random() * values.length);
  return values[index];
};

const baseDiscoverQueryParams = {
  page: 1,
  include_video: false,
  include_adult: false,
  sort_by: SORT_BY.VOTE_AVERAGE,
  language: 'en-US',
  'vote_count.gte': MIN_VOTES,
  api_key: process.env.TMDB_API_KEY,
  'primary_release_date.gte': 1945, // 2014
};

const getMovieLanguageParams = allLanguages => {
  const languageParams = {};

  if (!allLanguages) {
    languageParams.with_original_language = 'en';
  }
  return languageParams;
};

const getMoodParams = (genres = [], personId) => {
  const moodParams = {};
  if (personId) {
    moodParams.with_people = personId;
  } else {
    moodParams.with_genres = genres.sort().join(',');
  }
  return moodParams;
};

module.exports = {
  getMovies: params => {
    const { genres, personId, allLanguages, sortByParam } = params;

    const queryParams = {
      ...baseDiscoverQueryParams,
      ...getMovieLanguageParams(allLanguages),
      ...getMoodParams(genres, personId),
    };

    queryParams.sort_by = !sortByParam ? getRandomSortBy() : sortByParam;

    const url = buildUrlWithQueryParams(ENDPOINTS.DISCOVER_MOVIES, queryParams);
    return api.get(url).then(response => response.data);
  },
};
