import React from "react";
import { Box,Typography} from "@mui/material";
import EmailViaForm from "./EmailViaForm";

const ComposeEmail = () => {
  return (
    <Box m={6}>
      <Box>
        <Typography px={2} variant="h4" component="div" gutterBottom>
          Compose Email
        </Typography>
        <EmailViaForm />
      </Box>
    </Box>
  );
};

export default ComposeEmail;
