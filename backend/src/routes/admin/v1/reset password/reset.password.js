import express from 'express';
import { resetUserPasswordController } from '../../../../controllers/admin/user.password.reset.controller.js';
import { isAdmin, isAuthenticated } from '../../../../middleware/isAuthenticated.js';

const routes = express.Router();

routes.post('/:id/reset-password', isAuthenticated, isAdmin, resetUserPasswordController); // ✅ correct

export default routes;