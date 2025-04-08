import express from 'express';
import { validateRegister } from '../../middleware/validateRequest.js';
import { register } from '../../controllers/authController.js';
import { upload } from '../../middleware/upload.js';
// import upload from '../../middleware/upload.js'; // 👈 multer middleware

const routes = express.Router();

// 👇 Order matters: upload first, then validation, then controller
routes.post('/register', upload.single('profileImage'), validateRegister, register);
export default routes;