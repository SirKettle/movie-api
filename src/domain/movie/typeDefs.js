const types = `
  type Movie {
    id: ID
    name: String
    posterImage: String
    backgroundImage: String
    summary: String
    releaseDate: String
  }

  type MovieResults {
    page: Int
    totalResults: Int
    totalPages: Int
    results: [Movie]
  }
`;

const queries = `
    movies: MovieResults
`;

module.exports = { types, queries };
