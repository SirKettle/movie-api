import { ApolloServer, gql } from 'apollo-server';

import * as dogResolver from './domain/dog/resolver';
import * as dogTypeDefs from './domain/dog/typeDefs';
import * as movieResolver from './domain/movie/resolver';
import * as movieTypeDefs from './domain/movie/typeDefs';

const domains = {
  resolvers: [dogResolver, movieResolver],
  typeDefs: [dogTypeDefs, movieTypeDefs],
};

const resolvers = {
  Query: domains.resolvers.map(r => r.queries).reduce((acc, res) => ({ ...acc, ...res }), {}),
  ...domains.resolvers.map(r => r.fields).reduce((acc, res) => ({ ...acc, ...res }), {}),
};

console.log(resolvers.Query);

// TODO: Is there a more GraphQL way of extending this schema?
const typeDefs = gql` 
  # Import types from domains
  ${domains.typeDefs.map(t => t.types)}

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    ${domains.typeDefs.map(t => t.queries)}
  }
`;

console.log(` 
  # Import types from domains
  ${domains.typeDefs.map(t => t.types)}

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    ${domains.typeDefs.map(t => t.queries)}
  }
`);

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch(err => console.error(err));
