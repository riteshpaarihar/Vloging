import express from 'express';

import { isAdmin, isAuthenticated } from '../../../../middleware/isAuthenticated.js';
import { upload } from '../../../../middleware/upload.js';
import { createPost, deletePost, featurePost, getAllPosts, getSinglePost, publishPost, updatePost } from '../../../../controllers/admin/post.controller.js';
import { toggleAllowCommentsController } from '../../../../controllers/admin/post.settings.controller.js';

// Adjust path if needed

const routes = express.Router();

// ✅ Admin Post Routes

routes.post('/', isAuthenticated, isAdmin, upload.single("imageUrl"), createPost); // Create a new post
routes.get('/', isAuthenticated, isAdmin, getAllPosts); // Get all posts

routes.get('/:id', isAuthenticated, isAdmin, getSinglePost); // Get a specific post by ID
routes.put('/:id', isAuthenticated, isAdmin, updatePost); // Update a post
routes.delete('/:id', isAuthenticated, isAdmin, deletePost);; // Delete a post
routes.patch('/:id/publish', isAuthenticated, isAdmin, publishPost); // Publish / Unpublish post
routes.patch('/:id/feature', isAuthenticated, isAdmin, featurePost); // Feature / Unfeature post

routes.patch('/:id/allow-comments', isAuthenticated, isAdmin, toggleAllowCommentsController); // post comments true or not


export default routes;