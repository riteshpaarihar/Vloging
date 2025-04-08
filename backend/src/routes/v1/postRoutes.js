import express from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { isAdmin } from '../../middleware/isAuthenticated.js';
import {
    createPost,
    getAllPosts,
    likePost,
} from '../../controllers/postController.js';
import {
    commentOnPost,
    likeComment,
} from '../../controllers/commentController.js';
import { upload } from '../../middleware/upload.js';


// Define the routes for the post controller
const router = express.Router();
//👈 All users can fetch all posts
router.get("/", getAllPosts);
// POST /api/posts → create a post (admin only)
router.post('/', isAuthenticated, upload.single('image'), isAdmin, createPost);

// POST /api/posts/:postId/like → like or unlike a post
router.post('/:postId/like', isAuthenticated, likePost);

// POST /api/posts/:postId/comment → add comment or reply
router.post('/:postId/comment', isAuthenticated, commentOnPost);

// POST /api/posts/:postId/comments/:commentId/like → like a comment
router.post('/:postId/comments/:commentId/like', isAuthenticated, likeComment);

export default router;