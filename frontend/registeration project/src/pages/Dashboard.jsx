import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [getPosts, setGetPosts] = useState([]);
  const token = localStorage.getItem("token");

  // get Posts only for user
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      try {
        const response = await axios.get("/api/posts/getAllPosts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGetPosts(response.data.data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    fetchPosts();
  }, []);

  //   Editing a Post
  const handleEdit = async (post) => {
    navigate(`/createPost/${post._id}`);
  };

  //delete post
  const handleDelete = async (post) => {
    try {
      const res = await axios.delete(`/api/posts/deletePost/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Saved Posts show to user
  const [savedPosts, setSavedPosts] = useState([]);
  const fetchSavedPosts = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("/api/posts/savedPosts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedPosts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchSavedPosts();

  // save or unsave post in dashboard 
   const handleSave = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `/api/posts/savePost/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {getPosts.map((post) => {
        return (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <button onClick={(e) => handleEdit(post)}>Edit</button>
            <button onClick={(e) => handleDelete(post)}>Delete</button>
          </div>
        );
      })}
      <h1>Saved Posts</h1>
      {savedPosts.map((savepost)=>{
        return(
          <div key={savepost._id}>
            <h1>{savepost.title}</h1>
            <p>{savepost.description}</p>
            <button onClick={() => handleSave(savepost._id)}>Unsave</button>
          </div>
        )
      })}
    </div>
  );
};

export default Dashboard;
