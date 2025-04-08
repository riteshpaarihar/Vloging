import express from "express";
import { deleteComment, getAllComments } from "../../../../controllers/admin/comment.controller.js";
import { isAdmin, isAuthenticated } from "../../../../middleware/isAuthenticated.js";


const router = express.Router();

router.get("/", isAuthenticated, isAdmin, getAllComments);
router.delete("/:id", isAuthenticated, isAdmin, deleteComment);

export default router;