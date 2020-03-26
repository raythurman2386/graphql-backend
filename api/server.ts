import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/UserResolver';

const app = express();

(async () => {
  app.get('/', (_req, res) => res.send('Hello'));

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app });
})();

export default app;
