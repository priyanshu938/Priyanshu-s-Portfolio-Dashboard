import React, { useState, useEffect } from "react";
import Snackbar from "../ReusableComponents/Snackbar";

const Dashboard = ({ setIsLoggedIn }) => {
  //auto log out after 1 hour code
  {
    /*const [sessionExpireTimeLeft, setSessionExpireTimeLeft] = useState(3600);
  useEffect(() => {
    if (sessionExpireTimeLeft === 0) setIsLoggedIn(false);
    const timer =
      sessionExpireTimeLeft > 0 &&
      setInterval(
        () => setSessionExpireTimeLeft(sessionExpireTimeLeft - 1),
        1000
      );
    return () => clearInterval(timer);
  }, [sessionExpireTimeLeft]); */
  }

  //image list mui for grid like all things
  const [loginSuccessful, setLoginSuccessful] = useState(true);

  return (
    <div>
      <Snackbar
        isOpen={loginSuccessful}
        severity="success"
        message="Successfully logged in"
        setIsOpen={setLoginSuccessful}
      />
      <h1>Dashboard</h1>
      <div>Skills</div>
      <div>Skills</div>
      <div>Skills</div>
      <div>Skills</div>
      <div>Skills</div>

      <button onClick={() => setIsLoggedIn(false)}>Log out</button>
    </div>
  );
};

export default Dashboard;
