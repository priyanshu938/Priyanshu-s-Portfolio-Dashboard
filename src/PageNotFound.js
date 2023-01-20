import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const PageNotFound = () => {
  let navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "100px" }}>Oops! Page Not Found</h1>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        style={{ backgroundColor: "#1976D2", marginTop: "10vh" }}
        onClick={() => navigate("/")}
      >
        Go to Home page
      </Button>
    </div>
  );
};

export default PageNotFound;
