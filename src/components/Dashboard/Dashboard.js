import React, { useState } from "react";
import Snackbar from "../ReusableComponents/Snackbar";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
const Dashboard = () => {
  const [loginSuccessful, setLoginSuccessful] = useState(true);
  const [content, setContent] = useState("about-me");

  return (
    <Box>
      <Snackbar
        isOpen={loginSuccessful}
        severity="success"
        message="Successfully logged in"
        setIsOpen={setLoginSuccessful}
      />
      <Sidebar content={content} setContent={setContent} />
    </Box>
  );
};

export default Dashboard;
