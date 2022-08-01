import React from "react";
import { Box } from "@mui/material";
import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";
import Certificates from "./Certificates/Certificates";
import Works from "./Works/Works";
import AboutMe from "./About Me/AboutMe";

const Content = ({ content }) => {
  return (
    <Box flex={5} justifyContent="center">
      {content === "skills" && <Skills />}
      {content === "projects" && <Projects />}
      {content === "certificates" && <Certificates />}
      {content === "works" && <Works />}
      {content === "about-me" && <AboutMe />}
    </Box>
  );
};

export default Content;
