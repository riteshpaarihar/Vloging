import express from 'express';
import { createMessageController } from '../../controllers/message.controller.js';

const router = express.Router();

router.post('/', createMessageController);

export default router;