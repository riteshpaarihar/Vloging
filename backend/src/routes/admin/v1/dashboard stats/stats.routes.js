import express from 'express';

import { getAnalyticsData, getDashboardStats } from "../../../../controllers/admin/stats.controller.js";
import { isAdmin, isAuthenticated } from "../../../../middleware/isAuthenticated.js";


const router = express.Router();

router.get('/stats', isAuthenticated, isAdmin, getDashboardStats);
router.get('/analytics', isAuthenticated, isAdmin, getAnalyticsData);

export default router;