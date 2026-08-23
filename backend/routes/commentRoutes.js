import express from "express";
const router = express.Router();
import {protect} from "../middleware/auth.js";
import Post from "../models/postsModel.js";
import Comment from "../models/commentsmodel.js";




router.post("/createComment/:postId", protect, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const { commentText } = req.body;

    const check = await Comment.create({
        postId,
        userId,
        commentText
    })
    res.status(201).json({
        message: "Comment created successfully",
        data: check
    })
}
)
export default router;