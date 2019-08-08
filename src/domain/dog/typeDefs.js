const types = `
  type Dog {
    id: String
    name: String
    breed: String
    habits: [String]
  }
`;
const queries = `
  dog(id: String): [Dog]
  dogs: [Dog]
`;

module.exports = { types, queries };
