import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b p-3">
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/dashboard" className="mr-4">Dashboard</Link>
      <Link to="/createPost" className="mr-4">Create Post</Link>
      <Link to="/login" className="mr-4">Login</Link>
      <Link to="/register">Register </Link>
      <Link to="/allPosts">All Posts</Link>

      
    </nav>
  );
};

export default Navbar;



