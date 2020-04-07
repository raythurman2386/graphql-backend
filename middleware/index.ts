import express from 'express';
import helmet from 'helmet';
import { limiter } from './../utils/rateLimit';
import { speedLimiter } from './../utils/slowDown';

const app: express.Application = express();

app.use(helmet());
app.use(limiter);
app.use(speedLimiter);

export default app;
