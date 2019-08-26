import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

import * as dogResolver from './domain/dog/resolver';
import * as dogTypeDefs from './domain/dog/typeDefs';
import * as movieResolver from './domain/movie/resolver';
import * as movieTypeDefs from './domain/movie/typeDefs';

const app = express();
const port = process.env.PORT || 4000;
const mode = process.env.NODE_ENV || 'development';
const isDebugMode = mode === 'development';

const domains = {
  resolvers: [dogResolver, movieResolver],
  typeDefs: [dogTypeDefs, movieTypeDefs],
};

const resolvers = {
  Query: domains.resolvers.map(r => r.queries).reduce((acc, res) => ({ ...acc, ...res }), {}),
  ...domains.resolvers.map(r => r.fields).reduce((acc, res) => ({ ...acc, ...res }), {}),
};

// TODO: Is there a more GraphQL way of extending this schema?
const typeDefs = gql`
  # Import types from domains
  ${domains.typeDefs.map(t => t.types)}

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    ${domains.typeDefs.map(t => t.queries)}
  }
`;

if (!process.env.TMDB_API_KEY) {
  throw new Error('API key missing for The Movie Database');
}

console.log(`tmdb key: ${process.env.TMDB_API_KEY}`);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    apiKey: process.env.TMDB_API_KEY,
  }),
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.send(`Movie GraphQL API - go to ${server.graphqlPath} to explore API`));

app.listen(port, () => {
  if (isDebugMode) {
    console.log(`API (${mode}) ready at http://localhost:${port}`);
    console.log(`🚀 Server (powered by apollo-server-express) ready at http://localhost:${port}${server.graphqlPath}`);
  } else {
    console.log(`API (${mode}) ready - port assigned by Heroku: ${port}`);
  }
});

export default app;
