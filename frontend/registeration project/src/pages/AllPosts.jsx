import React, { useState, useEffect } from "react";
import axios from "axios";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts/getAllPostsPublic");
        setPosts(res.data.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  //Like post
  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `/api/posts/likePost/${postId}`,
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

  // save post
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
      {posts.map((post) => (
        <div key={post._id} className="border p-4 mb-4">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <button onClick={() => handleLike(post._id)}>
            Like <span>{post.likedBy.length}</span>
          </button>
          <button onClick={() => handleSave(post._id)}>
            Save <span>{post.savedBy.length}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
