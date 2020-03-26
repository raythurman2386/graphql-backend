import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import helmet from 'helmet';
import { limiter } from './../utils/rateLimit';
import { speedLimiter } from './../utils/slowDown';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/UserResolver';
import { TechResolver } from '../resolvers/TechResolver';
import { JobResolver } from '../resolvers/JobResolver';

const app: express.Application = express();

(async () => {
  app.use(helmet());
  app.use(limiter);
  app.use(speedLimiter);

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

  apolloServer.applyMiddleware({ app });
})();

export default app;
