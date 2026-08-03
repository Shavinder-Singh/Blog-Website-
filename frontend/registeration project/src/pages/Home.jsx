import React from "react";

const Home = ({ user, error }) => {
  return (
    <div>
      <p>Home</p>
      {user ? (
        <p>Welcome, {user.email}!</p>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Home;
