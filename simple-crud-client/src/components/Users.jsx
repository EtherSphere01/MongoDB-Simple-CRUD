import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Users = ({ users }) => {
  const [userList, setUserList] = useState(users);
  useEffect(() => {
    setUserList(users);
  }, [users]);

  // Handle Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const newUser = { name, email };

    fetch("http://localhost:3000/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then(() => {
        // Fetch the updated user list after adding
        return fetch("http://localhost:3000/users");
      })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        e.target.reset(); // Clear form
      })
      .catch((err) => console.error("Failed to add user:", err));
  };

  // Handle Delete User
  const handleDeleteUser = (id) => {
    console.log("Deleting user with ID:", id);
    fetch(`http://localhost:3000/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setUserList((prev) => prev.filter((user) => user._id !== id));
        }
      })
      .catch((err) => console.error("Failed to delete user:", err));
  };

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <label>Name: </label>
        <input type="text" name="name" required />
        <br />
        <label>Email: </label>
        <input type="email" name="email" required />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <hr />

      <h2>User List</h2>
      {userList.length === 0 ? (
        <p>No users found.</p>
      ) : (
        userList.map((user) => (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <Link to={`/user/${user._id}`}>Details</Link>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
