import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import globalErrorHandler from './app/middleware/globalErrorHandler.middleware';
import httpStatus from 'http-status-codes';
import { routes } from './app/routes';
const app: Application = express();

// =========== app configurations ============== //
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://uptube.vercel.app'],
    credentials: true,
  })
);

//parser
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: config.db.limit }));
app.use(express.json({ limit: config.db.limit }));
app.use(cookieParser());

//Application route
app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api Not found',
      },
    ],
  });

  next();
});

export default app;
