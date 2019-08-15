export const types = `
  type Dog {
    id: ID!
    name: String!
    breed: String
    habits: [String]!
  }
`;

export const queries = `
  dog(id: ID): Dog
  dogs: [Dog]!
`;
