import express from "express";
import Post from "../models/postsModel.js";
const router = express.Router();


// Create A post

router.post("/createPost", async (req, res) => {
    try {
        const data = await Post.create(req.body);
        res.status(201).json({
            message: "Post created successfully",
            data
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// show all posts

router.get("/getAllPosts", async (req, res) => {
    try {
        res.status(200).json({
            message: "All posts fetched successfully",
            data: await Post.find()
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
