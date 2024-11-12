import mongoose from 'mongoose';
import { config } from '../config/index';

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.db.db_url}/${config.db.db_name}`
    );
    console.log(
      `Connected to database !! DB_HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('MongoDb Connection Failed:', error);
    process.exit(1);
  }
}

export default connectDB;
