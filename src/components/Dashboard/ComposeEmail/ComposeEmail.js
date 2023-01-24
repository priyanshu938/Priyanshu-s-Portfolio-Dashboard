import React from "react";
import { Box } from "@mui/material";
import EmailViaForm from "./EmailViaForm";

const ComposeEmail = ({darkMode}) => {
  return (
    <Box>
      <EmailViaForm darkMode={darkMode}/>
    </Box>
  );
};

export default ComposeEmail;
