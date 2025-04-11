import express from 'express';
import * as dashboardController from '../../../../controllers/admin/dashboard.controller.js';
import { isAdmin, isAuthenticated } from '../../../../middleware/isAuthenticated.js';


const router = express.Router();

// Protect all dashboard routes
router.use(isAuthenticated, isAdmin);


// router.get('/test', (req, res) => {
//     res.send('Admin access working!');
// });

// Stats overview
router.get('/stats', dashboardController.getDashboardStats);

// // Analytics
router.get('/analytics/posts', dashboardController.getPostsPerMonth);
router.get('/analytics/signups', dashboardController.getUserSignupsOverTime);
router.get('/analytics/top-posts', dashboardController.getTopPerformingPosts);
router.get('/analytics/category-popularity', dashboardController.getCategoryPopularity);

export default router;