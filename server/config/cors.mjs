import dotenv from 'dotenv';
dotenv.config();

const whiteList = ['http://localhost:3000', 'http://127.0.0.1:3000'];
export const CORS_OPTIONS = {
  credentials : true, // IMPORTANT (!)
  origin : (origin, callback) => {
    if (!origin || whiteList.includes(origin))
      callback(null, true)
    else 
      callback(new Error('Not allowed by CORS'));
  },
};