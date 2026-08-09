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

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="border p-4 mb-4">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <button>Like <span></span></button>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;