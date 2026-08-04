import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/posts/createPost", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
      console.log("Backend response:", error.response.data);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="border"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
