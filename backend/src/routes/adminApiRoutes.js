import express from 'express';
import userAdminRoute from './admin/v1/user management/userAdminRoute.js';
import adminPostsRoute from './admin/v1/post management/adminPostsRoute.js';
import adminCommentRoute from './admin/v1/comment management/comment.routes.js';
import adminRoutes from './admin/v1/dashboard stats/stats.routes.js'
import adminSettingsRoutes from './admin/v1/advanced control/controlRoute.js'
import adminResetPassword from './admin/v1/reset password/reset.password.js'
import messageRoutes from './admin/v1/message management/messages.routes.js'

const routes = express.Router();
// All User 
routes.use('/users', userAdminRoute);
//  Post User 
routes.use('/post', adminPostsRoute);
// Comments
routes.use('/comments', adminCommentRoute);
//admin routes
routes.use('/routes', adminRoutes);
// side settings
routes.use('/settings', adminSettingsRoutes);
// Reset password by Admin  
routes.use('/user', adminResetPassword);
// massage routes

routes.use('/messages', messageRoutes);

export default routes;