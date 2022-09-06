import 'dotenv/config'
import mongoose from 'mongoose';

const { MONGO_URI } = process.env

if(!MONGO_URI) {
  throw "Não se esqueça do .env"
}

export const connectDatabase = () => new Promise((resolve, reject) => {
  mongoose.connection
    .on('error', (error) => reject(error))
    // eslint-disable-next-line
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => resolve(mongoose.connections[0]));

  mongoose.connect(MONGO_URI as string);
});
