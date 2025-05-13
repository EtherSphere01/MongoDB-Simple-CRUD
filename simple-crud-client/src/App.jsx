import { useState, useEffect } from "react";
import "./App.css";
import Users from "./components/Users";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <h1>Simple Crud Operation</h1>
      <Users initialUsers={users} />
    </>
  );
}

export default App;
