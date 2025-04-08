import express from 'express';
import {
    getAllMessages,
    getSingleMessage,
    deleteMessage,
    markMessageAsRead
} from '../controllers/admin/message.controller.js';

const routes = express.Router();

routes.get('/messages', getAllMessages); // Get all contact messages
routes.get('/messages/:id', getSingleMessage); // Get a specific message
routes.delete('/messages/:id', deleteMessage); // Delete a message
routes.patch('/messages/:id/read', markMessageAsRead); // Mark message as read/unread

export default routes;