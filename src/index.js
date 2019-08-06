// const Hapi = require('hapi');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
// const Dog = require('./model/Dog');
const typeDefs = require('./graphql/schema');
const secrets = require('../private/secrets');

const { cluster, password, user } = secrets.db;
const mongoUri = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

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

const resolvers = {
  Query: {
    dogs: () => {
      return dogs;
    },
    dog: (_, { id }) => {
      return dogs.filter(dog => dog.id === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// }

// StartServer().catch(error => console.log(error));

// const init = async () => {
//   const server = new ApolloServer({ typeDefs, resolvers });
//
//   const app = new Hapi.server({
//     port: 4000,
//     host: 'localhost',
//   });
//
//   await server.applyMiddleware({
//     app,
//   });
//
//   await server.installSubscriptionHandlers(app.listener);
//
//   await app.start();
//
//   server.route([
//     {
//       method: 'GET',
//       path: '/',
//       handler: () => {
//         return `<h1>My Movie GraphQl API</h1>`;
//       },
//     },
//     {
//       method: 'GET',
//       path: '/api/v1/dogs',
//       handler: (req, reply) => {
//         return Dog.find();
//       },
//     },
//     {
//       method: 'POST',
//       path: '/api/v1/dogs',
//       handler: (req, reply) => {
//         const { name, breed, habits } = req.payload;
//         const dog = new Dog({ name, breed, habits });
//         return dog.save();
//       },
//     },
//   ]);
//
//   await server.start();
//   console.log(`Server running at: ${server.info.uri}`);
// };
//
// process.on('unHandledRejection', err => {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
// });
//
// init();
