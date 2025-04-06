import express from "express";
import { login } from "../../controllers/authController.js";
import { requestPasswordReset, resetPassword } from "../../controllers/passwordController.js";

const router = express.Router();

router.post("/login", login); // POST /api/auth/login

router.post('/forgot-password', requestPasswordReset); // /api/auth/forgot-password
router.post('/reset-password/:token', resetPassword); // /api/auth/reset-password

export default router;