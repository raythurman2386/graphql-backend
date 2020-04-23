import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../types';
import resolvers from '../resolvers';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
});

server.applyMiddleware({
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
  },
  app,
});

export default app;
