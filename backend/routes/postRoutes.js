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

// show all posts for only logged in user

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

// show all posts for all users not protect layer

router.get("/getAllPostsPublic", async (req, res) => {
    try {
        const getPosts = await Post.find().populate("userId", "name email");
        res.status(200).json({
            message: "All posts fetched successfully",
            data: getPosts
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// get only one post for editing 
router.get("/getPost/:id", protect, async (req, res) => {
    try {
        const getOnePost = await Post.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        res.status(200).json({
            message: "post fetched successfully for editing",
            data: getOnePost
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




// Likes Posts
router.post("/likePost/:id", protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.user._id;
        const alreadyLiked = post.likedBy.includes(userId);
        if (alreadyLiked) {
            post.likedBy = post.likedBy.filter((id) => id.toString() !== userId.toString());
        }
        else {
            post.likedBy.push(userId)
        }
        await post.save();
        res.status(200).json({
            message: "Post liked/unliked successfully",
            data: post
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// saves Posts
router.post("/savePost/:id", protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); //post id
        const userId = req.user._id;//user id from token
        const alreadySaved = post.savedBy.includes(userId);
        if (alreadySaved) {
            post.savedBy = post.savedBy.filter((id) => id.toString() !== userId.toString());
        }
        else {
            post.savedBy.push(userId)
        }
        await post.save();
        res.status(200).json({
            message: alreadySaved
                ? "Post unsaved successfully"
                : "Post saved successfully",
            data: post
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});


//Show Saved posts
router.get("/savedPosts", protect, async (req, res) => {
    try {
        const posts = await Post.find({
            savedBy: req.user._id,
        }).populate("userId", "username email");
        res.status(200).json({
            message: "Saved posts fetched successfully",
            data: posts
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});



export default router;
