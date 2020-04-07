import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/UserResolver';
import { TechResolver } from '../resolvers/TechResolver';
import { JobResolver } from '../resolvers/JobResolver';
import app from '../middleware';

(async () => {
  app.get('/', (_req, res) =>
    res.json({ message: 'Welcome to Team Builder API!' })
  );

  await createConnection();

  const apolloServer: ApolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TechResolver, JobResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });
})();

export default app;
