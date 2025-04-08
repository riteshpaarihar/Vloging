import express from 'express';
import userAdminRoute from './admin/v1/user management/userAdminRoute.js';
import adminPostsRoute from './admin/v1/post management/adminPostsRoute.js';
const routes = express.Router();
// All User 
routes.use('/users', userAdminRoute);

//  Post User 

routes.use('/post', adminPostsRoute);

export default routes;