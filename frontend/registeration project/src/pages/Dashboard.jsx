import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [getPosts, setGetPosts] = useState([]);
  console.log(getPosts);
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
  const handleEdit = async (e) => { 

  };
  return (
    <div>
      {getPosts.map((post) => {
        return (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <button onClick={(e) => handleEdit}>Edit</button>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
