import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [getPosts, setGetPosts] = useState([]);
  const token = localStorage.getItem("token");

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
    </div>
  );
};

export default Dashboard;
