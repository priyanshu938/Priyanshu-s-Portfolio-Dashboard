import React from "react";
import { Box } from "@mui/material";
import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";
import Certificates from "./Certificates/Certificates";
import Works from "./Works/Works";
import Resume from "./Resume/Resume";

const Content = ({ content }) => {
  return (
    <Box flex={5}>
      {content === "skills" && <Skills />}
      {content === "projects" && <Projects />}
      {content === "certificates" && <Certificates />}
      {content === "works" && <Works />}
      {content === "resume" && <Resume />}
    </Box>
  );
};

export default Content;
