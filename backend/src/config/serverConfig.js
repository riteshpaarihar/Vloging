import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

export {
    PORT,
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRE,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
};