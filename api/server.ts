import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';

const app = express();
app.get('/', (_req, res) => res.send('Welcome to Team Builder!'));

createConnection();

const server = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello'
    }
  }
});

server.applyMiddleware({ app });

export default app;
