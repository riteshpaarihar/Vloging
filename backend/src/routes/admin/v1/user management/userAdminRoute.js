import express from 'express';
import { deleteUser, getallUsers, getSingleUser, updateUser } from '../../../../controllers/admin/user.controller.js';
import { isAdmin, isAuthenticated } from '../../../../middleware/isAuthenticated.js';

const routes = express.Router();

// 🧑‍💼 Admin User Management Routes
routes.get('/', isAuthenticated, isAdmin, getallUsers); // Get all users
routes.get('/:id', isAuthenticated, isAdmin, getSingleUser); // Get single user
routes.put("/:id", isAuthenticated, isAdmin, updateUser); // ✅ Update user
routes.delete("/:id", isAuthenticated, isAdmin, deleteUser); // ✅ Delete user


export default routes;