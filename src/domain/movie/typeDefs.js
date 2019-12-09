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
  }
  
`;

export const queries = `
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
