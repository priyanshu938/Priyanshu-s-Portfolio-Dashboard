import React, { useState, useEffect } from "react";
import Snackbar from "../ReusableComponents/Snackbar";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";

const Dashboard = ({darkMode,setDarkMode}) => {
  const [loginSuccessful, setLoginSuccessful] = useState(true);
  const [content, setContent] = useState("about-me");
  let navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  if (!token) return;

  return (
    <Box>
      <Snackbar
        isOpen={loginSuccessful}
        severity="success"
        message="Successfully logged in"
        setIsOpen={setLoginSuccessful}
      />
      <Sidebar content={content} setContent={setContent} darkMode={darkMode} setDarkMode={setDarkMode} />
    </Box>
  );
};

export default Dashboard;
