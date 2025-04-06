import express from 'express';
import userRoutes from "./v1/userRoutes.js"
import authRoutes from "./v1/authRoutes.js"
const routes = express.Router();

// Post request user routes 
routes.use('/user', userRoutes);

routes.use("/auth", authRoutes);
export default routes;