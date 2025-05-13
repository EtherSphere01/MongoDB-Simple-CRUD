import { useState } from "react";

const Users = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    fetch("http://localhost:3000/addUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("User added successfully");

          // Refetch users
          fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
        }
        e.target.reset();
      });
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3000/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("User deleted successfully");
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" />
        <br />
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" />
        <br />
        <input type="submit" name="submit" />
        <br />
      </form>

      <div>
        {users.map((user) => (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
