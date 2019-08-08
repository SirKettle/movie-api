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

module.exports = {
  dogs: () => {
    return dogs;
  },
  dog: (_, { id }) => {
    return dogs.filter(dog => dog.id === id);
  },
};
