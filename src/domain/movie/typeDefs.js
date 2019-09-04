export const types = `

  type StreamingService {
    name: String!
    url: String!
    icon: String
  }

  type Movie {
    id: ID!
    name: String!
    posterImage: String
    backgroundImage: String
    summary: String
    releaseDate: String!
    itunesUrl: String,
    streamingServices: [StreamingService]
  }
`;

// TODO: typeDefs - enums? build  dynamically using js? nullable/optional?

export const queries = `
  movies(
    sortBy: String
    personId: Int
    allLanguages: Boolean
    genres: [String]
    moods: [String]
  ): [Movie]!
  movie(id: ID): Movie
`;
