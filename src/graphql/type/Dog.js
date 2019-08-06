const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const Dog = new GraphQLObjectType({
  name: 'Dog',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },
    habits: { type: GraphQLString },
  }),
});

module.exports = Dog;
