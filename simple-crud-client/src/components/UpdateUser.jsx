import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    //   update user data in database

    fetch(`http://localhost:3000/updateUser/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("User updated successfully");
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={user.name} required />
        <br />
        <input type="email" name="email" defaultValue={user.email} required />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
