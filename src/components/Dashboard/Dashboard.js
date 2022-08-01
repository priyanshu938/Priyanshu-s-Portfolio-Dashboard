import React, { useState, useEffect } from "react";
import Snackbar from "../ReusableComponents/Snackbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { Box, Stack } from "@mui/material";
const Dashboard = ({ setIsLoggedIn }) => {
  //auto log out after 1 hour code
  //   const [sessionExpireTimeLeft, setSessionExpireTimeLeft] = useState(3600);
  //   useEffect(() => {
  //     if (sessionExpireTimeLeft === 0) setIsLoggedIn(false);
  //     const timer =
  //       sessionExpireTimeLeft > 0 &&
  //       setInterval(
  //         () => setSessionExpireTimeLeft(sessionExpireTimeLeft - 1),
  //         1000
  //       );
  //     return () => clearInterval(timer);
  //   }, [sessionExpireTimeLeft]);

  const [loginSuccessful, setLoginSuccessful] = useState(true);
  const [content, setContent] = useState("skills");

  return (
    <Box>
      <Snackbar
        isOpen={loginSuccessful}
        severity="success"
        message="Successfully logged in"
        setIsOpen={setLoginSuccessful}
      />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar
          setIsLoggedIn={setIsLoggedIn}
          content={content}
          setContent={setContent}
        />
        <Content content={content} setContent={setContent} />
      </Stack>
    </Box>
  );
};

export default Dashboard;
