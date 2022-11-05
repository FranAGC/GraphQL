import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import casual from 'casual';
//const casual = require('casual');
//var { graphql, buildSchema } = require('graphql');



const typeDefs = `#graphql
  type Query {
    hello: String
    resolved: String
  }
`;

const resolvers = {
  Query: {
    resolved: () => 'Resolved',
  },
};

const mocks = {
    String: () => casual.sentence
  };

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
     mocks
  }),
});


const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);







/*new ApolloServer({

  // addMocksToSchema accepts a schema instance and provides

  // mocked data for each field in the schema

  schema: addMocksToSchema({

    schema: makeExecutableSchema({ typeDefs, resolvers }),

  }),

});

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: '{ hello }',
  rootValue
}).then((response) => {
  console.log(response);
});*/