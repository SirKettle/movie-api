import graphqlFields from 'graphql-fields';
import { apiService } from './api';
import { apiService as utellyApiService } from '../utelly/api';
import { getStreamingServices } from '../utelly/util';
import { apiService as iTunesApiService } from '../itunes/api';
import { getBestMovieMatchAffiliateLink } from '../itunes/utils';

const getRequestedFields = info => Object.keys(graphqlFields(info));

const includesRequestedField = (field, info) => getRequestedFields(info).includes(field);

const mapMovieResult = result => ({
  id: result.id,
  name: result.original_title,
  summary: result.overview,
  releaseDate: result.release_date,
  posterImage: result.poster_path,
  backgroundImage: result.backdrop_path,
  itunesUrl: null,
  streamingServices: null,
});

export const queries = {
  movies: (_, params = {}, context, info) => {
    return apiService(context)
      .getMovies(params)
      .then(json => json.map(mapMovieResult));
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
              streamingServices: getStreamingServices(results, movie),
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
};
