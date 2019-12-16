import { GENRES, MEDIA_TYPE, moods, SORT_BY } from './constants';

export const types = `
  enum MediaType {
    ${Object.keys(MEDIA_TYPE).join('\n')}
  }
  
  enum Genres {
    ${Object.keys(GENRES).join('\n')}
  }
  
  enum Moods {
    ${Object.keys(moods).join('\n')}
  }
  
  enum SortBy {
    ${Object.keys(SORT_BY).join('\n')}
  }

  type StreamingService {
    name: String!
    url: String!
    icon: String
  }
  
  interface Media {
    id: ID!
    mediaType: MediaType!
    name: String!
    posterImage: String
  }
  
  type Movie implements Media {
    id: ID!
    mediaType: MediaType!
    name: String!
    posterImage: String
    summary: String
    releaseDate: String!
    backgroundImage: String
    itunesUrl: String,
    streamingServices: [StreamingService]
    cast: [Person!]
    crew: [Person!]
  }

  type TV implements Media {
    id: ID!
    mediaType: MediaType!
    name: String!
    posterImage: String
    summary: String
    releaseDate: String!
    backgroundImage: String
    itunesUrl: String,
    streamingServices: [StreamingService]
  }
  
  type Person implements Media {
    id: ID!
    mediaType: MediaType!
    name: String!
    posterImage: String
    character: String
    jobs: [String!]
  }
  
  type ImageConfig {
    baseUrl: String!
    secureBaseUrl: String!
    backdropSizes: [String!]!
    logoSizes: [String!]!
    posterSizes: [String!]!
    profileSizes: [String!]!
    stillSizes: [String!]!
  }
  
  type Config {
    changeKeys: [String]!
    image: ImageConfig!
  }
  
`;

export const queries = `

  config: Config

  movies(
    sortBy: String
    personId: Int
    allLanguages: Boolean
    genres: [Genres]
    moods: [Moods]
  ): [Movie]!
  
  movie(id: ID): Movie
  
  search(query: String!): [Media!]!
`;
