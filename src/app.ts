import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import globalErrorHandler from './app/middleware/globalErrorHandler.middleware';
import httpStatus from 'http-status-codes';
import { routes } from './app/routes';
import useragent from 'express-useragent';

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

//user agent middleware
app.use(useragent.express());

//Application route
app.get('/api/v1/', (req: Request, res: Response) => {
  const ip =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
  const browser = req.useragent?.browser || 'Unknown Browser';
  const device = req.useragent?.platform || 'Unknown Device';

  res.json({ ip, browser, device });
});

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
