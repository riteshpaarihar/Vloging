import express from 'express';
import userRoutes from "./v1/userRoutes.js"
import authRoutes from "./v1/authRoutes.js"
import postRoutes from "./v1/postRoutes.js"
import createMessage from "./v1/message.routes.js"
const routes = express.Router();

// Post request user routes 
routes.use('/user', userRoutes);

routes.use("/auth", authRoutes);
// 📌 All post, comment, like routes go here

routes.use('/posts', postRoutes);

// Create user massage

routes.use('/messages', createMessage);
export default routes;