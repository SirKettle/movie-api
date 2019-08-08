const { ApolloServer, gql } = require('apollo-server');

const domains = {
  resolvers: [require('./domain/movie/resolver'), require('./domain/dog/resolver')],
  typeDefs: [require('./domain/movie/typeDefs'), require('./domain/dog/typeDefs')],
};

const resolvers = { Query: domains.resolvers.reduce((acc, res) => ({ ...acc, ...res }), {}) };

const typeDefs = gql`
  # Import types from domains
  ${domains.typeDefs.map(t => t.types)}

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    ${domains.typeDefs.map(t => t.queries)}
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch(err => console.error(err));
