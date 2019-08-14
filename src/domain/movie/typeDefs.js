export const types = `
  type Movie {
    id: ID!
    name: String!
    posterImage: String
    backgroundImage: String
    summary: String
    releaseDate: String!
  }

  type MovieResults {
    page: Int!
    totalResults: Int!
    totalPages: Int!
    results: [Movie]!
  }
`;

// TODO: typeDefs - enums? build  dynamically using js? nullable/optional?

export const queries = `
    movies(
      page: Int
      sortBy: String
      personId: Int
      allLanguages: Boolean
      genres: [String]
      moods: [String]
    ): MovieResults
`;
