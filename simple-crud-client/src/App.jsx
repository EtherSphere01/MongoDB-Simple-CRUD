import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Users from "./components/Users";

function App() {
  const [count, setCount] = useState(0);
  const usersPromise = fetch("http://localhost:3000/users").then((res) =>
    res.json()
  );
  return (
    <>
      <h1>Simple Crud Operation</h1>
      <Users usersPromise={usersPromise}></Users>
    </>
  );
}

export default App;
