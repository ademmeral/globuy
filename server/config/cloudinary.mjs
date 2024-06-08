import dotenv from 'dotenv';
dotenv.config();

export const cloudConfig = (preset) => {
  return { 
    cloud_name: process.env[`CLOUDINARY_${preset.toUpperCase()}_NAME`], 
    api_key: process.env[`CLOUDINARY_${preset.toUpperCase()}_KEY`], 
    api_secret: process.env[`CLOUDINARY_${preset.toUpperCase()}_SECRET`], 
  };
}