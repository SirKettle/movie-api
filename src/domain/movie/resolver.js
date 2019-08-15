import { apiService } from './api';

export const queries = {
  movies: (_, params = {}, context) => {
    return apiService(context)
      .getMovies(params)
      .then(json =>
        json.map(result => ({
          id: result.id,
          name: result.original_title,
          summary: result.overview,
          releaseDate: result.release_date,
          posterImage: result.poster_path,
          backgroundImage: result.backdrop_path,
        })),
      );
  },
  movie: (_, { id }, context) =>
    apiService(context)
      .getMovie(id)
      .then(result => ({
        id: result.id,
        name: result.original_title,
        summary: result.overview,
        releaseDate: result.release_date,
        posterImage: result.poster_path,
        backgroundImage: result.backdrop_path,
      })),
};
