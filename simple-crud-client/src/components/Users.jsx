import React, { use } from "react";

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise);
    

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    //   create user in database

    fetch("http://localhost:3000/addUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("User added successfully");
        }
        e.target.reset();
      });
  };
  return (
    <div>
      <div>
        <form onSubmit={handleAddUser}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" />
          <br></br>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" />
          <br></br>
          <input type="submit" name="submit" />
          <br></br>
        </form>
      </div>
    </div>
  );
};

export default Users;
