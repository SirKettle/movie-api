import graphqlFields from 'graphql-fields';
import { map } from 'ramda';
import { apiService } from './api';
import { apiService as utellyApiService } from '../utelly/api';
import { getStreamingServices } from '../utelly/util';
import { apiService as iTunesApiService } from '../itunes/api';
import { getBestMovieMatchAffiliateLink } from '../itunes/utils';
import { MEDIA_TYPE, tmdbMediaTypes } from './constants';

const getRequestedFields = info => Object.keys(graphqlFields(info));

const includesRequestedField = (field, info) => getRequestedFields(info).includes(field);

const mapMovieResult = result => ({
  id: result.id,
  mediaType: MEDIA_TYPE.MOVIE,
  name: result.original_title,
  summary: result.overview,
  releaseDate: result.release_date,
  posterImage: result.poster_path,
  backgroundImage: result.backdrop_path,
  itunesUrl: null,
  streamingServices: null,
});

const mapTvResult = result => ({
  id: result.id,
  mediaType: MEDIA_TYPE.TV,
  name: result.original_name,
  summary: result.overview,
  releaseDate: result.first_air_date,
  posterImage: result.poster_path,
  backgroundImage: result.backdrop_path,
  itunesUrl: null,
  streamingServices: null,
});

const mapPersonResult = result => ({
  id: result.id,
  mediaType: MEDIA_TYPE.PERSON,
  name: result.name,
  posterImage: result.profile_path,
});

const normaliseResult = result => {
  switch (result.media_type) {
    case tmdbMediaTypes.MOVIE:
      return mapMovieResult(result);
    case tmdbMediaTypes.TV:
      return mapTvResult(result);
    case tmdbMediaTypes.PERSON:
      return mapPersonResult(result);
    default:
      return;
  }
};

export const fields = {
  Media: {
    __resolveType({ mediaType }, _context, _info) {
      // return type as a string
      switch (mediaType) {
        case MEDIA_TYPE.MOVIE:
          return 'Movie';
        case MEDIA_TYPE.TV:
          return 'TV';
        case MEDIA_TYPE.PERSON:
          return 'Person';
        default:
          return null;
      }
    },
  },
};

export const queries = {
  movies: (_, params = {}, context, _info) => {
    return apiService(context)
      .getMovies(params)
      .then(map(mapMovieResult));
  },

  movie: (_, { id }, context, info) =>
    apiService(context)
      .getMovie(id)
      .then(result => {
        const movie = mapMovieResult(result);
        if (includesRequestedField('streamingServices', info)) {
          return utellyApiService(context)
            .getStreamingAvailability(movie.name)
            .then(results => ({
              ...movie,
              streamingServices: getStreamingServices(results, { movie, ...context }),
            }));
        }
        if (includesRequestedField('itunesUrl', info)) {
          return iTunesApiService()
            .getMovieResults(movie.name)
            .then(itunesResults => ({
              ...movie,
              itunesUrl: getBestMovieMatchAffiliateLink(itunesResults, movie) || null,
            }));
        }
        return movie;
      }),

  search: (_, { query }, context, _info) => {
    return apiService(context)
      .getSearchResults(query)
      .then(map(normaliseResult));
  },
};
