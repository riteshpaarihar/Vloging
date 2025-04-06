import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUDE_NAME } from './serverConfig.js';
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUDE_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,

});

export default cloudinary;