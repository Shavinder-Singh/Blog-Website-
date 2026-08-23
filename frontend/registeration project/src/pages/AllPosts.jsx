import React, { useState, useEffect } from "react";
import axios from "axios";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState(null);
  const [giveComment, setGiveComment] = useState({
    commentText: "",
  });

  const token = localStorage.getItem("token");

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

  // CommentSubmit
  const handleCommentSubmit = async(postId) => {
    try{
    const res =await  axios.post(
      `api/comments/createComment/${postId}`,{
      commentText: giveComment.commentText,
      },
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
        <div
          key={post._id}
          className="border border-gray-200 rounded-lg p-4 mb-4 bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">{post.title}</h2>

          <p className="text-gray-600 mb-4">{post.description}</p>

          <button
            className="mr-2 px-3 py-1 border rounded-md"
            onClick={() => handleLike(post._id)}
          >
            Like <span>{post.likedBy.length}</span>
          </button>

          <button
            className="mr-2 px-3 py-1 border rounded-md"
            onClick={() => handleSave(post._id)}
          >
            Save <span>{post.savedBy.length}</span>
          </button>

          <button
            className="px-3 py-1 border rounded-md"
            onClick={() => setOpenComments(post._id)}
          >
            Comments
          </button>

          {openComments === post._id && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <h3 className="font-medium mb-2">Comments</h3>
              <p>Add Comment: </p>
              <input
                type="text"
                placeholder="Add a comment..."
                onChange={(e) =>
                  setGiveComment({
                    ...giveComment,
                    commentText: e.target.value,
                  })
                }
              />
              <button onClick={() => handleCommentSubmit(post._id)}>
                Submit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
