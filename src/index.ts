import dotenv from 'dotenv';
import connectDB from './db/db';
import { config } from './config';
import app from './app';

dotenv.config({ path: './.env' });

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => console.log('MongoDb Connection Failed:', error));
