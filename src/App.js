import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <div>{!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn}/> : <Dashboard />}</div>;
}

export default App;
