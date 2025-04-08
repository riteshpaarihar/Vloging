import express from 'express';
import {
    toggleFeature,
    getSiteSettings,
    updateSiteSettings
} from '../controllers/admin/settings.controller.js';

const routes = express.Router();

routes.get('/settings', getSiteSettings); // Fetch current settings
routes.put('/settings', updateSiteSettings); // Update site settings
routes.patch('/features/:feature/toggle', toggleFeature); // Toggle feature on/off (like featured vlogs, maintenance mode etc.)

export default routes;