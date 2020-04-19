import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import typeDefs from '../types';
import resolvers from '../resolvers';

const server = new ApolloServer({
  cors: {
    origin: '*',
    credentials: true
  },
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production'
});

export default server;
