import express from 'express';
import userAdminRoute from './admin/v1/user management/userAdminRoute.js';
import adminPostsRoute from './admin/v1/post management/adminPostsRoute.js';
import adminCommentRoute from './admin/v1/comment management/comment.routes.js';
import adminRoutes from './admin/v1/dashboard stats/stats.routes.js'
const routes = express.Router();
// All User 
routes.use('/users', userAdminRoute);
//  Post User 
routes.use('/post', adminPostsRoute);
// Comments
routes.use('/comments', adminCommentRoute);


//admin routes
routes.use('/routes', adminRoutes);


export default routes;