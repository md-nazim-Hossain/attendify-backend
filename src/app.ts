import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
const app = express();

// =========== app configurations ============== //
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: config.db.limit }));
app.use(express.json({ limit: config.db.limit }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://uptube.vercel.app'],
    credentials: true,
  })
);
app.use(cookieParser());

export default app;
