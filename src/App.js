import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); //change it to false later to view login screen first
  return (
    <div>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
