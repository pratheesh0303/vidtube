import express from "express";
import { addComment, deleteComment, getcomments } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
 router.post("/", verifyToken, addComment)
 router.delete("/:id", verifyToken, deleteComment)
 router.get("/:videoId", verifyToken, getcomments)

export default router;