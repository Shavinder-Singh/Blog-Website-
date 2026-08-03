import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <p>Navbar</p>
      <Link to="/createPost">Create Post</Link>
    </div>
  )
}

export default Navbar
