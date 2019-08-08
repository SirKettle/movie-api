const movieApi = require('./api');

module.exports = {
  movies: () => {
    return movieApi.getMovies({}).then(json => ({
      page: json.page,
      totalResults: json.total_results,
      totalPages: json.total_pages,
      results: json.results.map(result => ({
        id: result.id,
        name: result.title,
        summary: result.overview,
        releaseDate: result.release_date,
        posterImage: result.poster_path,
        backgroundImage: result.backdrop_path,
      })),
    }));
  },
};
