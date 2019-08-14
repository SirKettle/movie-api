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

export const getDog = id =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const dog = dogs.find(dog => dog.id === id);
      if (dog) {
        resolve(dog);
      } else {
        reject(`404 - dog not found with id '${id}'`);
      }
    }, 200);
  });

// Technique to use individual reslovers per field taken from: “GraphQL Resolvers: Best Practices”
// https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55
export const queries = {
  dogs: () => getDogs(),
  dog: (_, { id }) => ({ id }),
};

export const fields = {
  Dog: {
    name: ({ id }) => {
      return getDog(id).then(dog => `My name is ${dog.name}`);
    },
    habits: ({ id }) => {
      return getDog(id).then(dog => dog.habits);
    },
    breed: ({ id }) => {
      return getDog(id).then(dog => dog.breed);
    },
  },
};
