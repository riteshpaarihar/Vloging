import express from 'express';
import {
    getDashboardStats
} from '../controllers/admin/stats.controller.js';

const routes = express.Router();

routes.get('/dashboard-stats', getDashboardStats); // Get aggregated stats like total users, posts, messages, etc.

export default routes;