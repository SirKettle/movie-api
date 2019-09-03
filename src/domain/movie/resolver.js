import graphqlFields from 'graphql-fields';
import { apiService } from './api';
import { apiService as iTunesApiService } from '../itunes/api';
import { getBestMovieMatchAffiliateLink } from '../itunes/utils';

const getRequestedFields = info => Object.keys(graphqlFields(info));

const includesRequestedField = (field, info) => getRequestedFields(info).includes(field);

const includesItunesUrlRequest = info => includesRequestedField('itunesUrl', info);

const mapMovieResult = result => ({
  id: result.id,
  name: result.original_title,
  summary: result.overview,
  releaseDate: result.release_date,
  posterImage: result.poster_path,
  backgroundImage: result.backdrop_path,
  itunesUrl: null,
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
        if (includesItunesUrlRequest(info)) {
          return iTunesApiService()
            .getMovieResults(movie.name)
            .then(itunesResults => {
              return {
                ...movie,
                itunesUrl: getBestMovieMatchAffiliateLink(itunesResults, movie) || null,
              };
            });
        }
        return movie;
      }),
};
