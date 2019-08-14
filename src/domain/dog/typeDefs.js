export const types = `
  type Dog {
    id: String!
    name: String!
    breed: String
    habits: [String]!
  }
`;

export const queries = `
  dog(id: String): Dog
  dogs: [Dog]!
`;
