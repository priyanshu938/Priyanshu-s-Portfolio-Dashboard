import React, { useState } from "react";
import Snackbar from "../ReusableComponents/Snackbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { Box, Stack } from "@mui/material";
import Sidebar2 from "./Sidebar2";
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
      <Sidebar2 content={content} setContent={setContent} />
     {/*
     <Stack direction="row" spacing={2} justifyContent="space-between">
    
       
             <Sidebar content={content} setContent={setContent} />
         <Content content={content} setContent={setContent} />
       
     </Stack>
  */
 }
    </Box>
  );
};

export default Dashboard;
