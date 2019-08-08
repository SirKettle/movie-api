const { gql } = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Dog" type can be used in other type declarations.
  type Dog {
    id: String
    name: String
    breed: String
    habits: [String]
  }

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

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    dog(id: String): [Dog]
    dogs: [Dog]
    movies: MovieResults
  }
`;

module.exports = typeDefs;
