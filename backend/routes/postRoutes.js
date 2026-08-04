import express from "express";
import Post from "../models/postsModel.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();


// Create A post

router.post("/createPost", protect, async (req, res) => {
    try {
        const post = await Post.create(
            {
                ...req.body,
                userId: req.user._id
            }
        );
        res.status(201).json({
            message: "Post created successfully",
            data: post
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// show all posts

router.get("/getAllPosts", protect, async (req, res) => {
    try {
        const getPosts = await Post.find({
            userId: req.user._id
        });
        res.status(200).json({
            message: "All posts fetched successfully",
            data: getPosts
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});


// Update a post

router.put("/updatePost/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            message: "Post updated successfully",
            data: updatedPost
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Delete a post

router.delete("/deletePost/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Post deleted successfully",
            data: deletedPost
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
export default router;
