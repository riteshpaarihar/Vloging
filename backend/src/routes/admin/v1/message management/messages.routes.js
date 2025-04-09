import express from 'express';
import {
    getAllMessages,
    getSingleMessage,
    deleteMessage,
    markMessageAsRead,
} from '../../../../controllers/admin/message.controller.js';
import { isAdmin, isAuthenticated } from '../../../../middleware/isAuthenticated.js';


const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getAllMessages);
router.get('/:id', isAuthenticated, isAdmin, getSingleMessage);
router.delete('/:id', isAuthenticated, isAdmin, deleteMessage);
router.patch('/:id/read', isAuthenticated, isAdmin, markMessageAsRead);

export default router;