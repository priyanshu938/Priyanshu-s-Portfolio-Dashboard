import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FrontContent from "./FrontContent";
import TestimonialContent from "./TestimonialContent";
const AboutMe = () => {
  const [display, setDisplay] = useState(true);
  return (
    <div>
      <Box style={{ display: "flex" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "teal", marginRight: "5vw" }}
          onClick={() => setDisplay(true)}
        >
          Front Content
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "gray" }}
          onClick={() => setDisplay(false)}
        >
          Testimonial Content
        </Button>
      </Box>
      {display ? <FrontContent /> : <TestimonialContent />}
    </div>
  );
};

export default AboutMe;
