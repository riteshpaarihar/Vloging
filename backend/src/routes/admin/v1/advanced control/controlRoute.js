// routes/admin/settings.routes.js
import {
    getSiteSettings,
    updateSiteSettings,
    toggleFeature
} from '../../../../controllers/admin/siteSettings.controller.js';

import express from 'express';
import { isAdmin, isAuthenticated } from '../../../../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getSiteSettings); // ✅ Get current settings
router.put('/', isAuthenticated, isAdmin, updateSiteSettings); // ✅ Update settings or create
router.patch('/features/:feature/toggle', isAuthenticated, isAdmin, toggleFeature); // ✅ Toggle boolean feature

export default router;