import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import pkg from '../package.json';

import * as movieResolver from './domain/movie/resolver';
import * as movieTypeDefs from './domain/movie/typeDefs';

const app = express();
const port = process.env.PORT || 4000;
const mode = process.env.NODE_ENV || 'development';
const isDebugMode = mode === 'development';

const domains = {
  resolvers: [movieResolver],
  typeDefs: [movieTypeDefs],
};

const resolvers = {
  ...domains.resolvers.map(r => r.fields).reduce((acc, res) => ({ ...acc, ...res }), {}),
  Query: domains.resolvers.map(r => r.queries).reduce((acc, res) => ({ ...acc, ...res }), {}),
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

if (!process.env.UTELLY_API_KEY) {
  throw new Error('API key missing for Utelly');
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    tmdbApiKey: process.env.TMDB_API_KEY,
    utellyApiKey: process.env.UTELLY_API_KEY,
    amazonAssociateId: 'thirkettle-21',
  }),
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.send(`Movie GraphQL API - go to ${server.graphqlPath} to explore API`));

app.listen(port, () => {
  if (isDebugMode) {
    console.log(`
                                   O~                                   O~
O~~~ O~~ O~~    O~~    O~~     O~~      O~~             O~~    O~ O~~     
 O~~  O~  O~~ O~~  O~~  O~~   O~~ O~~ O~   O~~ O~~~~~ O~~  O~~ O~  O~~ O~~
 O~~  O~  O~~O~~    O~~  O~~ O~~  O~~O~~~~~ O~~      O~~   O~~ O~   O~~O~~
 O~~  O~  O~~ O~~  O~~    O~O~~   O~~O~              O~~   O~~ O~~ O~~ O~~
O~~~  O~  O~~   O~~        O~~    O~~  O~~~~           O~~ O~~~O~~     O~~
                                                               O~~
                 `);
    console.log(`🚀 ${pkg.name} v${pkg.version} - by ${pkg.author.name}`);
    console.log(pkg.description);
    console.log(`- - - - - - - - - - - - - - - - - `);
    console.log(`Ready at http://localhost:${port}${server.graphqlPath}`);
  } else {
    console.log(`API (${mode}) ready - port assigned by Heroku: ${port}`);
  }
});

export default app;
