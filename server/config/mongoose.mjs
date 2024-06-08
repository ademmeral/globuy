import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MONGODB connection is successful')
  } catch (err) {
    console.error(`ERROR : ${err}`);
    process.exit(1);
  }
};