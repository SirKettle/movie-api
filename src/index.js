// import { ApolloServer, gql } from 'apollo-server';
//
// import * as dogResolver from './domain/dog/resolver';
// import * as dogTypeDefs from './domain/dog/typeDefs';
// import * as movieResolver from './domain/movie/resolver';
// import * as movieTypeDefs from './domain/movie/typeDefs';
//
// const domains = {
//   resolvers: [dogResolver, movieResolver],
//   typeDefs: [dogTypeDefs, movieTypeDefs],
// };
//
// const resolvers = {
//   Query: domains.resolvers.map(r => r.queries).reduce((acc, res) => ({ ...acc, ...res }), {}),
//   ...domains.resolvers.map(r => r.fields).reduce((acc, res) => ({ ...acc, ...res }), {}),
// };
//
// // console.log(resolvers.Query);
//
// // TODO: Is there a more GraphQL way of extending this schema?
// const typeDefs = gql`
//   # Import types from domains
//   ${domains.typeDefs.map(t => t.types)}
//
//   # The "Query" type is the root of all GraphQL queries.
//   type Query {
//     ${domains.typeDefs.map(t => t.queries)}
//   }
// `;
//
// if (!process.env.TMDB_API_KEY) {
//   throw new Error('API key missing for The Movie Database');
// }
//
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: () => ({
//     apiKey: process.env.TMDB_API_KEY,
//   }),
// });
//
// server
//   .listen({ port: process.env.PORT || 4000 })
//   .then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
//   })
//   .catch(err => console.error(err));

import { ApolloServer, gql } from 'apollo-server';

const dogs = [
  {
    id: 'hattie',
    habits: ['sleeping', 'tennis balls'],
    name: 'Hattie',
    breed: 'Cocker spaniel',
  },
  {
    id: 'buddy',
    habits: ['barking', 'tennis balls', 'cuddles'],
    name: 'Buddy',
    breed: 'Boston Hua Hua',
  },
  {
    id: 'harvey',
    habits: ['footballs', 'eating', 'cuddles'],
    name: 'Harvey',
    breed: 'Labrador Retriever cross',
  },
  {
    id: 'beau',
    habits: ['footballs', 'eating', 'cuddles'],
    name: 'Beau',
    breed: 'Labrador Alsation cross',
  },
];

export const getDogs = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(dogs);
    }, 400);
  });

const server = new ApolloServer({
  typeDefs: gql`
    type Dog {
      id: ID!
      name: String!
      breed: String
      habits: [String]!
    }

    type Query {
      dogs: [Dog]!
    }
  `,
  resolvers: {
    Query: {
      dogs: () => getDogs(),
    },
  },
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀 Doggies API ready at ${url}`);
  })
  .catch(err => console.error(err));
