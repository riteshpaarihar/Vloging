import express from 'express';
import { createPost } from '../../../../controllers/postController.js';
import { isAdmin, isAuthenticated } from '../../../../middleware/isAuthenticated.js';
import { upload } from '../../../../middleware/upload.js';

// Adjust path if needed

const routes = express.Router();

// ✅ Admin Post Routes
routes.post('/', isAuthenticated, isAdmin, upload.single("imageUrl"), createPost); // Create a new post
// routes.get('/posts', getAllPosts); // Get all posts
// routes.get('/posts/:id', getSinglePost); // Get a specific post by ID
// routes.put('/posts/:id', updatePost); // Update a post
// routes.delete('/posts/:id', deletePost); // Delete a post
// routes.patch('/posts/:id/publish', publishPost); // Publish / Unpublish post
// routes.patch('/posts/:id/feature', featurePost); // Feature / Unfeature post

export default routes;