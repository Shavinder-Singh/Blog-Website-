import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreatePost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const token = localStorage.getItem("token");

  // get one post from backend from editing using post id ;
  useEffect(() => {
    const getPost = async () => {
      try {
        if (id) {
          const res =await  axios.get(`/api/posts/getPost/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data)

          setFormData({
            title: res.data.data.title,
            description: res.data.data.description,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
      getPost();
    
  }, [id]);

  const handleSubmit = async (e) => {
    if (id) {
      e.preventDefault();
      try {
        const updatedPost = await axios.put(
          `/api/posts/updatePost/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          console.log("post updated"),
        );
      } catch (err) {
        console.error("Error updating post:", err);
      }
    } else {
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
