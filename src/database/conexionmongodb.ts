import mongoose from "mongoose";
import { mongoDB } from '../config/config';

// 'mongodb://username:password@host:port/database?options...
const dbOptions = {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 10000,
  user:mongoDB.USER,
  pass:mongoDB.PASS,
}

try {
  (async () => {
    const db = await mongoose.connect(
      `mongodb://${mongoDB.HOST}:${mongoDB.PORT}/${mongoDB.DATABASE}`,dbOptions
    );
    console.log('Database is connected to: ', db.connection.name);
    })();
  
  } catch (error) {
    console.log(error);
}
