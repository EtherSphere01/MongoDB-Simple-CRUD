// App.jsx
import { useEffect, useState } from "react";
import Users from "./components/Users";
import "./App.css";
import "./index.css";

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
      <Users users={users}></Users>
    </>
  );
}

export default App;
