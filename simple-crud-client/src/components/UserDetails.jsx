import React from "react";
import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();
  return (
    <div>
      <div>
        {user ? (
          <div>
            <h2>User Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
          </div>
        ) : (
          <h2>User not found</h2>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
