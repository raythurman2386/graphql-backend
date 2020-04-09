import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { limiter } from './../utils/rateLimit';
import { speedLimiter } from './../utils/slowDown';

const app: express.Application = express();

app.use(helmet());
app.use(
  cors({
    origin: '*'
  })
);
app.use(limiter);
app.use(speedLimiter);

export default app;
