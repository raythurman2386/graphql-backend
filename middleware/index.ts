import express from 'express';
import helmet from 'helmet';
import { limiter } from './../utils/rateLimit';
import { speedLimiter } from './../utils/slowDown';

module.exports = app => {
  app.use(helmet());
  app.use(limiter);
  app.use(speedLimiter);
};
