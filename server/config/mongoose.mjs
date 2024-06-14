import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MONGODB connection is successful')
  } catch (err) {
    console.error(`ERROR : ${err}`);
    process.exit(1);
  }
};